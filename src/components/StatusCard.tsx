import React from 'react';
import { AlertTriangle, CheckCircle, XCircle, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { Status } from '../lib/data';

interface StatusCardProps {
  label: string;
  value: string;
  status: Status;
  trend?: 'up' | 'down' | 'neutral';
  description?: string;
}

export function StatusCard({ label, value, status, trend, description }: StatusCardProps) {
  const getStatusColor = (s: Status) => {
    switch (s) {
      case 'ok': return 'bg-[#2e6a50]/5 text-[#2e6a50] border-[#2e6a50]/20';
      case 'warning': return 'bg-[#e8a455]/5 text-[#e8a455] border-[#e8a455]/20';
      case 'danger': return 'bg-red-50 text-red-700 border-red-200'; // Keeping standard red for danger as requested by semaphore logic, unless user wants full custom
      default: return 'bg-[#f7f7f7] text-[#626262] border-[#bbbbbb]/30';
    }
  };

  const getIcon = (s: Status) => {
    switch (s) {
      case 'ok': return <CheckCircle className="w-5 h-5 text-[#2e6a50]" />;
      case 'warning': return <AlertTriangle className="w-5 h-5 text-[#e8a455]" />;
      case 'danger': return <XCircle className="w-5 h-5 text-red-500" />;
    }
  };

  const getTrendIcon = (t?: string) => {
    switch (t) {
      case 'up': return <TrendingUp className="w-4 h-4" />;
      case 'down': return <TrendingDown className="w-4 h-4" />;
      default: return <Minus className="w-4 h-4" />;
    }
  };

  return (
    <div className={`p-4 rounded-xl border flex flex-col justify-between h-full transition-all hover:shadow-md ${getStatusColor(status)}`}>
      <div className="flex justify-between items-start mb-2">
        <span className="text-sm font-medium opacity-80">{label}</span>
        {getIcon(status)}
      </div>
      <div>
        <div className="flex items-end gap-2">
          <span className="text-2xl font-bold">{value}</span>
          {trend && (
             <div className="flex items-center text-xs font-medium px-1.5 py-0.5 rounded bg-white/50 text-current">
                {getTrendIcon(trend)}
             </div>
          )}
        </div>
        {description && <p className="text-xs mt-1 opacity-70">{description}</p>}
      </div>
    </div>
  );
}
