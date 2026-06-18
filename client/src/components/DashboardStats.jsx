import { CheckCircle2, Clock, ListTodo, AlertTriangle } from 'lucide-react';

/**
 * DashboardStats — Displays 4 stat cards with task counts.
 *
 * @param {Object} props
 * @param {Object} props.stats - { total, pending, completed, high, medium, low }
 */
const DashboardStats = ({ stats }) => {
  const cards = [
    {
      id: 'stat-total',
      label: 'Total Tasks',
      value: stats?.total ?? 0,
      icon: ListTodo,
      color: 'text-[#6C63FF]',
      bg: 'bg-[#6C63FF15]',
      border: 'border-[#6C63FF30]',
      iconBg: 'bg-[#6C63FF20]',
    },
    {
      id: 'stat-pending',
      label: 'Pending',
      value: stats?.pending ?? 0,
      icon: Clock,
      color: 'text-[#F5A623]',
      bg: 'bg-[#F5A62315]',
      border: 'border-[#F5A62330]',
      iconBg: 'bg-[#F5A62320]',
    },
    {
      id: 'stat-completed',
      label: 'Completed',
      value: stats?.completed ?? 0,
      icon: CheckCircle2,
      color: 'text-[#22D3A5]',
      bg: 'bg-[#22D3A515]',
      border: 'border-[#22D3A530]',
      iconBg: 'bg-[#22D3A520]',
    },
    {
      id: 'stat-high',
      label: 'High Priority',
      value: stats?.high ?? 0,
      icon: AlertTriangle,
      color: 'text-[#FF4D6D]',
      bg: 'bg-[#FF4D6D15]',
      border: 'border-[#FF4D6D30]',
      iconBg: 'bg-[#FF4D6D20]',
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map(({ id, label, value, icon: Icon, color, bg, border, iconBg }) => (
        <div
          key={id}
          id={id}
          className={`relative bg-[#111118] rounded-xl border ${border} p-5 overflow-hidden transition-all duration-200 hover:scale-[1.02] hover:shadow-lg`}
        >
          {/* Background accent */}
          <div className={`absolute inset-0 ${bg} opacity-30 rounded-xl pointer-events-none`} />

          <div className="relative flex items-start justify-between gap-3">
            <div>
              <p className="text-sm text-[#6B6B80] mb-1 font-medium">{label}</p>
              <p className={`text-3xl font-extrabold ${color} tracking-tight`}>
                {value}
              </p>
            </div>
            <div className={`w-10 h-10 ${iconBg} rounded-xl flex items-center justify-center flex-shrink-0`}>
              <Icon size={20} className={color} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardStats;
