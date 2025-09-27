import React from 'react';
import { courses } from '../data/courses';
import type { User } from '../types';
import { StarIcon } from './icons/StarIcon';
import { CheckCircleIcon } from './icons/CheckCircleIcon';

interface DashboardHomeProps {
  user: User;
  progressData: Record<string, Set<number>>;
  points: number;
}

const DashboardHome: React.FC<DashboardHomeProps> = ({ user, progressData, points }) => {
  const totalCourses = courses.length;
  const completedCourses = courses.filter(course => {
    const completedDays = progressData[course.id]?.size || 0;
    const totalDays = course.structure.length;
    return totalDays > 0 && completedDays === totalDays;
  }).length;

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
        <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 flex items-center gap-4">
           <div className="p-3 bg-green-500/10 rounded-full">
            <CheckCircleIcon className="w-6 h-6 text-green-400" />
          </div>
          <div>
            <p className="text-sm text-slate-400">Courses Completed</p>
            <p className="text-2xl font-bold text-white">{completedCourses} / {totalCourses}</p>
          </div>
        </div>
      </div>
      
       <div>
        <h2 className="text-2xl font-bold text-white mb-4">Quick Access</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <QuickAccessCard title="Explore Courses" description="Learn new skills" />
            <QuickAccessCard title="Coding Practice" description="Sharpen your logic" />
            <QuickAccessCard title="Interview Prep" description="Ace your next interview" />
            <QuickAccessCard title="Internship Status" description="Check your progress" />
        </div>
      </div>
    </div>
  );
};

const QuickAccessCard: React.FC<{title: string, description: string}> = ({title, description}) => (
    <div className="bg-slate-800 p-6 rounded-lg border border-slate-700 hover:bg-slate-700/50 hover:border-slate-600 transition-all cursor-pointer">
        <h3 className="font-bold text-white">{title}</h3>
        <p className="text-sm text-slate-400 mt-1">{description}</p>
    </div>
);

export default DashboardHome;