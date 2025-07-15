const express = require('express');
const {
  addTaskLog,
  getTasks,
  getTasksByUser,
  reviewTask
} = require('../controllers/taskController');

const router = express.Router();

router.post('/', addTaskLog);
router.get('/', getTasks);
router.get('/user/:userId', getTasksByUser);
router.post('/review/:id', reviewTask);

module.exports = router;
