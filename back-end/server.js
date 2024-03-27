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
app.post('/api/session/set-user', async (req, res) => {
  const { user_id } = req.body;
  req.session.user_id = user_id;
  console.log('Session user_id set:', req.session.user_id);

  try {
    // Check if user_data exists
    const existingUserData = await prisma.user_data.findUnique({
      where: { id: user_id },
    });

    if (!existingUserData) {
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

      // Create default user_data if it doesn't exist
      await prisma.user_data.create({
        data: {
          id: user_id,
          username: user_id, // Set a default username or get it from the request
          canvas_api_token: '', // Set a default or empty token
          canvas_courses: [],
          settings: defaultSettings,
          user_stats: defaultUserStats,
        },
      });
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
