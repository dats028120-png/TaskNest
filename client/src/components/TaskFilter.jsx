import { Search, SlidersHorizontal } from 'lucide-react';

/**
 * TaskFilter — Filter bar with search input, status, priority, and sort selects.
 *
 * @param {Object} props
 * @param {Object} props.filters - Current filter state
 * @param {Function} props.onFilterChange - Callback when any filter changes
 */
const TaskFilter = ({ filters, onFilterChange }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onFilterChange({ ...filters, [name]: value });
  };

  const selectClass =
    'bg-[#111118] border border-[#1E1E2E] text-[#E8E8F0] text-sm rounded-lg px-3 py-2 outline-none focus:border-[#6C63FF] focus:ring-2 focus:ring-[#6C63FF20] transition-all duration-200 cursor-pointer';

  return (
    <div className="flex flex-wrap gap-3 items-center">
      {/* Search Input */}
      <div className="relative flex-1 min-w-[200px]">
        <Search
          size={15}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6B6B80] pointer-events-none"
        />
        <input
          id="filter-search"
          name="search"
          type="text"
          value={filters.search || ''}
          onChange={handleChange}
          placeholder="Search tasks..."
          className="w-full bg-[#111118] border border-[#1E1E2E] text-[#E8E8F0] text-sm rounded-lg pl-9 pr-4 py-2 outline-none focus:border-[#6C63FF] focus:ring-2 focus:ring-[#6C63FF20] placeholder-[#6B6B80] transition-all duration-200"
        />
      </div>

      {/* Status Filter */}
      <select
        id="filter-status"
        name="status"
        value={filters.status || ''}
        onChange={handleChange}
        className={selectClass}
        aria-label="Filter by status"
      >
        <option value="">All Status</option>
        <option value="Pending">Pending</option>
        <option value="Completed">Completed</option>
      </select>

      {/* Priority Filter */}
      <select
        id="filter-priority"
        name="priority"
        value={filters.priority || ''}
        onChange={handleChange}
        className={selectClass}
        aria-label="Filter by priority"
      >
        <option value="">All Priority</option>
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>

      {/* Sort Select */}
      <select
        id="filter-sort"
        name="sort"
        value={filters.sort || ''}
        onChange={handleChange}
        className={selectClass}
        aria-label="Sort tasks"
      >
        <option value="">Newest First</option>
        <option value="oldest">Oldest First</option>
        <option value="dueDate">Due Date</option>
        <option value="priority">Priority</option>
        <option value="title">Title A-Z</option>
      </select>
    </div>
  );
};

export default TaskFilter;
