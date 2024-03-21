const express = require('express');
const router = express.Router();
const { generateTask } = require('../controllers/taskController');

router.post('/generate', generateTask);

module.exports = router;
