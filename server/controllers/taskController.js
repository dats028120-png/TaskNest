const Task = require('../models/Task');

/**
 * @desc    Get all tasks for the authenticated user with optional filtering
 * @route   GET /api/tasks
 * @access  Protected
 * @param {string} [req.query.status] - Filter by status: 'Pending' | 'Completed'
 * @param {string} [req.query.priority] - Filter by priority: 'Low' | 'Medium' | 'High'
 * @param {string} [req.query.search] - Search tasks by title (regex, case-insensitive)
 * @param {string} [req.query.sort] - Sort field (default: createdAt desc)
 * @returns {Array} Array of task objects
 */
const getTasks = async (req, res) => {
  const { status, priority, search, sort } = req.query;

  // Build filter query — always scope to authenticated user
  const query = { user: req.user._id };

  if (status && ['Pending', 'Completed'].includes(status)) {
    query.status = status;
  }

  if (priority && ['Low', 'Medium', 'High'].includes(priority)) {
    query.priority = priority;
  }

  if (search) {
    query.title = { $regex: search, $options: 'i' };
  }

  // Determine sort order — default to newest first
  let sortOption = { createdAt: -1 };
  if (sort === 'dueDate') sortOption = { dueDate: 1 };
  else if (sort === 'priority') sortOption = { priority: -1 };
  else if (sort === 'title') sortOption = { title: 1 };
  else if (sort === 'oldest') sortOption = { createdAt: 1 };

  const tasks = await Task.find(query).sort(sortOption);
  res.json(tasks);
};

/**
 * @desc    Create a new task for the authenticated user
 * @route   POST /api/tasks
 * @access  Protected
 * @param {Object} req.body - { title, description, status, priority, dueDate }
 * @returns {Object} Newly created task object (201)
 */
const createTask = async (req, res) => {
  const { title, description, status, priority, dueDate } = req.body;

  // Validate required title field
  if (!title || !title.trim()) {
    return res.status(400).json({ message: 'Task title is required' });
  }

  const task = await Task.create({
    user: req.user._id,
    title: title.trim(),
    description: description || '',
    status: status || 'Pending',
    priority: priority || 'Medium',
    dueDate: dueDate || undefined,
  });

  res.status(201).json(task);
};

/**
 * @desc    Get a single task by ID (ownership check enforced)
 * @route   GET /api/tasks/:id
 * @access  Protected
 * @returns {Object} Task object or 404 if not found / not owned by user
 */
const getTask = async (req, res) => {
  // Find by _id AND user to enforce ownership
  const task = await Task.findOne({
    _id: req.params.id,
    user: req.user._id,
  });

  if (!task) {
    return res.status(404).json({ message: 'Task not found' });
  }

  res.json(task);
};

/**
 * @desc    Update an existing task (ownership check enforced)
 * @route   PUT /api/tasks/:id
 * @access  Protected
 * @param {Object} req.body - { title, description, status, priority, dueDate }
 * @returns {Object} Updated task object or 404 if not found / not owned by user
 */
const updateTask = async (req, res) => {
  const { title, description, status, priority, dueDate } = req.body;

  // Find by _id AND user to enforce ownership
  const task = await Task.findOne({
    _id: req.params.id,
    user: req.user._id,
  });

  if (!task) {
    return res.status(404).json({ message: 'Task not found' });
  }

  // Update only the provided fields
  if (title !== undefined) task.title = title.trim();
  if (description !== undefined) task.description = description;
  if (status !== undefined) task.status = status;
  if (priority !== undefined) task.priority = priority;
  if (dueDate !== undefined) task.dueDate = dueDate || undefined;

  // Always update the updatedAt timestamp
  task.updatedAt = new Date();

  const updatedTask = await task.save();
  res.json(updatedTask);
};

/**
 * @desc    Delete a task (ownership check enforced)
 * @route   DELETE /api/tasks/:id
 * @access  Protected
 * @returns {Object} Success message or 404 if not found / not owned by user
 */
const deleteTask = async (req, res) => {
  // Find by _id AND user to enforce ownership
  const task = await Task.findOne({
    _id: req.params.id,
    user: req.user._id,
  });

  if (!task) {
    return res.status(404).json({ message: 'Task not found' });
  }

  await task.deleteOne();
  res.json({ message: 'Task deleted successfully' });
};

/**
 * @desc    Get dashboard statistics for the authenticated user's tasks
 * @route   GET /api/tasks/stats
 * @access  Protected
 * @returns {Object} Stats: { total, pending, completed, high, medium, low }
 */
const getStats = async (req, res) => {
  const userId = req.user._id;

  // Use MongoDB aggregation for efficient counting
  const stats = await Task.aggregate([
    { $match: { user: userId } },
    {
      $group: {
        _id: null,
        total: { $sum: 1 },
        pending: {
          $sum: { $cond: [{ $eq: ['$status', 'Pending'] }, 1, 0] },
        },
        completed: {
          $sum: { $cond: [{ $eq: ['$status', 'Completed'] }, 1, 0] },
        },
        high: {
          $sum: { $cond: [{ $eq: ['$priority', 'High'] }, 1, 0] },
        },
        medium: {
          $sum: { $cond: [{ $eq: ['$priority', 'Medium'] }, 1, 0] },
        },
        low: {
          $sum: { $cond: [{ $eq: ['$priority', 'Low'] }, 1, 0] },
        },
      },
    },
  ]);

  // Return zero counts if user has no tasks
  const result = stats[0] || {
    total: 0,
    pending: 0,
    completed: 0,
    high: 0,
    medium: 0,
    low: 0,
  };

  // Remove the _id field from aggregation result
  delete result._id;

  res.json(result);
};

module.exports = { getTasks, createTask, getTask, updateTask, deleteTask, getStats };
