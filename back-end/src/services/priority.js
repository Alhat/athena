const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const axios = require("axios");


/**
 * 
 * The move is given a certain task, calculate the priority based on the task and the course.
 * This will be used during task creation.
 * 
 * So probably used in task routes?
 * 
 */




/**
 * 
 * @param {*} task input the task data, includes the following fields:
 *  id, course_id, created_at, description, due_date, estimated_completion_time, priority, status, sub_tasks, title, user_id
 * @param {*} course input the canvas course structure, including the fields:
 *  average_completion_time, course_grade, course_id, passing_grade
 */
async function calculatePriority(task) {

    const course = await getCourse(task);
    if (!course) {
        console.error('Error getting course in priority.js -> calculatePriority()');
        return;
    }

    // Set the coefficients to determine the weight that each will have on the priority score
    const grade_coeff = 6.0;
    const assignment_weight_coeff = 8.0;
    const avg_time_coeff = 3.0;
    const due_date_coeff = 10.0;

    // Gets the day
    const due_date = task.due_date / 86400000;

    // Set the different terms in priority equation
    const avg_time = avg_time_coeff * parseFloat(course.average_completion_time);
    const assignment_weight = assignment_weight_coeff * parseFloat(task.weight);
    const inv_course_grade = 1.0 / (grade_coeff * parseFloat(course.course_grade));
    const inv_due_date = 1.0 / (due_date_coeff * parseFloat(due_date));

    // The higher the priority number, the higher the priority
    const priority = avg_time * assignment_weight * inv_course_grade * inv_due_date;
    // console.log("THE PRIORITY CALCULATED WAS: ", priority);
    return priority;

}

async function manuallyUpdatePriority(task, number) {

    task.priority = number;
    return task;
}

async function getCourse(task) {


    try {
        const userData = await prisma.user_data.findUnique({
            where: { id: task.user_id },
        });

        let canvas_course;
        for (let course of userData.canvas_courses) {
            if (course.course_id == task.course_id) {
                canvas_course = course;
                break;
            }
        }

        if (canvas_course) {
            // console.log("course was found in user's courses, RETURN");
            return canvas_course;

        } else {

            let updated_courses = userData.canvas_courses;

            const newCourse = {
                average_completion_time: 1,
                course_grade:            100,
                course_id:               task.course_id,
                passing_grade:           70,
            }

            updated_courses.push(newCourse);
            
            console.log("Added new course: ", updated_courses)

            await prisma.user_data.update({
                where: { id: task.user_id },
                data: {
                    // updates the user_data document to the new value if it exists OR the old value 
                    username: userData.username,
                    canvas_api_token: userData.canvas_api_token,
                    canvas_courses: updated_courses || userData.canvas_courses,
                    settings: userData.settings,
                    user_stats: userData.user_stats,
                },
            });

            return newCourse;
        }

    } catch (error) {
        console.error('Error with getCourse in priority.js', error);
        res.status(500).send('Internal Server Error');
    }

}


module.exports = { calculatePriority, manuallyUpdatePriority };