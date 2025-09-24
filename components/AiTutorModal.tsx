import React, { useState, useRef, useEffect } from 'react';
import type { ChatMessage } from '../types';
import { getTutorResponse } from '../services/geminiService';
import { AiIcon } from './icons/AiIcon';
import { SendIcon } from './icons/SendIcon';

interface AiTutorModalProps {
  isOpen: boolean;
  onClose: () => void;
  lessonTopic: string;
  lessonNotes: string;
}

const AiTutorModal: React.FC<AiTutorModalProps> = ({ isOpen, onClose, lessonTopic, lessonNotes }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setMessages([
        { role: 'model', content: `Hello! I'm your AI Tutor. How can I help you with "${lessonTopic}" today?` }
      ]);
      setUserInput('');
    }
  }, [isOpen, lessonTopic]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim() || isLoading) return;

    const newMessages: ChatMessage[] = [...messages, { role: 'user', content: userInput.trim() }];
    setMessages(newMessages);
    setUserInput('');
    setIsLoading(true);

    try {
      const response = await getTutorResponse(lessonNotes, lessonTopic, userInput.trim());
      setMessages([...newMessages, { role: 'model', content: response }]);
    } catch (error) {
      setMessages([...newMessages, { role: 'model', content: 'Sorry, something went wrong. Please try again.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="bg-slate-800 border border-slate-700 rounded-2xl shadow-2xl w-full max-w-2xl h-[80vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="p-4 border-b border-slate-700 flex justify-between items-center flex-shrink-0">
          <div className="flex items-center gap-3">
            <AiIcon className="w-7 h-7 text-violet-400" />
            <h2 className="text-xl font-bold text-white">AI Tutor</h2>
          </div>
          <button onClick={onClose} className="text-slate-500 hover:text-white transition-colors text-3xl leading-none">&times;</button>
        </header>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg, index) => (
            <div key={index} className={`flex items-start gap-3 ${msg.role === 'user' ? 'justify-end' : ''}`}>
              {msg.role === 'model' && <div className="w-8 h-8 rounded-full bg-violet-500/50 flex items-center justify-center flex-shrink-0 mt-1"><AiIcon className="w-5 h-5 text-violet-300"/></div>}
              <div className={`max-w-md lg:max-w-lg p-3 rounded-lg ${msg.role === 'user' ? 'bg-teal-600 text-white' : 'bg-slate-700 text-slate-200'}`}>
                <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
              </div>
            </div>
          ))}
          {isLoading && (
             <div className="flex items-start gap-3">
               <div className="w-8 h-8 rounded-full bg-violet-500/50 flex items-center justify-center flex-shrink-0 mt-1"><AiIcon className="w-5 h-5 text-violet-300"/></div>
                <div className="max-w-md lg:max-w-lg p-3 rounded-lg bg-slate-700 text-slate-200">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
                    </div>
                </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <footer className="p-4 border-t border-slate-700 flex-shrink-0">
          <form onSubmit={handleSubmit} className="flex items-center gap-3">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Ask a question about the lesson..."
              className="w-full flex-1 px-4 py-2 bg-slate-900 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500 transition duration-300"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={!userInput.trim() || isLoading}
              className="bg-violet-600 text-white p-2.5 rounded-lg hover:bg-violet-700 disabled:bg-slate-600 disabled:cursor-not-allowed transition-colors"
              aria-label="Send message"
            >
              <SendIcon className="w-5 h-5" />
            </button>
          </form>
        </footer>
      </div>
    </div>
  );
};

export default AiTutorModal;
