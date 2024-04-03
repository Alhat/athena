const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { generateTaskData } = require('../services/gpt');
const {calculatePriority, manuallyUpdatePriority} = require('../services/priority');

exports.generateTask = async (req, res) => {
  try {
    // Check if user_id is set in the session
    if (!req.session.user_id) {
      return res.status(401).send({ message: 'User not set in session' });
    }

    // Generate task data
    const { title, details, dueDate, course_id, weight } = req.body;
    const taskData = await generateTaskData(title, details, dueDate, course_id, weight);

    // Add user_id and other default values to the task data
    const newTaskData = {
      title: taskData.title,
      course_id: taskData.course_id,
      description: taskData.description,
      due_date: dueDate,
      estimated_completion_time: taskData.estimated_completion_time,
      priority: 0, // Set a default priority updated after this
      status: 'to-do',
      sub_tasks: taskData.sub_tasks,
      user_id: req.session.user_id,
      created_at: new Date().toISOString(),
      weight: taskData.weight || 0,
    };

    newTaskData.priority = await calculatePriority(newTaskData);

    // Save the task to the database
    const newTask = await prisma.task_data.create({
      data: newTaskData,
    });
    // res.json(newTask);
    res.send({ message: 'Task has been generated' });
  } catch (error) {
    console.error('Error generating task:', error);
    res.status(500).send('Internal Server Error');
  }
};


// exports.calculatePriority = async (req, res) => {

//   try {
//     // Check if user_id is set in the session
//     if (!req.session.user_id) {
//       return res.status(401).send({ message: 'User not set in session' });
//     }

//     // Query tasks by user_id and sort by priority
//     const tasks = await prisma.task_data.findMany({
//       where: {
//         user_id: req.session.user_id,
//       },
//       orderBy: {
//         priority: 'asc', // Use 'desc' for descending order
//       },
//     });

//     res.json(tasks);
//   } catch (error) {
//     console.error('Error fetching tasks:', error);
//     res.status(500).send('Internal Server Error');
//   }
// }
