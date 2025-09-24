
import React from 'react';
import type { User } from '../types';
import { LogoutIcon } from './icons/LogoutIcon';
import { UserIcon } from './icons/UserIcon';
import { StarIcon } from './icons/StarIcon';
import { MenuIcon } from './icons/MenuIcon';

interface HeaderProps {
  user: User;
  onLogout: () => void;
  progress: number;
  totalDays: number;
  points: number;
  onOpenProfile: () => void;
  onBackToCourses?: () => void;
  courseTitle?: string;
  onToggleSidebar?: () => void;
  activeCourseId?: string | null;
}

const Header: React.FC<HeaderProps> = ({ user, onLogout, progress, totalDays, points, onOpenProfile, onBackToCourses, courseTitle, onToggleSidebar, activeCourseId }) => {
  const progressPercentage = totalDays > 0 ? (progress / totalDays) * 100 : 0;

  return (
    <header className="bg-slate-800/50 backdrop-blur-sm border-b border-slate-700 p-3 sm:p-4 flex justify-between items-center flex-shrink-0">
      <div className="flex items-center gap-2 md:gap-4">
        {activeCourseId && onToggleSidebar && (
           <button onClick={onToggleSidebar} className="md:hidden text-slate-400 hover:text-white p-2 -ml-2">
              <MenuIcon className="w-6 h-6" />
           </button>
        )}
        {onBackToCourses && (
          <button onClick={onBackToCourses} className="text-slate-400 hover:text-white transition-colors p-2 rounded-full bg-slate-700/50 hover:bg-slate-700">
             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5"/><path d="m12 19-7-7 7-7"/></svg>
          </button>
        )}
        <div>
            <h1 className="text-lg md:text-xl font-bold text-white">{courseTitle ? courseTitle : `Welcome, ${user.name}!`}</h1>
            {courseTitle && (
            <div className="w-40 sm:w-64 mt-2">
                <div className="bg-slate-700 rounded-full h-2.5">
                    <div 
                        className="bg-teal-500 h-2.5 rounded-full transition-all duration-500" 
                        style={{ width: `${progressPercentage}%` }}
                    ></div>
                </div>
                <p className="text-xs text-slate-400 mt-1 hidden sm:block">{Math.round(progressPercentage)}% Complete ({progress}/{totalDays} days)</p>
            </div>
            )}
        </div>
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
