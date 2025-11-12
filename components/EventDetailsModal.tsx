import React from 'react';
import { SportEvent } from '../types';
import { CloseIcon, ChartBarIcon } from './Icons';

interface EventDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: SportEvent;
}

const RecentForm: React.FC<{ form: ('W' | 'L')[] }> = ({ form }) => (
  <div className="flex gap-1">
    {form.map((result, index) => (
      <span
        key={index}
        className={`w-5 h-5 flex items-center justify-center text-xs font-bold rounded-sm ${
          result === 'W' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
        }`}
      >
        {result}
      </span>
    ))}
  </div>
);

const EventDetailsModal: React.FC<EventDetailsModalProps> = ({ isOpen, onClose, event }) => {
  if (!isOpen) return null;

  // Mock data for demonstration
  const team1Stats = { winProbability: '55%', pointsPerGame: '112.5', recentForm: ['W', 'W', 'L', 'W', 'L'] as ('W' | 'L')[] };
  const team2Stats = { winProbability: '45%', pointsPerGame: '109.8', recentForm: ['L', 'W', 'W', 'L', 'W'] as ('W' | 'L')[] };

  return (
    <div 
        className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4"
        onClick={onClose}
    >
      <div 
        className="bg-brand-surface w-full max-w-2xl rounded-lg shadow-2xl flex flex-col transform transition-all animate-fade-in-up relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-3 right-3 p-2 rounded-full hover:bg-brand-secondary transition-colors z-10">
            <CloseIcon className="w-6 h-6" />
        </button>

        {/* Header with team logos */}
        <div className="p-6 bg-brand-secondary/30 rounded-t-lg">
             <div className="flex items-center justify-around space-x-4">
                <div className="flex flex-col items-center text-center">
                    <img src={event.teams[0].logoUrl} alt={event.teams[0].name} className="w-20 h-20 object-contain mb-2" />
                    <span className="font-bold text-lg text-brand-text">{event.teams[0].name}</span>
                </div>
                <div className="text-center">
                    <span className="text-4xl font-bold text-brand-text-secondary">VS</span>
                    <p className="text-md font-semibold mt-2 text-brand-primary">{event.status}</p>
                    <p className="text-sm font-medium mt-1 text-brand-text">{event.time}</p>
                </div>
                <div className="flex flex-col items-center text-center">
                    <img src={event.teams[1].logoUrl} alt={event.teams[1].name} className="w-20 h-20 object-contain mb-2" />
                    <span className="font-bold text-lg text-brand-text">{event.teams[1].name}</span>
                </div>
            </div>
        </div>

        {/* Body with more details */}
        <div className="p-6 space-y-6">
            <div>
                <h3 className="text-lg font-bold text-brand-text mb-3 flex items-center gap-2">
                    <ChartBarIcon className="w-6 h-6 text-brand-primary"/>
                    Team Comparison
                </h3>
                <div className="bg-brand-secondary/30 p-4 rounded-md space-y-2 text-sm">
                    <div className="flex justify-between items-center">
                        <span className="text-brand-text-secondary">{team1Stats.winProbability}</span>
                        <span className="font-semibold">Win Probability</span>
                        <span className="text-brand-text-secondary">{team2Stats.winProbability}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-brand-text-secondary">{team1Stats.pointsPerGame}</span>
                        <span className="font-semibold">Points Per Game</span>
                        <span className="text-brand-text-secondary">{team2Stats.pointsPerGame}</span>
                    </div>
                </div>
            </div>
            
            <div>
                 <h3 className="text-lg font-bold text-brand-text mb-3">Recent Form (Last 5)</h3>
                 <div className="bg-brand-secondary/30 p-4 rounded-md space-y-3">
                    <div className="flex justify-between items-center">
                        <span className="font-semibold w-1/3">{event.teams[0].name}</span>
                        <RecentForm form={team1Stats.recentForm} />
                    </div>
                     <div className="flex justify-between items-center">
                        <span className="font-semibold w-1/3">{event.teams[1].name}</span>
                        <RecentForm form={team2Stats.recentForm} />
                    </div>
                 </div>
            </div>
        </div>
      </div>
       <style>{`
            @keyframes fade-in-up {
              from { opacity: 0; transform: translateY(20px); }
              to { opacity: 1; transform: translateY(0); }
            }
            .animate-fade-in-up { animation: fade-in-up 0.3s ease-out forwards; }
        `}</style>
    </div>
  );
};

export default EventDetailsModal;
