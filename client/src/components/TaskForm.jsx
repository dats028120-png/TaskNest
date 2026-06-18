import { useState, useEffect } from 'react';
import { X, Loader2 } from 'lucide-react';

/**
 * TaskForm — Modal form for creating or editing a task.
 *
 * @param {Object} props
 * @param {Object|null} props.task - Existing task for edit mode, or null for create mode
 * @param {Function} props.onSubmit - Called with form data on submit
 * @param {Function} props.onClose - Called when the modal should close
 */
const TaskForm = ({ task, onSubmit, onClose }) => {
  const isEdit = !!task;
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'Pending',
    priority: 'Medium',
    dueDate: '',
  });

  // Pre-fill form fields when editing an existing task
  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || '',
        description: task.description || '',
        status: task.status || 'Pending',
        priority: task.priority || 'Medium',
        dueDate: task.dueDate
          ? new Date(task.dueDate).toISOString().split('T')[0]
          : '',
      });
    }
  }, [task]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear validation error when user starts typing
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setSubmitting(true);
    try {
      await onSubmit({
        ...formData,
        dueDate: formData.dueDate || undefined,
      });
      onClose();
    } catch (err) {
      setErrors({ submit: err.response?.data?.message || 'Something went wrong' });
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass = (fieldName) => `
    w-full bg-[#0A0A0F] border rounded-lg px-4 py-2.5 text-[#E8E8F0] text-sm
    placeholder-[#6B6B80] outline-none transition-all duration-200
    ${errors[fieldName]
      ? 'border-[#FF4D6D] focus:border-[#FF4D6D] focus:ring-2 focus:ring-[#FF4D6D20]'
      : 'border-[#1E1E2E] focus:border-[#6C63FF] focus:ring-2 focus:ring-[#6C63FF20]'
    }
  `;

  return (
    /* Modal Overlay */
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="task-form-title"
    >
      {/* Modal Panel */}
      <div className="w-full max-w-lg bg-[#111118] border border-[#1E1E2E] rounded-2xl shadow-2xl shadow-black/50 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#1E1E2E]">
          <h2 id="task-form-title" className="text-lg font-bold text-[#E8E8F0]">
            {isEdit ? 'Edit Task' : 'Create New Task'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-[#6B6B80] hover:text-[#E8E8F0] hover:bg-[#1E1E2E] rounded-lg transition-all duration-150"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Title */}
          <div>
            <label htmlFor="task-title" className="block text-sm font-medium text-[#E8E8F0] mb-1.5">
              Title <span className="text-[#FF4D6D]">*</span>
            </label>
            <input
              id="task-title"
              name="title"
              type="text"
              value={formData.title}
              onChange={handleChange}
              placeholder="What needs to be done?"
              className={inputClass('title')}
              autoFocus
            />
            {errors.title && (
              <p className="mt-1 text-xs text-[#FF4D6D]">{errors.title}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label htmlFor="task-desc" className="block text-sm font-medium text-[#E8E8F0] mb-1.5">
              Description
            </label>
            <textarea
              id="task-desc"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Add more details (optional)..."
              rows={3}
              className={`${inputClass('description')} resize-none`}
            />
          </div>

          {/* Status + Priority Row */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="task-status" className="block text-sm font-medium text-[#E8E8F0] mb-1.5">
                Status
              </label>
              <select
                id="task-status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className={inputClass('status')}
              >
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
            <div>
              <label htmlFor="task-priority" className="block text-sm font-medium text-[#E8E8F0] mb-1.5">
                Priority
              </label>
              <select
                id="task-priority"
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className={inputClass('priority')}
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
          </div>

          {/* Due Date */}
          <div>
            <label htmlFor="task-due" className="block text-sm font-medium text-[#E8E8F0] mb-1.5">
              Due Date
            </label>
            <input
              id="task-due"
              name="dueDate"
              type="date"
              value={formData.dueDate}
              onChange={handleChange}
              className={`${inputClass('dueDate')} [color-scheme:dark]`}
            />
          </div>

          {/* Submit Error */}
          {errors.submit && (
            <p className="text-sm text-[#FF4D6D] bg-[#FF4D6D10] border border-[#FF4D6D30] rounded-lg px-3 py-2">
              {errors.submit}
            </p>
          )}

          {/* Actions */}
          <div className="flex items-center gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 rounded-lg border border-[#1E1E2E] text-[#6B6B80] text-sm font-medium hover:bg-[#1E1E2E] hover:text-[#E8E8F0] transition-all duration-200"
            >
              Cancel
            </button>
            <button
              id="btn-task-submit"
              type="submit"
              disabled={submitting}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-[#6C63FF] hover:bg-[#5a52d5] disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-lg transition-all duration-200 shadow-lg shadow-[#6C63FF30]"
            >
              {submitting ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Saving...
                </>
              ) : (
                isEdit ? 'Update Task' : 'Create Task'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
