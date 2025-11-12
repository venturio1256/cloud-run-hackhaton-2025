import React from 'react';
import { SportEvent } from '../types';
import { TelevisionIcon } from './Icons';

interface SportsWidgetProps {
  event: SportEvent;
  icon: React.ReactNode;
  onClick: () => void;
}

const StatusBadge: React.FC<{ status: 'LIVE' | 'UPCOMING' | 'FINAL' }> = ({ status }) => {
  const baseClasses = "px-2.5 py-0.5 text-xs font-semibold rounded-full";
  if (status === 'LIVE') {
    return <span className={`${baseClasses} bg-red-500 text-white animate-pulse`}>LIVE</span>;
  }
  if (status === 'UPCOMING') {
    return <span className={`${baseClasses} bg-blue-500 text-white`}>UPCOMING</span>;
  }
  return <span className={`${baseClasses} bg-gray-600 text-gray-200`}>FINAL</span>;
};

const SportsWidget: React.FC<SportsWidgetProps> = ({ event, icon, onClick }) => {
  return (
    <button 
      onClick={onClick}
      className="bg-brand-surface rounded-lg border border-brand-secondary p-4 transition-all duration-300 hover:border-brand-primary hover:shadow-2xl hover:shadow-brand-primary/10 hover:-translate-y-1 text-left w-full focus:outline-none focus:ring-2 focus:ring-brand-primary"
      aria-label={`View details for ${event.teams[0].name} vs ${event.teams[1].name}`}
    >
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2 text-brand-text-secondary font-medium">
          {icon}
          <span>{event.sport}</span>
        </div>
        <StatusBadge status={event.status} />
      </div>

      <div className="flex items-center justify-between space-x-4">
        <div className="flex flex-col items-center text-center w-1/3">
          <img src={event.teams[0].logoUrl} alt={event.teams[0].name} className="w-12 h-12 md:w-16 md:h-16 object-contain mb-2" />
          <span className="font-bold text-sm md:text-base text-brand-text">{event.teams[0].name}</span>
        </div>

        <div className="text-center">
            <span className="text-2xl font-bold text-brand-text-secondary">VS</span>
            <p className="text-sm font-semibold mt-1 text-brand-text">{event.time}</p>
        </div>

        <div className="flex flex-col items-center text-center w-1/3">
          <img src={event.teams[1].logoUrl} alt={event.teams[1].name} className="w-12 h-12 md:w-16 md:h-16 object-contain mb-2" />
          <span className="font-bold text-sm md:text-base text-brand-text">{event.teams[1].name}</span>
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-brand-secondary/50 flex items-center justify-center gap-2 text-brand-text-secondary">
        <TelevisionIcon className="w-5 h-5" />
        <span className="font-medium">Watch on {event.channel}</span>
      </div>
    </button>
  );
};

export default SportsWidget;