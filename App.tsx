import React, { useState } from 'react';
import Header from './components/Header';
import SportsWidget from './components/SportsWidget';
import Chatbot from './components/Chatbot';
import { MOCK_EVENTS } from './constants';
import { SportEvent } from './types';
import { NbaIcon, NflIcon, SoccerIcon } from './components/Icons';
import EventDetailsModal from './components/EventDetailsModal';

const App: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<SportEvent | null>(null);


  const getSportIcon = (sport: string) => {
    switch (sport.toLowerCase()) {
      case 'nba':
        return <NbaIcon className="w-8 h-8" />;
      case 'nfl':
        return <NflIcon className="w-8 h-8" />;
      case 'soccer':
        return <SoccerIcon className="w-8 h-8" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-brand-bg font-sans">
      <Header onChatOpen={() => setIsChatOpen(true)} />
      
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-2 text-center text-brand-text">Live Now & Upcoming</h1>
        <p className="text-brand-text-secondary text-center mb-8 max-w-2xl mx-auto">
          Get a quick glance at today's top matches. Need info on another game? Just ask our AI assistant.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_EVENTS.map((event: SportEvent) => (
            <SportsWidget 
              key={event.id} 
              event={event} 
              icon={getSportIcon(event.sport)}
              onClick={() => setSelectedEvent(event)}
            />
          ))}
        </div>
      </main>

      <footer className="text-center py-8 mt-8 border-t border-brand-secondary">
        <p className="text-brand-text-secondary">&copy; 2024 Whatz On, Doc?. All Rights Reserved.</p>
      </footer>

      <Chatbot isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
      
      {selectedEvent && (
        <EventDetailsModal 
          isOpen={!!selectedEvent}
          onClose={() => setSelectedEvent(null)}
          event={selectedEvent}
        />
      )}
    </div>
  );
};

export default App;