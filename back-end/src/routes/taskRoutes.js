const express = require('express');
const router = express.Router();
const { generateTask, updatePriorities } = require('../controllers/taskController');

router.post('/generate', generateTask);
router.post('/update-priorities', updatePriorities);

module.exports = router;
