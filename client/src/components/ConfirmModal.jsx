import { AlertTriangle, Trash2, X } from 'lucide-react';

/**
 * ConfirmModal — Confirmation dialog for destructive actions (e.g., delete).
 *
 * @param {Object} props
 * @param {string} props.message - Confirmation message to display
 * @param {Function} props.onConfirm - Called when user confirms
 * @param {Function} props.onCancel - Called when user cancels
 */
const ConfirmModal = ({ message, onConfirm, onCancel }) => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      role="alertdialog"
      aria-modal="true"
      aria-labelledby="confirm-title"
      aria-describedby="confirm-message"
    >
      <div className="w-full max-w-md bg-[#111118] border border-[#1E1E2E] rounded-2xl shadow-2xl shadow-black/50 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#1E1E2E]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#FF4D6D20] flex items-center justify-center">
              <AlertTriangle size={16} className="text-[#FF4D6D]" />
            </div>
            <h2 id="confirm-title" className="text-base font-bold text-[#E8E8F0]">
              Are you sure?
            </h2>
          </div>
          <button
            onClick={onCancel}
            className="p-1.5 text-[#6B6B80] hover:text-[#E8E8F0] hover:bg-[#1E1E2E] rounded-lg transition-all duration-150"
            aria-label="Cancel"
          >
            <X size={16} />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5">
          <p id="confirm-message" className="text-sm text-[#6B6B80] leading-relaxed">
            {message || 'This action cannot be undone.'}
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 px-6 pb-6">
          <button
            id="btn-cancel-confirm"
            onClick={onCancel}
            className="flex-1 px-4 py-2.5 rounded-lg border border-[#1E1E2E] text-[#6B6B80] text-sm font-medium hover:bg-[#1E1E2E] hover:text-[#E8E8F0] transition-all duration-200"
          >
            Cancel
          </button>
          <button
            id="btn-confirm-delete"
            onClick={onConfirm}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-[#FF4D6D] hover:bg-[#e03a58] text-white text-sm font-semibold rounded-lg transition-all duration-200 shadow-lg shadow-[#FF4D6D30]"
          >
            <Trash2 size={14} />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
