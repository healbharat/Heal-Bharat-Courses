import React, { useState, useCallback, useEffect } from 'react';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import type { User } from './types';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check for a logged-in user in localStorage on initial load
    const storedUser = localStorage.getItem('ai-course-user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Failed to parse user from localStorage", e);
        localStorage.removeItem('ai-course-user');
      }
    }
  }, []);

  const handleLogin = useCallback((username: string) => {
    const newUser = { name: username };
    setUser(newUser);
    localStorage.setItem('ai-course-user', JSON.stringify(newUser));
  }, []);

  const handleLogout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('ai-course-user');
    localStorage.removeItem('course-progress');
    localStorage.removeItem('user-points');
    localStorage.removeItem('passed-quizzes');
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 font-sans">
      {user ? (
        <Dashboard user={user} onLogout={handleLogout} />
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
};

export default App;