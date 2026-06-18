import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { Loader2, Eye, EyeOff } from 'lucide-react';
import useAuth from '../hooks/useAuth';

/**
 * LoginPage — Centered auth card for user login.
 * Redirects to /dashboard on success.
 */
const LoginPage = () => {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated) navigate('/dashboard', { replace: true });
  }, [isAuthenticated, navigate]);

  const validate = () => {
    const errs = {};
    if (!formData.email) errs.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      errs.email = 'Enter a valid email address';
    if (!formData.password) errs.password = 'Password is required';
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    try {
      await login(formData.email, formData.password);
      toast.success('Welcome back! 👋');
      navigate('/dashboard');
    } catch (err) {
      const message = err.response?.data?.message || 'Login failed. Please try again.';
      toast.error(message);
      setErrors({ submit: message });
    } finally {
      setLoading(false);
    }
  };

  const inputClass = (field) => `
    w-full bg-[#0A0A0F] border rounded-xl px-4 py-3 text-[#E8E8F0] text-sm
    placeholder-[#6B6B80] outline-none transition-all duration-200
    ${errors[field]
      ? 'border-[#FF4D6D] focus:border-[#FF4D6D] focus:ring-2 focus:ring-[#FF4D6D20]'
      : 'border-[#1E1E2E] focus:border-[#6C63FF] focus:ring-2 focus:ring-[#6C63FF20]'
    }
  `;

  return (
    <div className="min-h-screen bg-animated-gradient flex items-center justify-center px-4 py-12">
      <title>Login — TaskNest</title>

      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-3">
            <div className="w-10 h-10 rounded-xl bg-[#6C63FF] flex items-center justify-center shadow-lg shadow-[#6C63FF40]">
              <span className="text-white font-bold">TN</span>
            </div>
            <span className="text-2xl font-extrabold text-[#E8E8F0]">
              Task<span className="text-[#6C63FF]">Nest</span>
            </span>
          </div>
          <h1 className="text-3xl font-extrabold text-[#E8E8F0] mb-2">Welcome back</h1>
          <p className="text-[#6B6B80] text-sm">Sign in to manage your tasks</p>
        </div>

        {/* Card */}
        <div className="bg-[#111118] border border-[#1E1E2E] rounded-2xl p-8 shadow-2xl shadow-black/50">
          <form onSubmit={handleSubmit} noValidate className="space-y-5">
            {/* Email */}
            <div>
              <label htmlFor="login-email" className="block text-sm font-medium text-[#E8E8F0] mb-2">
                Email address
              </label>
              <input
                id="login-email"
                name="email"
                type="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className={inputClass('email')}
              />
              {errors.email && (
                <p className="mt-1.5 text-xs text-[#FF4D6D]">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label htmlFor="login-password" className="block text-sm font-medium text-[#E8E8F0] mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="login-password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className={`${inputClass('password')} pr-11`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B6B80] hover:text-[#E8E8F0] transition-colors"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1.5 text-xs text-[#FF4D6D]">{errors.password}</p>
              )}
            </div>

            {/* Submit Error */}
            {errors.submit && (
              <div className="text-sm text-[#FF4D6D] bg-[#FF4D6D10] border border-[#FF4D6D30] rounded-lg px-4 py-3">
                {errors.submit}
              </div>
            )}

            {/* Submit Button */}
            <button
              id="btn-login"
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3 bg-[#6C63FF] hover:bg-[#5a52d5] disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-[#6C63FF30] hover:shadow-[#6C63FF50]"
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Signing in...
                </>
              ) : (
                'Sign in'
              )}
            </button>
          </form>

          {/* Register Link */}
          <p className="mt-6 text-center text-sm text-[#6B6B80]">
            Don't have an account?{' '}
            <Link
              to="/register"
              id="link-to-register"
              className="text-[#6C63FF] hover:text-[#8880ff] font-medium transition-colors"
            >
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
