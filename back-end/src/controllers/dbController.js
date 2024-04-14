const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { generateTaskData } = require('../services/gpt');
const {calculatePriority, manuallyUpdatePriority, updateAllPriorities} = require('../services/priority');

// Get's the assignments for a user
async function getAssignments(req, res) {
    try {
        // Check if user_id is set in the session
        if (!req.session.user_id) {
            return res.status(401).send({ message: "User not set in session" });
        }

        // Get all the assignments for this user
        const assignments = await prisma.assignment_data.findMany({
            where: {
                user: req.session.user_id,
            },
        });

        // TODO: Make sure this works for the schema of assignment_data
        const response = JSON.stringify(
            assignments,
            (key, value) =>
                typeof value === "bigint" ? value.toString() : value // Convert BigInt to string, problem for later
        );

        res.send(response);
    } catch (error) {
        console.error("Error fetching assignments:", error);
        res.status(500).send("Server Error");
    }
}

async function generateTasksFromSelectedAssignments(req, res) {
    try {
        // Check if user_id is set in the session
        if (!req.session.user_id) {
            return res.status(401).send({ message: "User not set in session" });
        }

        // Check if assignmentList is provided
        const assignmentList = req.body.assignmentList;
        if (!assignmentList) {
            return res
                .status(400)
                .send({ message: "Assignment list is required" });
        }

        // Get assignments from database where assignment title is in the assignment list
        const assignments = await prisma.assignment_data.findMany({
            where: {
                user: req.session.user_id,
                title: { in: assignmentList },
            },
        });

        const tasks = await Promise.all(
            assignments.map(async (assignment) => {
                // Make sure this matches up with new schema
                const title = assignment.title;
                const details = assignment.description;
                const dueDate = assignment.due_date;
                const course_id = assignment.course_id;
                const weight = assignment.weight;

                const taskData = await generateTaskData(
                    title,
                    details,
                    dueDate,
                    course_id,
                    weight
                );

                // Add user_id and other default values to the task data
                const newTaskData = {
                    title: taskData.title,
                    course_id: taskData.course_id,
                    description: taskData.description,
                    due_date: dueDate,
                    estimated_completion_time:
                        taskData.estimated_completion_time,
                    priority: 0, // Set a default priority updated after this
                    status: "to-do",
                    sub_tasks: taskData.sub_tasks,
                    user_id: req.session.user_id,
                    created_at: new Date().toISOString(),
                    weight: taskData.weight || 0,
                };

                newTaskData.priority = await calculatePriority(newTaskData);
                return newTaskData;
            })
        );

        console.log('Tasks: \n\n\n\n\n' + tasks + '\n\n\n\n\n\n');
        // Save the tasks to the database
        const createdTasks = await prisma.task_data.createMany({
            data: tasks,
        });

        // Return the created tasks
        res.json(createdTasks);
    } catch (error) {
        console.error(
            "Error generating tasks from selected assignments:",
            error
        );
        res.status(500).send("Internal Server Error");
    }
}

async function generateTasksFromAllAssignments(req, res) {
    try {
        // Check if user_id is set in the session
        if (!req.session.user_id) {
            return res.status(401).send({ message: "User not set in session" });
        }

        // Get all the assignments for this user
        const assignments = await prisma.assignment_data.findMany({
            where: {
                user: req.session.user_id,
            },
        });

        const tasks = await Promise.all(
            assignments.map(async (assignment) => {
                // Make sure this matches up with new schema
                const title = assignment.title;
                const details = assignment.description;
                const dueDate = assignment.due_date;
                const course_id = assignment.course_id;
                const weight = assignment.weight;

                const taskData = await generateTaskData(
                    title,
                    details,
                    dueDate,
                    course_id,
                    weight
                );

                // Add user_id and other default values to the task data
                const newTaskData = {
                    title: taskData.title,
                    course_id: taskData.course_id,
                    description: taskData.description,
                    due_date: dueDate,
                    estimated_completion_time:
                        taskData.estimated_completion_time,
                    priority: 0, // Set a default priority updated after this
                    status: "to-do",
                    sub_tasks: taskData.sub_tasks,
                    user_id: req.session.user_id,
                    created_at: new Date().toISOString(),
                    weight: taskData.weight || 0,
                };

                newTaskData.priority = await calculatePriority(newTaskData);
                return newTaskData;
            })
        );

        // Save the tasks to the database
        const createdTasks = await prisma.task_data.createMany({
            data: tasks,
        });

        // Return the created tasks
        res.json(createdTasks);
    } catch (error) {
        console.error("Error generating tasks from all assignments:", error);
        res.status(500).send("Internal Server Error");
    }
}

async function getUserStats(req, res) {
    try {
        const userReq = req.body.user;
        if (!userReq) return res.status(400).send('"User" is a required field');

        const userData = await prisma.personal_data.findUnique({
            where: {
                user: userReq,
            },
        });

        if (!userData) {
            return res.status(404).send("User not found");
        }

        res.json(userData);
    } catch (error) {
        console.error("Error fetching user data:", error);
        res.status(500).send("Server Error");
    }
}

module.exports = {
    getAssignments,
    getUserStats,
    generateTasksFromAllAssignments,
    generateTasksFromSelectedAssignments,
};
