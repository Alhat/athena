require("dotenv").config();
const express = require("express");
const connectDB = require("./src/config/db");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const session = require("express-session");

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
    cookie: { secure: true },
  })
);

// Define routes
const gptRoute = require("./src/routes/gptRoutes");
app.use("/api/gpt", gptRoute);

const dbRoute = require("./src/routes/dbRoutes");
app.use("/api/db", dbRoute);

// Add this line to include the task routes in your server.js
const taskRoute = require('./src/routes/taskRoutes');
app.use('/api/task', taskRoute);


// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on ${PORT}`));
