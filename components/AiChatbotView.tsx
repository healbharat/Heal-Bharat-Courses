import React, { useState, useRef, useEffect, useCallback } from 'react';
import { BotIcon } from './icons/BotIcon';
import type { ChatMessage } from '../types';
import { getChatbotResponse } from '../services/geminiService';
import Spinner from './Spinner';

// Prism is loaded globally, declare it for TypeScript
declare global {
  interface Window {
    Prism: {
      highlightElement: (element: Element) => void;
    };
  }
}

// A component to render the message content, handling code blocks
const MessageContent: React.FC<{ text: string }> = ({ text }) => {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      const codeElements = contentRef.current.querySelectorAll('pre code');
      codeElements.forEach(el => {
        if (window.Prism) {
          window.Prism.highlightElement(el);
        }
      });
    }
  }, [text]);

  // Convert markdown elements to HTML
  const createMarkup = () => {
    const html = text
      // Convert code blocks ```lang\ncode``` to <pre><code class="language-lang">
      .replace(/```(\w+)?\n([\s\S]*?)```/g, (match, lang, code) => {
        const language = lang || 'javascript';
        const escapedCode = code.replace(/</g, '&lt;').replace(/>/g, '&gt;');
        return `<pre><code class="language-${language}">${escapedCode.trim()}</code></pre>`;
      })
      // Convert inline code `code`
      .replace(/`([^`]+)`/g, '<code class="inline-code">$1</code>')
      // Convert bold **text**
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    return { __html: html.replace(/\n/g, '<br />') };
  };

  return <div ref={contentRef} dangerouslySetInnerHTML={createMarkup()} />;
};


const AiChatbotView: React.FC = () => {
    const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
    const [userInput, setUserInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
  
    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };
  
    useEffect(scrollToBottom, [chatHistory]);

    const handleSendMessage = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();
        if (!userInput.trim() || isLoading) return;
    
        const newUserMessage: ChatMessage = { sender: 'user', text: userInput };
        const updatedHistory = [...chatHistory, newUserMessage];
        
        setChatHistory(updatedHistory);
        setUserInput('');
        setIsLoading(true);
    
        try {
          const aiResponseText = await getChatbotResponse(updatedHistory);
          const newAiMessage: ChatMessage = { sender: 'ai', text: aiResponseText };
          setChatHistory(prev => [...prev, newAiMessage]);
        } catch (error) {
          console.error("Failed to get AI response:", error);
          const errorMessage: ChatMessage = { sender: 'ai', text: 'Sorry, I ran into an error. Please try again.' };
          setChatHistory(prev => [...prev, errorMessage]);
        } finally {
          setIsLoading(false);
        }
      }, [userInput, isLoading, chatHistory]);

    return (
        <div className="animate-fade-in flex flex-col h-full">
            <header className="mb-8">
                <div className="flex items-center gap-3">
                <BotIcon className="w-8 h-8 text-teal-400" />
                <h1 className="text-4xl font-extrabold text-white">Tronex AI Assistant</h1>
                </div>
                <p className="text-slate-400 mt-2 text-lg">Your personal AI-powered coding assistant. Ask me anything!</p>
            </header>

            <div className="flex-1 flex flex-col bg-slate-800/50 border border-slate-700 rounded-xl overflow-hidden">
                <div className="flex-1 p-6 space-y-6 overflow-y-auto">
                    {chatHistory.length === 0 && (
                        <div className="text-center text-slate-400 h-full flex flex-col justify-center items-center">
                            <BotIcon className="w-16 h-16 mb-4 text-slate-600" />
                            <h2 className="text-xl font-semibold text-slate-300">Welcome to Tronex AI</h2>
                            <p>Ask a coding question to get started.</p>
                        </div>
                    )}
                    {chatHistory.map((msg, index) => (
                        <div key={index} className={`flex gap-4 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                            {msg.sender === 'ai' && <div className="w-8 h-8 bg-teal-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1"><BotIcon className="w-5 h-5 text-teal-400" /></div>}
                            <div className={`max-w-xl p-4 rounded-xl prose prose-invert prose-p:my-0 prose-pre:my-2 prose-pre:bg-slate-900/70 ${msg.sender === 'user' ? 'bg-indigo-600 text-white' : 'bg-slate-700/50'}`}>
                                <MessageContent text={msg.text} />
                            </div>
                        </div>
                    ))}
                     {isLoading && (
                        <div className="flex gap-4 justify-start">
                             <div className="w-8 h-8 bg-teal-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1"><BotIcon className="w-5 h-5 text-teal-400" /></div>
                             <div className="max-w-xl p-4 rounded-xl bg-slate-700/50 flex items-center">
                                <Spinner />
                             </div>
                        </div>
                     )}
                    <div ref={messagesEndRef} />
                </div>
                
                <div className="p-4 bg-slate-800 border-t border-slate-700">
                    <form onSubmit={handleSendMessage} className="flex items-center gap-4">
                        <input 
                            type="text"
                            value={userInput}
                            onChange={(e) => setUserInput(e.target.value)}
                            placeholder="Ask Tronex AI about code, concepts, or problems..."
                            className="flex-1 bg-slate-900 border border-slate-600 rounded-lg py-3 px-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
                            disabled={isLoading}
                        />
                        <button type="submit" disabled={isLoading || !userInput.trim()} className="bg-teal-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-teal-600 disabled:bg-slate-700 disabled:cursor-not-allowed transition duration-300">
                            Send
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AiChatbotView;