const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Fetch all tasks for the set user
router.get('/tasks', async (req, res) => {
  try {
    // Check if user_id is set in the session
    if (!req.session.user_id) {
      return res.status(401).send({ message: 'User not set in session' });
    }

    // Query tasks by user_id and sort by priority
    const tasks = await prisma.task.findMany({
      where: {
        user_id: req.session.user_id,
      },
      orderBy: {
        priority: 'asc', // Use 'desc' for descending order
      },
    });

    res.json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
