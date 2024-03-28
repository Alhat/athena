const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const { setUser, getTasks } = require('../controllers/userController');
const prisma = new PrismaClient();

// Fetch all tasks for the set user
// router.get('/tasks', async (req, res) => {
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
// });

router.get('/tasks', getTasks);


/**
 * EXAMPLES OF USABLE COMMANDS:
 * 
 * To create a new user with all empty or default values
 *    curl -X POST http://localhost:3000/api/user/set-user -H "Content-Type: application/json" -d '{"user_id": "your_user_id"}'
 * 
 * To create a new user with custom values
 *    curl -X POST http://localhost:3000/api/user/set-user -H "Content-Type: application/json" -d 
 *      '{"user_id": "your_user_id", 
 *      "username": "your_username", 
 *      "canvas_courses": [{"course_id": "your_course_id", "course_grade": current_grade_float, "passing_grade": grade_float, "average_completion_time": BigInt_seconds}],
 *      "settings": {"notifications": boolean, "theme": "light_or_dark"},
 *      "user_stats": {"average_completion_time": BigInt_Seconds, "average_grade": grade_float, "total_tasks_completed": int},
 *      "canvas_api_token": "NA"
 *      }'
 * 
 * A full json on one line:
 *    '{"user_id": "josh_test2", "username": "josh_test@aol.com", "canvas_courses": [{"course_id": "math101", "course_grade": 94.5, "passing_grade": 70.0, "average_completion_time": 1500}], "settings": {"notifications": false, "theme": "dark"}, "user_stats": {"average_completion_time": 2000, "average_grade": 90.1, "total_tasks_completed": 25}, "canvas_api_token": "NA"}'
 */
router.post('/set-user', setUser);

module.exports = router;
