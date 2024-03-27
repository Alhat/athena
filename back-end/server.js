require("dotenv").config();
const express = require("express");
const connectDB = require("./src/config/db");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const session = require("express-session");
const MongoStore = require('connect-mongo'); // Add this for session store
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Connect to database
connectDB();

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(
  session({
    secret: "your_secret_key",
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: process.env.DATABASE_URL }), // Use MongoDB for session store
    cookie: { secure: false }, // Set to false for HTTP, true for HTTPS
  })
);

// Define routes
const gptRoute = require("./src/routes/gptRoutes");
app.use("/api/gpt", gptRoute);

const dbRoute = require("./src/routes/dbRoutes");
app.use("/api/db", dbRoute);

const taskRoute = require('./src/routes/taskRoutes');
app.use('/api/task', taskRoute);

const userRoute = require('./src/routes/userRoutes');
app.use('/api/user', userRoute);

// Refactor this later!!!!!!!!
/**
 * EXAMPLES OF USABLE COMMANDS:
 * 
 * To create a new user with all empty or default values
 *    curl -X POST http://localhost:3000/api/session/set-user -H "Content-Type: application/json" -d '{"user_id": "your_user_id"}'
 * 
 * To create a new user with custom values
 *    curl -X POST http://localhost:3000/api/session/set-user -H "Content-Type: application/json" -d 
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
app.post('/api/session/set-user', async (req, res) => {
  const { user_id, username, canvas_courses, settings, user_stats, canvas_api_token } = req.body;
  req.session.user_id = user_id;
  req.session.username = username;
  req.session.canvas_courses = canvas_courses;
  req.session.settings = settings;
  req.session.user_stats = user_stats;
  req.session.canvas_api_token = canvas_api_token;

  // Define default settings
  const defaultSettings = {
    theme: 'light', // Default theme
    notifications: true, // Enable notifications by default
    // Add more settings as needed
  };

  // Define default user stats
  const defaultUserStats = {
    average_completion_time: 0, // Default average completion time
    average_grade: 0, // Default average grade
    total_tasks_completed: 0, // Default total tasks completed
    // Add more stats as needed
  };

  console.log('Session user_id set:', req.session.user_id);

  try {
    // Check if user_data exists
    const existingUserData = await prisma.user_data.findUnique({
      where: { id: user_id },
    });

    if (!existingUserData) {
      
      console.log("canvas_courses is set to: \n", canvas_courses);

      // Set defaults if no info provided
      if (!username) {
        username = user_id
      }
      if (!canvas_courses) {
        canvas_courses = [];
      }
      if (!settings) {
        settings = defaultSettings;
      }
      if (!user_stats) {
        user_stats = defaultUserStats;
      }
      if (!canvas_api_token) {
        canvas_api_token = "";
      }

      // Create default user_data if it doesn't exist
      await prisma.user_data.create({
        data: {
          id: user_id,
          username: username, // Set a default username or get it from the request
          canvas_api_token: canvas_api_token, // Set a default or empty token
          canvas_courses: canvas_courses,
          settings: settings,
          user_stats: user_stats,
        },
      });

    // If user data DNE, update the old one!
    } else {
      res.send({ message: 'User already found, TODO update specified values' });



    }

    res.send({ message: 'User set successfully' });
  } catch (error) {
    console.error('Error setting user:', error);
    res.status(500).send('Internal Server Error');
  }
});



// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on ${PORT}`));
