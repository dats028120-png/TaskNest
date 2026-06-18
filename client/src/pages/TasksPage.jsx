import { useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';
import { Plus } from 'lucide-react';
import Navbar from '../components/Navbar';
import TaskFilter from '../components/TaskFilter';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';
import ConfirmModal from '../components/ConfirmModal';
import useTasks from '../hooks/useTasks';

/**
 * TasksPage — Full task management page with CRUD operations,
 * filter/search, FAB create button, and delete confirmation modal.
 */
const TasksPage = () => {
  const { tasks, loading, fetchTasks, addTask, editTask, removeTask } = useTasks();

  const [filters, setFilters] = useState({
    search: '',
    status: '',
    priority: '',
    sort: '',
  });

  // Modal state
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [deletingTask, setDeletingTask] = useState(null);

  // Fetch tasks whenever filters change
  useEffect(() => {
    // Debounce search to avoid hammering the API
    const timer = setTimeout(() => {
      fetchTasks(filters);
    }, filters.search ? 400 : 0);

    return () => clearTimeout(timer);
  }, [filters, fetchTasks]);

  const handleFilterChange = useCallback((newFilters) => {
    setFilters(newFilters);
  }, []);

  // ── Create / Edit ─────────────────────────────────────────────────────────
  const handleOpenCreate = () => {
    setEditingTask(null);
    setShowTaskForm(true);
  };

  const handleOpenEdit = (task) => {
    setEditingTask(task);
    setShowTaskForm(true);
  };

  const handleTaskSubmit = async (formData) => {
    if (editingTask) {
      await editTask(editingTask._id, formData);
      toast.success('Task updated successfully ✨');
    } else {
      await addTask(formData);
      toast.success('Task created! 🎉');
    }
  };

  // ── Delete ────────────────────────────────────────────────────────────────
  const handleDeleteClick = (task) => {
    setDeletingTask(task);
  };

  const handleConfirmDelete = async () => {
    if (!deletingTask) return;
    try {
      await removeTask(deletingTask._id);
      toast.success('Task deleted');
    } catch {
      toast.error('Failed to delete task');
    } finally {
      setDeletingTask(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0F]">
      <title>My Tasks — TaskNest</title>
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* ── Page Header ──────────────────────────────────────────────────── */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-extrabold text-[#E8E8F0] tracking-tight">
              My Tasks
            </h1>
            {!loading && (
              <span className="px-3 py-1 bg-[#6C63FF20] text-[#6C63FF] text-sm font-semibold rounded-full font-mono">
                {tasks.length}
              </span>
            )}
          </div>

          {/* Desktop Create Button */}
          <button
            id="btn-create-task-header"
            onClick={handleOpenCreate}
            className="hidden sm:flex items-center gap-2 px-4 py-2 bg-[#6C63FF] hover:bg-[#5a52d5] text-white text-sm font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-[#6C63FF30]"
          >
            <Plus size={16} />
            New Task
          </button>
        </div>

        {/* ── Filters ───────────────────────────────────────────────────────── */}
        <div className="mb-6">
          <TaskFilter filters={filters} onFilterChange={handleFilterChange} />
        </div>

        {/* ── Task Grid ────────────────────────────────────────────────────── */}
        <TaskList
          tasks={tasks}
          loading={loading}
          onEdit={handleOpenEdit}
          onDelete={handleDeleteClick}
        />
      </main>

      {/* ── FAB (Mobile Create Button) ────────────────────────────────────── */}
      <button
        id="btn-fab-create"
        onClick={handleOpenCreate}
        className="fixed bottom-6 right-6 sm:hidden w-14 h-14 bg-[#6C63FF] hover:bg-[#5a52d5] text-white rounded-full shadow-2xl shadow-[#6C63FF40] flex items-center justify-center transition-all duration-200 hover:scale-110 z-30"
        aria-label="Create new task"
      >
        <Plus size={24} />
      </button>

      {/* ── TaskForm Modal ────────────────────────────────────────────────── */}
      {showTaskForm && (
        <TaskForm
          task={editingTask}
          onSubmit={handleTaskSubmit}
          onClose={() => { setShowTaskForm(false); setEditingTask(null); }}
        />
      )}

      {/* ── Delete Confirmation Modal ─────────────────────────────────────── */}
      {deletingTask && (
        <ConfirmModal
          message={`Are you sure you want to delete "${deletingTask.title}"? This action cannot be undone.`}
          onConfirm={handleConfirmDelete}
          onCancel={() => setDeletingTask(null)}
        />
      )}
    </div>
  );
};

export default TasksPage;
