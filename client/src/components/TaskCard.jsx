import { Pencil, Trash2, Calendar, Clock } from 'lucide-react';
import { formatDate, isOverdue } from '../utils/dateUtils';

/**
 * Priority configuration: border color, text color, and label for each level.
 */
const PRIORITY_CONFIG = {
  High: { border: 'border-l-[#FF4D6D]', badge: 'bg-[#FF4D6D20] text-[#FF4D6D]' },
  Medium: { border: 'border-l-[#F5A623]', badge: 'bg-[#F5A62320] text-[#F5A623]' },
  Low: { border: 'border-l-[#22D3A5]', badge: 'bg-[#22D3A520] text-[#22D3A5]' },
};

/**
 * TaskCard — Displays a single task with priority strip, status badge,
 * due date, and edit/delete actions.
 *
 * @param {Object} props
 * @param {Object} props.task - Task data object
 * @param {Function} [props.onEdit] - Callback when edit button is clicked
 * @param {Function} [props.onDelete] - Callback when delete button is clicked
 */
const TaskCard = ({ task, onEdit, onDelete }) => {
  const priority = PRIORITY_CONFIG[task.priority] || PRIORITY_CONFIG.Medium;
  const overdue = task.dueDate && isOverdue(task.dueDate) && task.status !== 'Completed';
  const isCompleted = task.status === 'Completed';
  const showActions = onEdit || onDelete;

  return (
    <article
      className={`
        relative bg-[#111118] rounded-xl border border-[#1E1E2E] border-l-4 ${priority.border}
        p-5 flex flex-col gap-3
        transition-all duration-200
        hover:border-[#6C63FF] hover:shadow-[0_0_20px_rgba(108,99,255,0.15)]
        hover:scale-[1.01] cursor-pointer
        group
      `}
    >
      {/* ── Priority Badge ─────────────────────────────────────────────────── */}
      <div className="flex items-start justify-between gap-2">
        <span
          className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold font-mono ${priority.badge}`}
        >
          {task.priority}
        </span>

        {/* ── Action Buttons ─────────────────────────────────────────────── */}
        {showActions && (
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            {onEdit && (
              <button
                onClick={(e) => { e.stopPropagation(); onEdit(task); }}
                className="p-1.5 text-[#6B6B80] hover:text-[#6C63FF] hover:bg-[#6C63FF15] rounded-lg transition-all duration-150"
                title="Edit task"
                aria-label={`Edit ${task.title}`}
              >
                <Pencil size={14} />
              </button>
            )}
            {onDelete && (
              <button
                onClick={(e) => { e.stopPropagation(); onDelete(task); }}
                className="p-1.5 text-[#6B6B80] hover:text-[#FF4D6D] hover:bg-[#FF4D6D15] rounded-lg transition-all duration-150"
                title="Delete task"
                aria-label={`Delete ${task.title}`}
              >
                <Trash2 size={14} />
              </button>
            )}
          </div>
        )}
      </div>

      {/* ── Title ─────────────────────────────────────────────────────────── */}
      <h3
        className={`font-bold text-base leading-snug ${
          isCompleted ? 'line-through text-[#6B6B80]' : 'text-[#E8E8F0]'
        }`}
      >
        {task.title}
      </h3>

      {/* ── Description ───────────────────────────────────────────────────── */}
      {task.description && (
        <p className="text-sm text-[#6B6B80] line-clamp-2 leading-relaxed">
          {task.description}
        </p>
      )}

      {/* ── Footer ────────────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between pt-1 border-t border-[#1E1E2E] mt-auto">
        {/* Status Badge */}
        <span
          className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold font-mono ${
            isCompleted
              ? 'bg-[#22D3A520] text-[#22D3A5]'
              : 'bg-[#1E1E2E] text-[#6B6B80]'
          }`}
        >
          {task.status}
        </span>

        {/* Due Date */}
        {task.dueDate && (
          <span
            className={`flex items-center gap-1 text-xs font-mono ${
              overdue ? 'text-[#FF4D6D]' : 'text-[#6B6B80]'
            }`}
            title={overdue ? 'Overdue!' : 'Due date'}
          >
            {overdue ? <Clock size={12} /> : <Calendar size={12} />}
            {formatDate(task.dueDate)}
          </span>
        )}
      </div>
    </article>
  );
};

export default TaskCard;
