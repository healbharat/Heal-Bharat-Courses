import React from 'react';
import { courses } from '../data/courses';
import type { Course } from '../types';

interface CourseSelectionViewProps {
  onSelectCourse: (courseId: string) => void;
  progress: Record<string, Set<number>>;
}

const CourseCard: React.FC<{ course: Course; onSelect: () => void; completed: number; total: number }> = ({ course, onSelect, completed, total }) => {
  const progressPercentage = total > 0 ? (completed / total) * 100 : 0;

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl shadow-lg transition-transform transform hover:-translate-y-2 flex flex-col overflow-hidden">
      <img src={course.imageUrl} alt={course.title} className="w-full h-40 object-cover" />
      <div className="p-6 flex flex-col flex-grow">
        <h2 className="text-2xl font-bold text-white mb-2">{course.title}</h2>
        <p className="text-slate-400 text-sm mb-6 flex-grow">{course.description}</p>
        <div className="mt-auto">
            <div className="mb-4">
                <div className="flex justify-between text-xs text-slate-400 mb-1">
                    <span>Progress</span>
                    <span>{completed} / {total} Days</span>
                </div>
                <div className="bg-slate-700 rounded-full h-2.5">
                    <div 
                        className="bg-teal-500 h-2.5 rounded-full transition-all duration-500" 
                        style={{ width: `${progressPercentage}%` }}
                    ></div>
                </div>
            </div>
            <button
            onClick={onSelect}
            className="w-full bg-teal-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-teal-700 transition duration-300"
            >
            {completed > 0 && completed < total ? 'Continue Course' : (completed === total ? 'Review Course' : 'Start Course')}
            </button>
        </div>
      </div>
    </div>
  );
};

const CourseSelectionView: React.FC<CourseSelectionViewProps> = ({ onSelectCourse, progress }) => {
  return (
    <div className="animate-fade-in">
      <header className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-white">Choose Your Learning Path</h1>
        <p className="text-slate-400 mt-2 max-w-2xl mx-auto">Select a course to start your journey. Your progress is saved automatically.</p>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {courses.map(course => (
          <CourseCard
            key={course.id}
            course={course}
            onSelect={() => onSelectCourse(course.id)}
            completed={progress[course.id]?.size || 0}
            total={course.structure.length}
          />
        ))}
      </div>
    </div>
  );
};

export default CourseSelectionView;
