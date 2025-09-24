
import React, { useState } from 'react';
import { CodeIcon } from './icons/CodeIcon';

interface LoginProps {
  onLogin: (username: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      onLogin(username.trim());
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 p-4">
      <div className="w-full max-w-md">
        <div className="bg-slate-800 border border-slate-700 rounded-2xl shadow-2xl p-8 text-center">
          <div className="mx-auto mb-6 bg-slate-700 w-20 h-20 rounded-full flex items-center justify-center">
             <CodeIcon className="w-12 h-12 text-teal-400" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">AI Web Dev Course</h1>
          <p className="text-slate-400 mb-8">Enter your name to begin your 30-day journey.</p>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Your Name"
              className="w-full px-4 py-3 bg-slate-900 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300"
            />
            <button
              type="submit"
              disabled={!username.trim()}
              className="w-full mt-6 bg-teal-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-teal-600 disabled:bg-slate-700 disabled:text-slate-500 disabled:cursor-not-allowed transition duration-300 transform hover:scale-105"
            >
              Start Learning
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
