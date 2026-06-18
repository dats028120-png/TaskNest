const mongoose = require('mongoose');

/**
 * @typedef {Object} TaskDocument
 * @property {mongoose.Types.ObjectId} user - Reference to the owning User
 * @property {string} title - Task title (required)
 * @property {string} description - Optional task description
 * @property {'Pending'|'Completed'} status - Task completion status
 * @property {'Low'|'Medium'|'High'} priority - Task priority level
 * @property {Date} [dueDate] - Optional due date
 * @property {Date} createdAt - Task creation timestamp
 * @property {Date} updatedAt - Last update timestamp
 */

const taskSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User reference is required'],
  },
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
  },
  description: {
    type: String,
    default: '',
  },
  status: {
    type: String,
    enum: ['Pending', 'Completed'],
    default: 'Pending',
  },
  priority: {
    type: String,
    enum: ['Low', 'Medium', 'High'],
    default: 'Medium',
  },
  dueDate: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Compound index for fast filtered queries by user and status
taskSchema.index({ user: 1, status: 1 });

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
