import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

/**
 * Custom hook to access the AuthContext.
 * Must be used within an AuthProvider.
 * @returns {{ user, token, loading, login, register, logout, isAuthenticated }}
 */
const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default useAuth;
