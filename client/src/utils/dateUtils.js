import { format, isPast, isValid, parseISO } from 'date-fns';

/**
 * Formats a date string or Date object into a human-readable format.
 * @param {string|Date} dateString - The date to format
 * @returns {string} Formatted date string (e.g., "15 Jun 2026") or empty string if invalid
 */
export const formatDate = (dateString) => {
  if (!dateString) return '';
  try {
    const date = typeof dateString === 'string' ? parseISO(dateString) : dateString;
    if (!isValid(date)) return '';
    return format(date, 'dd MMM yyyy');
  } catch {
    return '';
  }
};

/**
 * Checks if a due date is in the past (overdue), ignoring time.
 * @param {string|Date} dueDate - The due date to check
 * @returns {boolean} True if the due date has passed, false otherwise
 */
export const isOverdue = (dueDate) => {
  if (!dueDate) return false;
  try {
    const date = typeof dueDate === 'string' ? parseISO(dueDate) : dueDate;
    if (!isValid(date)) return false;
    return isPast(date);
  } catch {
    return false;
  }
};

/**
 * Returns a greeting based on the current hour of the day.
 * @returns {string} 'Good morning', 'Good afternoon', or 'Good evening'
 */
export const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
};
