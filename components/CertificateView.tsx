import React from 'react';
import type { User, Course } from '../types';
import { SealIcon } from './icons/SealIcon';

interface CertificateViewProps {
  user: User;
  course: Course;
  onBack: () => void;
}

const CertificateView: React.FC<CertificateViewProps> = ({ user, course, onBack }) => {
  const completionDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="animate-fade-in flex flex-col items-center justify-center p-4">
      <div className="bg-white text-gray-800 w-full max-w-4xl aspect-[1.414] p-8 md:p-12 rounded-lg shadow-2xl border-4 border-teal-500 relative overflow-hidden">
        <div className="absolute inset-0 border-8 border-slate-200 m-2 rounded"></div>
        <div className="relative z-10 flex flex-col h-full">

          <div className="text-center">
            <h1 className="text-2xl md:text-4xl font-serif font-bold text-slate-700 tracking-wider">
              Certificate of Completion
            </h1>
            <p className="mt-4 text-sm md:text-base text-slate-500">This certificate is proudly presented to</p>
          </div>
          
          <div className="flex-grow flex items-center justify-center">
            <h2 className="text-4xl md:text-7xl font-['Caveat',_cursive] text-teal-600 font-bold my-8 md:my-16">
              {user.name}
            </h2>
          </div>

          <div className="text-center">
            <p className="text-sm md:text-base text-slate-500">
              for successfully completing the
            </p>
            <h3 className="text-lg md:text-2xl font-semibold text-slate-800 mt-2">
              {course.title} Course
            </h3>
          </div>

          <div className="mt-auto flex justify-between items-end pt-8">
            <div className="text-left">
              <p className="text-xs md:text-sm font-semibold border-b border-slate-400 pb-1">{completionDate}</p>
              <p className="text-xs text-slate-500 mt-1">Date</p>
            </div>
            
            <div className="text-center">
                <SealIcon className="w-20 h-20 md:w-28 md:h-28 text-teal-600 mx-auto"/>
            </div>

            <div className="text-right">
              <p className="text-sm md:text-base font-bold font-serif text-teal-700 border-b border-slate-400 pb-1">Heal Bharat</p>
              <p className="text-xs text-slate-500 mt-1">Issuing Organization</p>
            </div>
          </div>
        </div>
      </div>
      <button 
        onClick={onBack}
        className="mt-8 bg-teal-500 text-white font-bold py-3 px-8 rounded-lg hover:bg-teal-600 transition duration-300"
      >
        Back to Courses
      </button>
    </div>
  );
};

export default CertificateView;