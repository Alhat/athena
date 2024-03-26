const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { generateTaskData } = require('../services/gpt');

exports.generateTask = async (req, res) => {
  try {
    // Check if user_id is set in the session
    if (!req.session.user_id) {
      return res.status(401).send({ message: 'User not set in session' });
    }

    // Generate task data
    const { title, details, dueDate } = req.body;
    const taskData = await generateTaskData(title, details, dueDate);

    // Add user_id and other default values to the task data
    const newTaskData = {
      title: taskData.title,
      description: taskData.description,
      due_date: dueDate,
      estimated_completion_time: taskData.estimated_completion_time,
      priority: taskData.priority || 0, // Set a default priority if not provided
      status: 'to-do',
      sub_tasks: taskData.sub_tasks,
      user_id: req.session.user_id,
      created_at: new Date().toISOString(),
    };

    // Save the task to the database
    const newTask = await prisma.task_data.create({
      data: newTaskData,
    });

    res.json(newTask);
  } catch (error) {
    console.error('Error generating task:', error);
    res.status(500).send('Internal Server Error');
  }
};
