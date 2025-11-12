import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import { CloseIcon, SendIcon } from './Icons';

interface ChatbotProps {
  isOpen: boolean;
  onClose: () => void;
}

type ConversationStage = 'initial' | 'awaiting_zip';

const Chatbot: React.FC<ChatbotProps> = ({ isOpen, onClose }) => {
  const [history, setHistory] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [conversationStage, setConversationStage] = useState<ConversationStage>('initial');
  const chatMessagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  }, [history, isLoading]);

  useEffect(() => {
    if (isOpen) {
      setHistory([]);
      setInputValue('');
      setIsLoading(false);
      setConversationStage('initial');
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userMessageContent = inputValue;

    const userMessage: ChatMessage = {
      id: Date.now(),
      content: `<div class="message-container user-message">${userMessageContent}</div>`,
    };
    setHistory(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    setTimeout(() => {
      let aiMessage: ChatMessage;

      const isNuggetsQuery = userMessageContent.toLowerCase().includes('nuggets');
      const isZipCode = /^\d{5}$/.test(userMessageContent.trim());

      if (conversationStage === 'awaiting_zip' && isZipCode) {
        const gameDetailsHtml = `
          <div class="message-container ai-message-container">
            <p style="margin-bottom: 1rem;">Here are the broadcast details for the next Denver Nuggets game in your area (${userMessageContent}):</p>
            
            <div style="display: flex; align-items: center; justify-content: space-around; background-color: #2a2a2a; padding: 16px; border-radius: 8px; text-align: center; margin-bottom: 1rem;">
              <div style="display: flex; flex-direction: column; align-items: center; width: 80px;">
                <img src="https://cdn.nba.com/logos/nba/1610612743/primary/L/logo.svg" alt="Nuggets logo" style="width: 60px; height: 60px; margin-bottom: 8px;" />
                <span style="font-weight: bold;">Nuggets</span>
              </div>
              <div style="font-size: 1.5rem; font-weight: bold; color: #a0a0a0;">VS</div>
              <div style="display: flex; flex-direction: column; align-items: center; width: 80px;">
                <img src="https://cdn.nba.com/logos/nba/1610612758/primary/L/logo.svg" alt="Kings logo" style="width: 60px; height: 60px; margin-bottom: 8px;" />
                <span style="font-weight: bold;">Kings</span>
              </div>
            </div>
            
            <div style="padding: 0;">
                <ul style="list-style-type: none; padding-left: 0; font-size: 0.9em;">
                    <li style="margin-bottom: 4px;"><strong>Date:</strong> Tuesday, November 11th</li>
                    <li style="margin-bottom: 4px;"><strong>Time:</strong> 9:00 PM (Mountain Time)</li>
                    <li style="margin-bottom: 4px;"><strong>Venue:</strong> Golden 1 Center</li>
                </ul>
            </div>

            <div style="margin-top: 12px; padding-top: 12px; border-top: 1px solid #444;">
                <div style="display: flex; align-items: center; gap: 8px; font-weight: bold; margin-bottom: 8px;">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" style="width: 20px; height: 20px;">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M6 20.25h12m-7.5-3.75v3.75m-3.75-3.75v3.75m-3.75-3.75h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v9.75A2.25 2.25 0 004.5 16.5z" />
                  </svg>
                  <span>Watch on</span>
                </div>
                <div style="padding-left: 28px;">
                    <p style="margin-bottom: 4px;"><strong>TV Options:</strong></p>
                    <ul style="list-style-type: disc; padding-left: 20px; margin-top: 4px; margin-bottom: 12px;">
                       <li>
                          Altitude TV
                          <ul style="list-style-type: circle; padding-left: 20px; margin-top: 4px; color: #a0a0a0;">
                              <li>Comcast/Xfinity: Channel 1250</li>
                              <li>DirecTV: Channel 681 (HD)</li>
                              <li>DISH Network: Channel 360</li>
                          </ul>
                      </li>
                      <li style="margin-top: 8px;">NBC - Channel 9-4</li>
                    </ul>
                    <p style="margin-top: 12px; margin-bottom: 4px;"><strong>Streaming Options:</strong></p>
                    <ul style="list-style-type: disc; padding-left: 20px; margin-top: 4px;">
                        <li>Peacock</li>
                        <li>Altitude+</li>
                    </ul>
                </div>
            </div>
          </div>
        `;
        aiMessage = { id: Date.now() + 1, content: gameDetailsHtml };
        setConversationStage('initial'); 
      } else if (conversationStage === 'initial' && isNuggetsQuery) {
        const askForZipHtml = `
          <div class="message-container ai-message-container">
              <p>Sure, I can help with that! To give you the most accurate local channel information, what's your current zip code?</p>
          </div>
        `;
        aiMessage = { id: Date.now() + 1, content: askForZipHtml };
        setConversationStage('awaiting_zip');
      } else {
        const fallbackHtml = `
          <div class="message-container ai-message-container">
              <p>Of course! The NBA Finals are currently underway.</p>
              <p>The matchup is between the <strong>Boston Celtics</strong> and the <strong>Dallas Mavericks</strong>.</p>
              <p>Here are the details for the next game:</p>
              <ul style="list-style-type: disc; padding-left: 20px; margin-top: 8px; margin-bottom: 8px;">
                  <li><strong>Game:</strong> Game 4</li>
                  <li><strong>Date:</strong> Friday, June 14, 2024</li>
                  <li><strong>Time:</strong> 8:30 PM ET</li>
                  <li><strong>Channel:</strong> ABC</li>
              </ul>
              <p>The Celtics currently lead the series 3-0. It's a pivotal game for the Mavericks!</p>
          </div>
        `;
        aiMessage = { id: Date.now() + 1, content: fallbackHtml };
        setConversationStage('initial');
      }
      
      setHistory(prev => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1500);
  };
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4">
      <div className="bg-brand-surface w-full max-w-2xl h-[90vh] max-h-[700px] rounded-lg shadow-2xl flex flex-col transform transition-all animate-fade-in-up">
        <header className="flex justify-between items-center p-4 border-b border-brand-secondary">
          <h2 className="text-xl font-bold">Ask about a Game</h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-brand-secondary transition-colors">
            <CloseIcon className="w-6 h-6" />
          </button>
        </header>
        
        <div id="chat-messages-wrapper" ref={chatMessagesRef} className="flex-1 p-4 overflow-y-auto">
          {history.map((msg) => (
             <div key={msg.id} dangerouslySetInnerHTML={{ __html: msg.content }} />
          ))}
          {isLoading && (
            <div className="flex items-center gap-3 p-3 bg-brand-secondary/50 rounded-lg">
                <div className="w-2 h-2 bg-brand-primary rounded-full animate-pulse [animation-delay:-0.3s]"></div>
                <div className="w-2 h-2 bg-brand-primary rounded-full animate-pulse [animation-delay:-0.15s]"></div>
                <div className="w-2 h-2 bg-brand-primary rounded-full animate-pulse"></div>
                <span className="text-sm text-brand-text-secondary">AI is thinking...</span>
            </div>
          )}
        </div>
        
        <form onSubmit={handleSubmit} className="p-4 border-t border-brand-secondary flex items-center gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="e.g., 'where to watch the Bruins tonight?'"
            autoFocus
            className="flex-1 bg-brand-secondary border border-brand-secondary/50 rounded-full py-2 px-4 text-brand-text focus:outline-none focus:ring-2 focus:ring-brand-primary"
          />
          <button type="submit" disabled={isLoading} className="bg-brand-primary text-white p-3 rounded-full hover:opacity-90 disabled:bg-gray-500 transition-colors">
            <SendIcon className="w-5 h-5" />
          </button>
        </form>
      </div>
       <style>{`
            .message-container { margin-bottom: 12px; padding: 10px 15px; border-radius: 18px; max-width: 85%; word-wrap: break-word; }
            .user-message { background-color: #F25C29; color: white; align-self: flex-end; margin-left: auto; border-bottom-right-radius: 4px; }
            .ai-message-container { background-color: #333; color: #e0e0e0; align-self: flex-start; margin-right: auto; border-bottom-left-radius: 4px; }
            .ai-message-container p { margin: 0.2em 0; }
            @keyframes fade-in-up {
              from { opacity: 0; transform: translateY(20px); }
              to { opacity: 1; transform: translateY(0); }
            }
            .animate-fade-in-up { animation: fade-in-up 0.3s ease-out forwards; }
        `}</style>
    </div>
  );
};

export default Chatbot;