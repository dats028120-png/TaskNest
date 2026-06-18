import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Loader2, Eye, EyeOff } from 'lucide-react';
import useAuth from '../hooks/useAuth';

/**
 * RegisterPage — Centered auth card for new user registration.
 * Redirects to /dashboard on success.
 */
const RegisterPage = () => {
  const { register, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated) navigate('/dashboard', { replace: true });
  }, [isAuthenticated, navigate]);

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Name is required';
    else if (formData.name.trim().length < 2) errs.name = 'Name must be at least 2 characters';

    if (!formData.email) errs.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      errs.email = 'Enter a valid email address';

    if (!formData.password) errs.password = 'Password is required';
    else if (formData.password.length < 6)
      errs.password = 'Password must be at least 6 characters';

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
      await register(formData.name.trim(), formData.email, formData.password);
      toast.success('Account created! Welcome to TaskNest 🎉');
      navigate('/dashboard');
    } catch (err) {
      const message = err.response?.data?.message || 'Registration failed. Please try again.';
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
      <title>Register — TaskNest</title>

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
          <h1 className="text-3xl font-extrabold text-[#E8E8F0] mb-2">Create your account</h1>
          <p className="text-[#6B6B80] text-sm">Start organizing your tasks today</p>
        </div>

        {/* Card */}
        <div className="bg-[#111118] border border-[#1E1E2E] rounded-2xl p-8 shadow-2xl shadow-black/50">
          <form onSubmit={handleSubmit} noValidate className="space-y-5">
            {/* Name */}
            <div>
              <label htmlFor="register-name" className="block text-sm font-medium text-[#E8E8F0] mb-2">
                Full name
              </label>
              <input
                id="register-name"
                name="name"
                type="text"
                autoComplete="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your full name"
                className={inputClass('name')}
              />
              {errors.name && (
                <p className="mt-1.5 text-xs text-[#FF4D6D]">{errors.name}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="register-email" className="block text-sm font-medium text-[#E8E8F0] mb-2">
                Email address
              </label>
              <input
                id="register-email"
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
              <label htmlFor="register-password" className="block text-sm font-medium text-[#E8E8F0] mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="register-password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="At least 6 characters"
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
              id="btn-register"
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3 bg-[#6C63FF] hover:bg-[#5a52d5] disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-[#6C63FF30] hover:shadow-[#6C63FF50]"
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Creating account...
                </>
              ) : (
                'Create account'
              )}
            </button>
          </form>

          {/* Login Link */}
          <p className="mt-6 text-center text-sm text-[#6B6B80]">
            Already have an account?{' '}
            <Link
              to="/login"
              id="link-to-login"
              className="text-[#6C63FF] hover:text-[#8880ff] font-medium transition-colors"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
