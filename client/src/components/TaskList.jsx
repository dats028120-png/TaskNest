import { CheckSquare } from 'lucide-react';
import TaskCard from './TaskCard';
import LoadingSpinner from './LoadingSpinner';

/**
 * TaskList — Renders a responsive grid of TaskCards.
 * Shows loading spinner during fetch, empty state if no tasks, or the grid.
 *
 * @param {Object} props
 * @param {Array} props.tasks - Array of task objects
 * @param {boolean} props.loading - Whether tasks are loading
 * @param {Function} [props.onEdit] - Edit callback passed to TaskCard
 * @param {Function} [props.onDelete] - Delete callback passed to TaskCard
 */
const TaskList = ({ tasks, loading, onEdit, onDelete }) => {
  if (loading) {
    return <LoadingSpinner />;
  }

  if (!tasks || tasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <div className="w-16 h-16 rounded-2xl bg-[#1E1E2E] flex items-center justify-center">
          <CheckSquare size={28} className="text-[#6B6B80]" />
        </div>
        <div className="text-center">
          <h3 className="text-lg font-semibold text-[#E8E8F0] mb-1">No tasks found</h3>
          <p className="text-sm text-[#6B6B80]">
            Create your first task to get started!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {tasks.map((task) => (
        <TaskCard
          key={task._id}
          task={task}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default TaskList;
