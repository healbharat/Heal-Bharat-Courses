import React from 'react';
import type { User } from '../types';
import { StarIcon } from './icons/StarIcon';
import { View } from '../types';

interface DashboardHomeProps {
  user: User;
  points: number;
  onViewChange: (view: View) => void;
}

const DashboardHome: React.FC<DashboardHomeProps> = ({ user, points, onViewChange }) => {
  return (
    <div className="animate-fade-in space-y-8">
      <header>
        <h1 className="text-4xl font-extrabold text-white">Welcome back, {user.name}!</h1>
        <p className="text-slate-400 mt-2 text-lg">Ready to continue your journey to becoming a top developer?</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 flex items-center gap-4">
          <div className="p-3 bg-amber-500/10 rounded-full">
            <StarIcon className="w-6 h-6 text-amber-400" />
          </div>
          <div>
            <p className="text-sm text-slate-400">Your Points</p>
            <p className="text-2xl font-bold text-white">{points}</p>
          </div>
        </div>
      </div>
      
       <div>
        <h2 className="text-2xl font-bold text-white mb-4">Quick Access</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <QuickAccessCard title="Explore Courses" description="Learn new skills" onClick={() => onViewChange(View.COURSE_SELECTION)} />
            <QuickAccessCard title="Coding Practice" description="Sharpen your logic" onClick={() => onViewChange(View.CODING_PRACTICE)} />
            <QuickAccessCard title="Interview Prep" description="Ace your next interview" onClick={() => onViewChange(View.INTERVIEW_PRACTICE)} />
            <QuickAccessCard title="Internship Status" description="Check your progress" onClick={() => onViewChange(View.INTERNSHIP)} />
        </div>
      </div>
    </div>
  );
};

const QuickAccessCard: React.FC<{title: string, description: string, onClick: () => void}> = ({title, description, onClick}) => (
    <button onClick={onClick} className="w-full text-left bg-slate-800 p-6 rounded-lg border border-slate-700 hover:bg-slate-700/50 hover:border-slate-600 transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-teal-500">
        <h3 className="font-bold text-white">{title}</h3>
        <p className="text-sm text-slate-400 mt-1">{description}</p>
    </button>
);

export default DashboardHome;