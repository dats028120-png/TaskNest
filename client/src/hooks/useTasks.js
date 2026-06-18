import { useState, useCallback } from 'react';
import {
  getTasks as apiGetTasks,
  createTask as apiCreateTask,
  updateTask as apiUpdateTask,
  deleteTask as apiDeleteTask,
} from '../api/taskApi';

/**
 * Custom hook for task state management.
 * Provides tasks list, loading state, error state, and CRUD operations.
 * @returns {{ tasks, loading, error, fetchTasks, addTask, editTask, removeTask }}
 */
const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Fetch tasks from the API with optional filters.
   * @param {Object} [filters] - { status, priority, search, sort }
   */
  const fetchTasks = useCallback(async (filters = {}) => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiGetTasks(filters);
      setTasks(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Create a new task and add it to the local state.
   * @param {Object} taskData - Task fields
   * @returns {Promise<Object>} Created task
   */
  const addTask = useCallback(async (taskData) => {
    const newTask = await apiCreateTask(taskData);
    setTasks((prev) => [newTask, ...prev]);
    return newTask;
  }, []);

  /**
   * Update an existing task and sync with local state.
   * @param {string} id - Task ID
   * @param {Object} taskData - Updated fields
   * @returns {Promise<Object>} Updated task
   */
  const editTask = useCallback(async (id, taskData) => {
    const updatedTask = await apiUpdateTask(id, taskData);
    setTasks((prev) =>
      prev.map((task) => (task._id === id ? updatedTask : task))
    );
    return updatedTask;
  }, []);

  /**
   * Delete a task and remove it from local state.
   * @param {string} id - Task ID
   */
  const removeTask = useCallback(async (id) => {
    await apiDeleteTask(id);
    setTasks((prev) => prev.filter((task) => task._id !== id));
  }, []);

  return { tasks, loading, error, fetchTasks, addTask, editTask, removeTask };
};

export default useTasks;
