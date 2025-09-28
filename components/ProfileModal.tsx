import React from 'react';
import type { User } from '../types';
import { UserIcon } from './icons/UserIcon';
import { StarIcon } from './icons/StarIcon';
import { MedalIcon } from './icons/MedalIcon';
import type { ExternalCourse } from '../data/companyCourses';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User;
  points: number;
  completedCourses: ExternalCourse[];
}

const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose, user, points, completedCourses }) => {
  if (!isOpen) return null;

  return (
    <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in"
        onClick={onClose}
        aria-modal="true"
        role="dialog"
    >
      <div 
        className="bg-slate-800 border border-slate-700 rounded-2xl shadow-2xl w-full max-w-lg p-8 relative max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors text-3xl leading-none">&times;</button>

        <div className='text-center'>
            <div className="mx-auto mb-4 bg-slate-700 w-24 h-24 rounded-full flex items-center justify-center border-4 border-slate-600">
                <UserIcon className="w-12 h-12 text-teal-400" />
            </div>
            
            <h1 className="text-3xl font-bold text-white">{user.name}</h1>
            <p className="text-slate-400 mt-1">Student Dashboard</p>
            <div className="mt-2 text-amber-400 font-bold text-lg flex items-center justify-center gap-2">
                <StarIcon className="w-5 h-5" />
                {points} Points
            </div>
        </div>

        <div className="mt-8 flex-1 overflow-y-auto pr-2">
            <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">My Badges</h2>
            <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700">
                {completedCourses.length > 0 ? (
                    <ul className="space-y-3">
                        {completedCourses.map(course => (
                            <li key={course.id} className="flex items-center gap-3 bg-slate-800 p-3 rounded-md">
                                <MedalIcon className="w-6 h-6 text-amber-400 flex-shrink-0" />
                                <span className="font-medium text-white">{course.title}</span>
                            </li>
                        ))}
                    </ul>
                ) : (
                  <p className="text-slate-400 text-center text-sm py-4">Complete courses to earn badges and showcase your skills!</p>
                )}
            </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;