
import React from 'react';
import { SatelliteStatus } from '../../types';

interface StatusIndicatorProps {
  status: SatelliteStatus;
  label: string;
}

const StatusIndicator: React.FC<StatusIndicatorProps> = ({ status, label }) => {
  const getStatusColor = () => {
    switch (status) {
      case SatelliteStatus.NOMINAL:
        return 'bg-accent-green';
      case SatelliteStatus.WARNING:
        return 'bg-accent-yellow';
      case SatelliteStatus.CRITICAL:
        return 'bg-accent-red';
      case SatelliteStatus.OFFLINE:
        return 'bg-gray-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <div className={`w-3 h-3 rounded-full ${getStatusColor()}`}></div>
      <span className="text-sm text-gray-300">{label}</span>
    </div>
  );
};

export default StatusIndicator;
