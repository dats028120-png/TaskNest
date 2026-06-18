import { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import DashboardStats from '../components/DashboardStats';
import TaskCard from '../components/TaskCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { getStats, getTasks } from '../api/taskApi';
import { getGreeting } from '../utils/dateUtils';
import Navbar from '../components/Navbar';

/**
 * DashboardPage — Shows greeting, stats overview, and recent tasks.
 */
const DashboardPage = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [recentTasks, setRecentTasks] = useState([]);
  const [loadingStats, setLoadingStats] = useState(true);
  const [loadingTasks, setLoadingTasks] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [statsData, tasksData] = await Promise.all([
          getStats(),
          getTasks({ sort: '' }), // newest first (default)
        ]);
        setStats(statsData);
        setRecentTasks(tasksData.slice(0, 5)); // Last 5 tasks
      } catch (err) {
        console.error('Failed to fetch dashboard data:', err);
      } finally {
        setLoadingStats(false);
        setLoadingTasks(false);
      }
    };

    fetchDashboardData();
  }, []);

  const greeting = getGreeting();

  return (
    <div className="min-h-screen bg-[#0A0A0F]">
      <title>Dashboard — TaskNest</title>
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* ── Greeting Header ─────────────────────────────────────────────── */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#E8E8F0] mb-2 tracking-tight">
            {greeting},{' '}
            <span className="text-[#6C63FF]">{user?.name?.split(' ')[0] || 'there'}</span>
            <span className="ml-2">👋</span>
          </h1>
          <p className="text-[#6B6B80]">
            Here's your task overview for today
          </p>
        </div>

        {/* ── Stats Cards ──────────────────────────────────────────────────── */}
        <section className="mb-10" aria-label="Task statistics">
          {loadingStats ? (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="h-28 bg-[#111118] border border-[#1E1E2E] rounded-xl animate-pulse"
                />
              ))}
            </div>
          ) : (
            <DashboardStats stats={stats} />
          )}
        </section>

        {/* ── Recent Tasks ─────────────────────────────────────────────────── */}
        <section aria-label="Recent tasks">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-bold text-[#E8E8F0]">Recent Tasks</h2>
            <Link
              to="/tasks"
              id="link-view-all-tasks"
              className="flex items-center gap-1 text-sm text-[#6C63FF] hover:text-[#8880ff] font-medium transition-colors"
            >
              View all
              <ArrowRight size={14} />
            </Link>
          </div>

          {loadingTasks ? (
            <LoadingSpinner />
          ) : recentTasks.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 bg-[#111118] rounded-2xl border border-[#1E1E2E]">
              <div className="w-14 h-14 rounded-2xl bg-[#1E1E2E] flex items-center justify-center mb-4">
                <span className="text-2xl">📝</span>
              </div>
              <h3 className="text-base font-semibold text-[#E8E8F0] mb-1">No tasks yet</h3>
              <p className="text-sm text-[#6B6B80] mb-4">Create your first task to get started!</p>
              <Link
                to="/tasks"
                className="px-4 py-2 bg-[#6C63FF] hover:bg-[#5a52d5] text-white text-sm font-medium rounded-lg transition-all duration-200"
              >
                Create Task
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {recentTasks.map((task) => (
                // Read-only TaskCards on dashboard — no edit/delete
                <TaskCard key={task._id} task={task} />
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default DashboardPage;
