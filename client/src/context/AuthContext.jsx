import { createContext, useState, useEffect, useCallback } from 'react';
import { loginUser, registerUser, getMe } from '../api/taskApi';

export const AuthContext = createContext(null);

/**
 * AuthProvider wraps the app and provides authentication state and actions.
 * On mount, restores session from localStorage if a token exists.
 */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('tasknest_token'));
  const [loading, setLoading] = useState(true);

  // ── Restore session on mount ──────────────────────────────────────────────
  useEffect(() => {
    const restoreSession = async () => {
      const storedToken = localStorage.getItem('tasknest_token');
      if (storedToken) {
        try {
          const userData = await getMe();
          setUser(userData);
          setToken(storedToken);
        } catch {
          // Token is invalid or expired — clear storage
          localStorage.removeItem('tasknest_token');
          localStorage.removeItem('tasknest_user');
          setToken(null);
          setUser(null);
        }
      }
      setLoading(false);
    };
    restoreSession();
  }, []);

  /**
   * Login with email and password. Stores token in localStorage.
   * @param {string} email
   * @param {string} password
   * @returns {Promise<Object>} User data
   */
  const login = useCallback(async (email, password) => {
    const data = await loginUser(email, password);
    localStorage.setItem('tasknest_token', data.token);
    setToken(data.token);
    setUser(data.user);
    return data;
  }, []);

  /**
   * Register a new account. Stores token in localStorage.
   * @param {string} name
   * @param {string} email
   * @param {string} password
   * @returns {Promise<Object>} User data
   */
  const register = useCallback(async (name, email, password) => {
    const data = await registerUser(name, email, password);
    localStorage.setItem('tasknest_token', data.token);
    setToken(data.token);
    setUser(data.user);
    return data;
  }, []);

  /**
   * Logout: clears localStorage and resets auth state.
   */
  const logout = useCallback(() => {
    localStorage.removeItem('tasknest_token');
    localStorage.removeItem('tasknest_user');
    setToken(null);
    setUser(null);
  }, []);

  const value = {
    user,
    token,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!token && !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
