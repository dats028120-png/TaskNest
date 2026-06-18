import axios from 'axios';

// ─── Axios Instance ───────────────────────────────────────────────────────────
const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// ─── Request Interceptor ──────────────────────────────────────────────────────
// Attach Authorization header with JWT token from localStorage on every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('tasknest_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ─── Response Interceptor ─────────────────────────────────────────────────────
// On 401 Unauthorized: clear localStorage and redirect to /login
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('tasknest_token');
      localStorage.removeItem('tasknest_user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// ─── Auth API Functions ───────────────────────────────────────────────────────

/**
 * Register a new user account.
 * @param {string} name - User's display name
 * @param {string} email - User's email address
 * @param {string} password - User's password (min 6 chars)
 * @returns {Promise<{token: string, user: Object}>}
 */
export const registerUser = async (name, email, password) => {
  const { data } = await api.post('/auth/register', { name, email, password });
  return data;
};

/**
 * Login with email and password.
 * @param {string} email - User's email address
 * @param {string} password - User's password
 * @returns {Promise<{token: string, user: Object}>}
 */
export const loginUser = async (email, password) => {
  const { data } = await api.post('/auth/login', { email, password });
  return data;
};

/**
 * Get the currently authenticated user's profile.
 * @returns {Promise<Object>} User object
 */
export const getMe = async () => {
  const { data } = await api.get('/auth/me');
  return data;
};

// ─── Task API Functions ───────────────────────────────────────────────────────

/**
 * Get all tasks for the authenticated user with optional filters.
 * @param {Object} [filters] - Optional filter params: { status, priority, search, sort }
 * @returns {Promise<Array>} Array of task objects
 */
export const getTasks = async (filters = {}) => {
  const { data } = await api.get('/tasks', { params: filters });
  return data;
};

/**
 * Create a new task.
 * @param {Object} taskData - { title, description, status, priority, dueDate }
 * @returns {Promise<Object>} Newly created task
 */
export const createTask = async (taskData) => {
  const { data } = await api.post('/tasks', taskData);
  return data;
};

/**
 * Update an existing task by ID.
 * @param {string} id - Task MongoDB ObjectId
 * @param {Object} taskData - Fields to update
 * @returns {Promise<Object>} Updated task
 */
export const updateTask = async (id, taskData) => {
  const { data } = await api.put(`/tasks/${id}`, taskData);
  return data;
};

/**
 * Delete a task by ID.
 * @param {string} id - Task MongoDB ObjectId
 * @returns {Promise<Object>} Success message
 */
export const deleteTask = async (id) => {
  const { data } = await api.delete(`/tasks/${id}`);
  return data;
};

/**
 * Get dashboard statistics for the authenticated user.
 * @returns {Promise<Object>} Stats: { total, pending, completed, high, medium, low }
 */
export const getStats = async () => {
  const { data } = await api.get('/tasks/stats');
  return data;
};

export default api;
