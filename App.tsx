import React, { useState, useCallback, useEffect } from 'react';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import PremiumPlanView from './components/PremiumPlanView';
import type { User } from './types';
import ScreenshotBlocker from './components/ScreenshotBlocker';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isBlocking, setIsBlocking] = useState(false);

  useEffect(() => {
    // Check for a logged-in user in localStorage on initial load
    const storedUser = localStorage.getItem('ai-course-user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        // Sync with the "database" of users
        const users = JSON.parse(localStorage.getItem('ai-course-users') || '{}');
        if (users[parsedUser.email]) {
          setUser(users[parsedUser.email]);
        } else {
           // User not found in DB, clear session
           handleLogout();
        }
      } catch (e) {
        console.error("Failed to parse user from localStorage", e);
        handleLogout();
      }
    }
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
        // This is a best-effort approach. Many screenshot tools use different keys.
        if (e.key === 'PrintScreen') {
            e.preventDefault();
            setIsBlocking(true);
        }
    };
    
    const handleCopy = (e: ClipboardEvent) => {
        e.preventDefault();
        setIsBlocking(true);
    };

    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('copy', handleCopy);

    return () => {
        window.removeEventListener('keydown', handleKeyDown);
        document.removeEventListener('copy', handleCopy);
    };
  }, []);

  const handleLogin = useCallback((loggedInUser: User) => {
    setUser(loggedInUser);
    localStorage.setItem('ai-course-user', JSON.stringify(loggedInUser));
  }, []);

  const handleLogout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('ai-course-user');
    // We keep course progress tied to the browser, but for a real app it would be tied to the user account
  }, []);

  const handleSubscribe = useCallback(() => {
    if (user) {
      const updatedUser = { ...user, isPremium: true };
      setUser(updatedUser);
      localStorage.setItem('ai-course-user', JSON.stringify(updatedUser));
      
      // Update the user "database"
      const users = JSON.parse(localStorage.getItem('ai-course-users') || '{}');
      if (users[user.email]) {
        users[user.email].isPremium = true;
        localStorage.setItem('ai-course-users', JSON.stringify(users));
      }
    }
  }, [user]);
  
  const renderContent = () => {
    if (!user) {
      return <Login onLogin={handleLogin} />;
    }
    if (!user.isPremium) {
      return <PremiumPlanView onSubscribe={handleSubscribe} user={user} />;
    }
    return <Dashboard user={user} onLogout={handleLogout} />;
  };

  return (
    <div className="min-h-screen bg-slate-900 font-sans">
      {isBlocking && <ScreenshotBlocker onClose={() => setIsBlocking(false)} />}
      {renderContent()}
    </div>
  );
};

export default App;