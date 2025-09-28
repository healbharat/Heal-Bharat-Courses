import React from 'react';
import type { User } from '../types';
import { LogoutIcon } from './icons/LogoutIcon';
import { UserIcon } from './icons/UserIcon';
import { StarIcon } from './icons/StarIcon';
import { MenuIcon } from './icons/MenuIcon';
import { FullScreenIcon } from './icons/FullScreenIcon';
import { ExitFullScreenIcon } from './icons/ExitFullScreenIcon';

interface HeaderProps {
  user: User;
  onLogout: () => void;
  points: number;
  onOpenProfile: () => void;
  isFullScreen: boolean;
  onToggleFullScreen: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, onLogout, points, onOpenProfile, isFullScreen, onToggleFullScreen }) => {
  return (
    <header className="bg-slate-800/50 backdrop-blur-sm border-b border-slate-700 p-3 sm:p-4 flex justify-between items-center flex-shrink-0 z-10">
      <div className="flex items-center gap-2 md:gap-4">
        {/* Placeholder for potential mobile sidebar toggle in the future */}
        <h1 className="text-lg md:text-xl font-bold text-white hidden sm:block">{`Welcome, ${user.name}!`}</h1>
      </div>
      <div className="flex items-center gap-2 sm:gap-4">
        <div className="flex items-center gap-2 bg-slate-700/50 text-amber-400 font-bold py-2 px-3 sm:px-4 rounded-lg">
          <StarIcon className="w-5 h-5" />
          <span className="text-sm sm:text-base">{points}</span>
          <span className="hidden sm:inline">Points</span>
        </div>
        <button
            onClick={onToggleFullScreen}
            className="flex items-center gap-2 bg-slate-700 text-slate-300 font-semibold py-2 px-3 sm:px-4 rounded-lg hover:bg-slate-600 transition duration-300"
            title={isFullScreen ? 'Exit Full Screen' : 'Enter Full Screen'}
          >
          {isFullScreen ? <ExitFullScreenIcon className="w-5 h-5" /> : <FullScreenIcon className="w-5 h-5" />}
          <span className="hidden sm:inline">{isFullScreen ? 'Exit Full' : 'Full Screen'}</span>
        </button>
        <button
            onClick={onOpenProfile}
            className="flex items-center gap-2 bg-slate-700 text-slate-300 font-semibold py-2 px-3 sm:px-4 rounded-lg hover:bg-slate-600 transition duration-300"
          >
          <UserIcon className="w-5 h-5" />
          <span className="hidden sm:inline">Profile</span>
        </button>
        <button
          onClick={onLogout}
          className="flex items-center gap-2 bg-slate-700 text-slate-300 font-semibold py-2 px-3 sm:px-4 rounded-lg hover:bg-slate-600 transition duration-300"
        >
          <LogoutIcon className="w-5 h-5" />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </header>
  );
};

export default Header;