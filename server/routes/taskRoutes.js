const express = require('express');
const router = express.Router();
const {
  getTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
  getStats,
} = require('../controllers/taskController');
const { protect } = require('../middleware/authMiddleware');

// All task routes are protected — apply middleware to all
router.use(protect);

// @route  GET  /api/tasks/stats — MUST be before /:id to avoid conflict
router.get('/stats', getStats);

// @route  GET  /api/tasks
// @route  POST /api/tasks
router.route('/').get(getTasks).post(createTask);

// @route  GET    /api/tasks/:id
// @route  PUT    /api/tasks/:id
// @route  DELETE /api/tasks/:id
router.route('/:id').get(getTask).put(updateTask).delete(deleteTask);

module.exports = router;
