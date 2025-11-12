import React from 'react';
import { ChatIcon } from './Icons';

interface HeaderProps {
  onChatOpen: () => void;
}

const Header: React.FC<HeaderProps> = ({ onChatOpen }) => {
  return (
    <header className="bg-brand-surface/80 backdrop-blur-sm sticky top-0 z-20 border-b border-brand-secondary">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-2">
            <img src="../logo.png" alt="Whatz On, Doc? Logo" className="h-10" />
        </div>
        <button
          onClick={onChatOpen}
          className="bg-brand-primary hover:opacity-90 text-white font-bold py-2 px-4 rounded-full flex items-center gap-2 transition-transform transform hover:scale-105"
        >
          <ChatIcon className="w-5 h-5" />
          <span>Find your game</span>
        </button>
      </div>
    </header>
  );
};

export default Header;