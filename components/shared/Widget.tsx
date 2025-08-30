
import React from 'react';

interface WidgetProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

const Widget: React.FC<WidgetProps> = ({ title, children, className = '' }) => {
  return (
    <div className={`bg-widget-bg border border-border-color rounded-lg shadow-lg p-4 flex flex-col ${className}`}>
      <h3 className="text-sm font-semibold text-gray-400 mb-2 border-b border-border-color pb-2">{title}</h3>
      <div className="flex-grow">
        {children}
      </div>
    </div>
  );
};

export default Widget;
