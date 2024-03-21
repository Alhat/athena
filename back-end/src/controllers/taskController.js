const { generateTaskData } = require('../services/gpt');

exports.generateTask = async (req, res) => {
  try {
    const { title, details, dueDate } = req.body;
    const taskData = await generateTaskData(title, details, dueDate);
    res.json(taskData);
  } catch (error) {
    console.error('Error generating task:', error);
    res.status(500).send('Internal Server Error');
  }
};
