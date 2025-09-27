import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import ChatBot from './ChatBot';

const ChatBotToggle: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <button
          onClick={toggleChat}
          className="fixed bottom-6 right-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 z-50 group"
        >
          <MessageCircle className="w-6 h-6" />
          <div className="absolute -top-2 -left-2 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
          
          {/* Tooltip */}
          <div className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white text-sm px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Ask AI Career Advisor
            <div className="absolute left-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-l-gray-900"></div>
          </div>
        </button>
      )}

      {/* Chat Interface */}
      <ChatBot isOpen={isOpen} onToggle={toggleChat} />
    </>
  );
};

export default ChatBotToggle;