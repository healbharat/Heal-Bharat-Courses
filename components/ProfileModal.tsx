import React from 'react';
import type { User, Course } from '../types';
import { courses } from '../data/courses';
import { UserIcon } from './icons/UserIcon';
import { CertificateIcon } from './icons/CertificateIcon';
import { LockIcon } from './icons/LockIcon';
import { WebDevBadge } from './icons/badges/WebDevBadge';
import { PythonBadge } from './icons/badges/PythonBadge';
import { AiBadge } from './icons/badges/AiBadge';
import { SecurityBadge } from './icons/badges/SecurityBadge';
import { DataBadge } from './icons/badges/DataBadge';
import { StarIcon } from './icons/StarIcon';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User;
  progressData: Record<string, Set<number>>;
  points: number;
  onViewCertificate: (course: Course) => void;
}

const badgeMap: Record<string, React.FC<React.SVGProps<SVGSVGElement>>> = {
  WebDevBadge,
  PythonBadge,
  AiBadge,
  SecurityBadge,
  DataBadge,
};

const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose, user, progressData, points, onViewCertificate }) => {
  if (!isOpen) return null;

  const completedCourses = courses.filter(course => {
    const completedDays = progressData[course.id]?.size || 0;
    const totalDays = course.structure.length;
    return completedDays === totalDays && totalDays > 0;
  });

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
            <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700 mb-6">
              {completedCourses.length > 0 ? (
                <div className="flex flex-wrap justify-center gap-4">
                  {completedCourses.map(course => {
                    const BadgeComponent = badgeMap[course.badge];
                    return BadgeComponent ? (
                      <div key={course.id} className="group relative">
                        <BadgeComponent className="w-16 h-16" />
                        <div className="absolute bottom-full mb-2 w-max left-1/2 -translate-x-1/2 bg-slate-900 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                          {course.title}
                        </div>
                      </div>
                    ) : null;
                  })}
                </div>
              ) : (
                <p className="text-slate-500 text-center text-sm py-4">Complete a course to earn your first badge!</p>
              )}
            </div>
            
            <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">My Courses & Certificates</h2>
            <div className="space-y-4">
                {courses.map(course => {
                    const completedDays = progressData[course.id]?.size || 0;
                    const totalDays = course.structure.length;
                    const isComplete = completedDays === totalDays;

                    return (
                        <div key={course.id} className="bg-slate-900/50 p-4 rounded-lg border border-slate-700">
                            <h3 className="font-bold text-white">{course.title}</h3>
                            <p className="text-xs text-slate-400 mt-2">{completedDays} / {totalDays} days complete</p>
                            {isComplete ? (
                                <div className="mt-3 flex items-center gap-2 text-green-400 text-sm">
                                    <CertificateIcon className="w-5 h-5"/>
                                    <span>Course Complete!</span>
                                </div>
                            ) : (
                                <div className="mt-3 flex items-center gap-2 text-slate-500 text-sm">
                                    <LockIcon className="w-5 h-5"/>
                                    <span>In Progress</span>
                                </div>
                            )}

                             <button 
                                onClick={() => onViewCertificate(course)}
                                disabled={!isComplete}
                                className="w-full mt-3 text-sm bg-teal-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-teal-700 transition duration-300 disabled:bg-slate-600 disabled:text-slate-500 disabled:cursor-not-allowed"
                            >
                                View Certificate
                            </button>
                        </div>
                    )
                })}
            </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;