/**
 * LoadingSpinner — Centered animated spinning ring in accent indigo color.
 * Used during API loading states.
 */
const LoadingSpinner = ({ size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-6 h-6 border-2',
    md: 'w-10 h-10 border-4',
    lg: 'w-16 h-16 border-4',
  };

  return (
    <div className="flex items-center justify-center py-12">
      <div
        className={`${sizeClasses[size]} rounded-full border-[#1E1E2E] border-t-[#6C63FF] animate-spin`}
        role="status"
        aria-label="Loading"
      />
    </div>
  );
};

export default LoadingSpinner;
