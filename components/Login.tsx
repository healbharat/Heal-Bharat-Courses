import React, { useState, useCallback } from 'react';
import { CodeIcon } from './icons/CodeIcon';
import type { User } from '../types';
import { InfoIcon } from './icons/InfoIcon';

interface LoginProps {
  onLogin: (user: User) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [isLoginView, setIsLoginView] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const toggleView = useCallback(() => {
    setIsLoginView(prev => !prev);
    setError('');
    setName('');
    setEmail('');
    setPassword('');
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password || (!isLoginView && !name)) {
      setError('All fields are required.');
      return;
    }
    
    // Simulate a user database in localStorage
    const users = JSON.parse(localStorage.getItem('ai-course-users') || '{}');

    if (isLoginView) {
      // Handle Login
      if (users[email] && users[email].password === password) {
        onLogin(users[email]);
      } else {
        setError('Invalid email or password.');
      }
    } else {
      // Handle Sign Up
      if (users[email]) {
        setError('An account with this email already exists.');
        return;
      }
      
      const newUser: User = { name, email, isPremium: false };
      const newUserRecord = { ...newUser, password }; // Store password only in the "DB"
      
      users[email] = newUserRecord;
      localStorage.setItem('ai-course-users', JSON.stringify(users));
      onLogin(newUser);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 p-4">
      <div className="w-full max-w-md">
        <div className="bg-slate-800 border border-slate-700 rounded-2xl shadow-2xl p-8 text-center">
          <div className="mx-auto mb-6 bg-slate-700 w-20 h-20 rounded-full flex items-center justify-center">
             <CodeIcon className="w-12 h-12 text-teal-400" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">AI Learning Platform</h1>
          <p className="text-slate-400 mb-6">{isLoginView ? 'Welcome back! Please log in.' : 'Create your account to begin.'}</p>
          
          <div className="bg-blue-500/10 border border-blue-500/20 text-blue-300 text-sm py-3 px-4 rounded-md mb-6 flex items-start gap-3 text-left">
            <InfoIcon className="w-5 h-5 mt-0.5 flex-shrink-0" />
            <p>
              <strong>Note:</strong> This is a demo portal. Data is saved in your browser's local storage and may be cleared. Login issues can occur.
            </p>
          </div>

          {error && <p className="bg-red-500/20 text-red-400 text-sm py-2 px-4 rounded-md mb-4">{error}</p>}
          
          <form onSubmit={handleSubmit} className="space-y-4 text-left">
            {!isLoginView && (
              <div>
                <label className="text-sm font-medium text-slate-300" htmlFor="name">Name</label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your Name"
                  className="mt-1 w-full px-4 py-3 bg-slate-900 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300"
                />
              </div>
            )}
            <div>
              <label className="text-sm font-medium text-slate-300" htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="mt-1 w-full px-4 py-3 bg-slate-900 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-300" htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="mt-1 w-full px-4 py-3 bg-slate-900 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300"
              />
            </div>
            
            <button
              type="submit"
              className="w-full mt-2 bg-teal-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-teal-600 disabled:bg-slate-700 transition duration-300 transform hover:scale-105"
            >
              {isLoginView ? 'Login' : 'Create Account'}
            </button>
          </form>
          
          <p className="text-sm text-slate-400 mt-6">
            {isLoginView ? "Don't have an account?" : "Already have an account?"}
            <button onClick={toggleView} className="font-semibold text-teal-400 hover:text-teal-300 ml-2">
              {isLoginView ? 'Sign Up' : 'Login'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;