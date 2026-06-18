import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { LogOut, LayoutDashboard, CheckSquare, Menu, X } from 'lucide-react';
import useAuth from '../hooks/useAuth';

/**
 * Navbar — Sticky top navigation bar with logo, nav links, user info, and logout.
 * Responsive: shows hamburger menu on mobile.
 */
const Navbar = () => {
  const { user, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
      isActive
        ? 'bg-[#6C63FF20] text-[#6C63FF]'
        : 'text-[#6B6B80] hover:text-[#E8E8F0] hover:bg-[#1E1E2E]'
    }`;

  return (
    <nav className="sticky top-0 z-40 w-full bg-[#111118] border-b border-[#1E1E2E] backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* ── Logo ─────────────────────────────────────────────────────── */}
          <Link
            to="/dashboard"
            className="flex items-center gap-2 group"
            aria-label="TaskNest Home"
          >
            <div className="w-8 h-8 rounded-lg bg-[#6C63FF] flex items-center justify-center shadow-lg shadow-[#6C63FF33] group-hover:shadow-[#6C63FF55] transition-shadow duration-300">
              <span className="text-white font-bold text-sm">TN</span>
            </div>
            <span className="text-xl font-extrabold text-[#E8E8F0] tracking-tight">
              Task<span className="text-[#6C63FF]">Nest</span>
            </span>
          </Link>

          {/* ── Desktop Nav Links ─────────────────────────────────────────── */}
          <div className="hidden md:flex items-center gap-1">
            <NavLink to="/dashboard" className={navLinkClass} id="nav-dashboard">
              <LayoutDashboard size={16} />
              Dashboard
            </NavLink>
            <NavLink to="/tasks" className={navLinkClass} id="nav-tasks">
              <CheckSquare size={16} />
              Tasks
            </NavLink>
          </div>

          {/* ── User + Logout ──────────────────────────────────────────────── */}
          <div className="hidden md:flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-[#1E1E2E] rounded-lg">
              <div className="w-7 h-7 rounded-full bg-[#6C63FF] flex items-center justify-center text-white text-xs font-bold">
                {user?.name?.[0]?.toUpperCase() || 'U'}
              </div>
              <span className="text-sm font-medium text-[#E8E8F0]">
                {user?.name || 'User'}
              </span>
            </div>
            <button
              onClick={logout}
              id="btn-logout"
              className="flex items-center gap-2 px-3 py-2 text-sm text-[#6B6B80] hover:text-[#FF4D6D] hover:bg-[#FF4D6D15] rounded-lg transition-all duration-200"
              title="Logout"
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>

          {/* ── Mobile Hamburger ───────────────────────────────────────────── */}
          <button
            className="md:hidden p-2 text-[#6B6B80] hover:text-[#E8E8F0] transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle mobile menu"
            id="btn-mobile-menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* ── Mobile Menu ──────────────────────────────────────────────────────── */}
      {mobileOpen && (
        <div className="md:hidden bg-[#111118] border-t border-[#1E1E2E] px-4 py-3 space-y-1">
          <NavLink
            to="/dashboard"
            className={navLinkClass}
            onClick={() => setMobileOpen(false)}
          >
            <LayoutDashboard size={16} />
            Dashboard
          </NavLink>
          <NavLink
            to="/tasks"
            className={navLinkClass}
            onClick={() => setMobileOpen(false)}
          >
            <CheckSquare size={16} />
            Tasks
          </NavLink>
          <div className="pt-2 border-t border-[#1E1E2E] flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-[#E8E8F0]">
              <div className="w-7 h-7 rounded-full bg-[#6C63FF] flex items-center justify-center text-white text-xs font-bold">
                {user?.name?.[0]?.toUpperCase() || 'U'}
              </div>
              {user?.name}
            </div>
            <button
              onClick={() => { logout(); setMobileOpen(false); }}
              className="flex items-center gap-1 text-sm text-[#FF4D6D]"
            >
              <LogOut size={14} />
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
