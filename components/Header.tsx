import React from 'react';
import type { User } from '../types';
import { LogoutIcon } from './icons/LogoutIcon';
import { UserIcon } from './icons/UserIcon';
import { StarIcon } from './icons/StarIcon';
import { MenuIcon } from './icons/MenuIcon';

interface HeaderProps {
  user: User;
  onLogout: () => void;
  points: number;
  onOpenProfile: () => void;
  onToggleSidebar?: () => void;
  isCourseViewActive?: boolean;
}

const Header: React.FC<HeaderProps> = ({ user, onLogout, points, onOpenProfile, onToggleSidebar, isCourseViewActive }) => {
  return (
    <header className="bg-slate-800/50 backdrop-blur-sm border-b border-slate-700 p-3 sm:p-4 flex justify-between items-center flex-shrink-0 z-10">
      <div className="flex items-center gap-2 md:gap-4">
        {isCourseViewActive && onToggleSidebar && (
           <button onClick={onToggleSidebar} className="md:hidden text-slate-400 hover:text-white p-2 -ml-2">
              <MenuIcon className="w-6 h-6" />
           </button>
        )}
        <h1 className="text-lg md:text-xl font-bold text-white hidden sm:block">{`Welcome, ${user.name}!`}</h1>
      </div>
      <div className="flex items-center gap-2 sm:gap-4">
        <div className="flex items-center gap-2 bg-slate-700/50 text-amber-400 font-bold py-2 px-3 sm:px-4 rounded-lg">
          <StarIcon className="w-5 h-5" />
          <span className="text-sm sm:text-base">{points}</span>
          <span className="hidden sm:inline">Points</span>
        </div>
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