
import React from 'react';
import type { Course } from '../types';
import { CodeIcon } from './icons/CodeIcon';
import { CheckCircleIcon } from './icons/CheckCircleIcon';
import { QuizIcon } from './icons/QuizIcon';

interface SidebarProps {
  course: Course;
  selectedDay: number;
  onDaySelect: (day: number) => void;
  completedDays: Set<number>;
  onStartQuiz: () => void;
  isCourseComplete: boolean;
  onCompleteAll: () => void;
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ course, selectedDay, onDaySelect, completedDays, onStartQuiz, isCourseComplete, onCompleteAll, isOpen, onClose }) => {
  const modules = [...new Set(course.structure.map(day => day.module))];

  return (
    <aside className={`w-72 bg-slate-800 p-4 flex-shrink-0 flex flex-col border-r border-slate-700 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 fixed inset-y-0 left-0 z-50 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
      <div className="flex items-center justify-between gap-2 mb-6 px-2">
        <div className="flex items-center gap-2">
            <CodeIcon className="w-8 h-8 text-teal-400" />
            <h1 className="text-xl font-bold text-white">Course Outline</h1>
        </div>
        <button onClick={onClose} className="md:hidden text-slate-400 hover:text-white p-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
      </div>

      {!isCourseComplete && (
        <div className="mb-4 px-2">
          <button
            onClick={onCompleteAll}
            className="w-full bg-slate-700 text-slate-300 font-semibold py-2 px-4 rounded-lg hover:bg-slate-600 transition duration-300 text-sm"
          >
            Complete Course (Dev)
          </button>
        </div>
      )}

      <nav className="flex-1 overflow-y-auto">
        {modules.map(moduleName => (
          <div key={moduleName} className="mb-4">
            <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-2 px-2">{moduleName}</h2>
            <ul>
              {course.structure
                .filter(day => day.module === moduleName)
                .map(day => (
                  <li key={day.day}>
                    <button
                      onClick={() => onDaySelect(day.day)}
                      className={`w-full text-left flex items-center justify-between p-2 rounded-md transition-colors duration-200 ${
                        selectedDay === day.day
                          ? 'bg-teal-500/20 text-teal-300'
                          : 'text-slate-300 hover:bg-slate-700'
                      }`}
                    >
                      <span className="flex-1 text-sm">Day {day.day}: {day.topic}</span>
                      {completedDays.has(day.day) && <CheckCircleIcon className="w-5 h-5 text-green-400 ml-2 flex-shrink-0" />}
                    </button>
                  </li>
                ))}
            </ul>
          </div>
        ))}
      </nav>
      {isCourseComplete && (
        <div className="mt-auto pt-4 border-t border-slate-700">
            <button 
                onClick={onStartQuiz}
                className={`w-full flex items-center justify-center gap-2 font-bold py-3 px-4 rounded-lg transition duration-300 bg-indigo-600 text-white hover:bg-indigo-700`}
            >
                <QuizIcon className="w-5 h-5"/>
                Take Final Quiz
            </button>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
