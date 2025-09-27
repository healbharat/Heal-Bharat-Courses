import React from 'react';
import { courses } from '../data/courses';
import { BriefcaseIcon } from './icons/BriefcaseIcon';
import { LockIcon } from './icons/LockIcon';

interface InternshipViewProps {
  progressData: Record<string, Set<number>>;
}

const InternshipView: React.FC<InternshipViewProps> = ({ progressData }) => {
  const completedCoursesCount = courses.filter(course => {
    const completedDays = progressData[course.id]?.size || 0;
    const totalDays = course.structure.length;
    return totalDays > 0 && completedDays === totalDays;
  }).length;

  const allCoursesCompleted = completedCoursesCount === courses.length;

  return (
    <div className="animate-fade-in">
      <header className="mb-8">
        <div className="flex items-center gap-3">
          <BriefcaseIcon className="w-8 h-8 text-green-400" />
          <h1 className="text-4xl font-extrabold text-white">Internship Portal</h1>
        </div>
        <p className="text-slate-400 mt-2 text-lg">Your journey to a real-world project starts here.</p>
      </header>
      
      {allCoursesCompleted ? (
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-8 text-center">
            <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mb-4 mx-auto">
              <BriefcaseIcon className="w-10 h-10 text-green-300" />
            </div>
            <h2 className="text-3xl font-bold text-white">Congratulations! You've Unlocked Your Internship!</h2>
            <p className="text-slate-300 mt-4 max-w-2xl mx-auto">You have successfully completed all the required courses. To proceed with your internship placement and receive your real-time project assignment, please complete the application form.</p>

            <div className="mt-8">
                <a 
                    href="https://forms.gle/Druvya4VmWhCcJot8"
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-block bg-teal-500 text-white font-bold py-4 px-10 rounded-lg hover:bg-teal-600 transition duration-300 transform hover:scale-105 text-lg"
                >
                    Fill Internship Application Form
                </a>
                <p className="mt-4 text-sm text-slate-400">You will be redirected to a Google Form to provide your details.</p>
            </div>
        </div>
      ) : (
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-8 text-center">
            <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mb-4 mx-auto">
              <LockIcon className="w-10 h-10 text-red-300" />
            </div>
            <h2 className="text-3xl font-bold text-white">Internship is Locked</h2>
            <p className="text-slate-300 mt-2 max-w-2xl mx-auto">Complete all the courses to unlock your guaranteed internship on a real-time project.</p>

            <div className="mt-8">
                <p className="text-lg text-slate-200">Your Progress:</p>
                <p className="text-5xl font-bold text-white my-2">{completedCoursesCount} / {courses.length}</p>
                <p className="text-slate-400">Courses Completed</p>
                <div className="w-full max-w-md bg-slate-700 rounded-full h-4 mx-auto mt-4">
                    <div 
                        className="bg-green-500 h-4 rounded-full transition-all duration-500" 
                        style={{ width: `${(completedCoursesCount / courses.length) * 100}%` }}
                    ></div>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default InternshipView;