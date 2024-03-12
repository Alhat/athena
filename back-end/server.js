require("dotenv").config();
const express = require("express");
const connectDB = require("./src/config/db");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

// Connect to database
connectDB();

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// Define routes
const gptRoute = require('./src/routes/gptRoutes'); // Changed 'routes/gptRoute' to 'src/routes/gptRoutes'
app.use('/api/gpt', gptRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on ${PORT}`));
