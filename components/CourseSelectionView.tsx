import React, { useState } from 'react';
import { allCompanyCourses } from '../data/companyCourses';
import type { ExternalCourse } from '../data/companyCourses';
import { LanguageIcon } from './icons/LanguageIcon';
import { ClockIcon } from './icons/ClockIcon';
import { UserIcon } from './icons/UserIcon';
import { CheckCircleIcon } from './icons/CheckCircleIcon';
import { StarIcon } from './icons/StarIcon';
import { SearchIcon } from './icons/SearchIcon';
import { MagicWandIcon } from './icons/MagicWandIcon';
import { NotesIcon } from './icons/NotesIcon';
import Spinner from './Spinner';

const ExternalCourseCard: React.FC<{ 
    course: ExternalCourse; 
    isCompleted: boolean; 
    onComplete: () => void; 
    onGenerateChallenge: () => void; 
    isGeneratingChallenge: boolean; 
    onGenerateNotes: () => void;
    isGeneratingNotes: boolean;
}> = ({ 
    course, 
    isCompleted, 
    onComplete, 
    onGenerateChallenge, 
    isGeneratingChallenge,
    onGenerateNotes,
    isGeneratingNotes,
 }) => {
  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl shadow-lg flex flex-col sm:flex-row items-start p-6 gap-6">
      <img src={course.imageUrl} alt={course.title} className="w-full sm:w-48 h-auto object-cover rounded-md" />
      <div className="flex-1">
        <a href={course.url} target="_blank" rel="noopener noreferrer" className="group">
          <h3 className="text-xl font-bold text-white mb-3 group-hover:text-teal-400 transition-colors">{course.title}</h3>
        </a>
        
        <div className="space-y-2 text-sm text-slate-400 mb-4">
            <div className="flex items-start gap-2">
                <LanguageIcon className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span><strong className="text-slate-300 font-medium">Languages:</strong> {course.languages.join(', ')}</span>
            </div>
            <div className="flex items-center gap-2">
                <UserIcon className="w-4 h-4 flex-shrink-0" />
                <span><strong className="text-slate-300 font-medium">Eligibility:</strong> {course.eligibility}</span>
            </div>
             <div className="flex items-center gap-2">
                <ClockIcon className="w-4 h-4 flex-shrink-0" />
                <span><strong className="text-slate-300 font-medium">Duration:</strong> {course.duration}</span>
            </div>
        </div>

        <p className="text-slate-300 text-sm mb-6">{course.description}</p>
        
        <div className="border-t border-slate-700 pt-4 flex flex-col sm:flex-row flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3 flex-wrap">
                 <button
                    onClick={onGenerateChallenge}
                    disabled={isGeneratingChallenge}
                    className="inline-flex items-center gap-2 bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-indigo-700 transition duration-300 disabled:bg-slate-700 disabled:cursor-wait"
                >
                    {isGeneratingChallenge ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : <MagicWandIcon className="w-5 h-5" />}
                    Generate AI Challenge
                </button>
                <button
                    onClick={onGenerateNotes}
                    disabled={isGeneratingNotes}
                    className="inline-flex items-center gap-2 bg-teal-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-teal-700 transition duration-300 disabled:bg-slate-700 disabled:cursor-wait"
                >
                    {isGeneratingNotes ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : <NotesIcon className="w-5 h-5" />}
                    Get AI Notes
                </button>
            </div>
            <div className="flex items-center gap-3">
                {isCompleted ? (
                    <button
                        disabled
                        className="inline-flex items-center gap-2 bg-slate-700 text-slate-400 font-semibold py-2 px-4 rounded-lg cursor-not-allowed"
                    >
                        <CheckCircleIcon className="w-5 h-5" />
                        Completed
                    </button>
                ) : (
                    <button
                        onClick={onComplete}
                        className="inline-flex items-center gap-2 bg-slate-600/50 border border-slate-600 text-slate-300 font-semibold py-2 px-4 rounded-lg hover:bg-slate-600 transition duration-300"
                    >
                         <CheckCircleIcon className="w-5 h-5" />
                        Mark complete
                    </button>
                )}
            </div>
        </div>
      </div>
    </div>
  );
};


interface CourseSelectionViewProps {
  completedCourses: Set<string>;
  onCompleteCourse: (courseId: string) => void;
  onGenerateChallenge: (course: ExternalCourse) => void;
  isGeneratingChallenge: boolean;
  onGenerateNotes: (course: ExternalCourse) => void;
  isGeneratingNotes: boolean;
  selectedCourseForNotes: ExternalCourse | null;
}

const CourseSelectionView: React.FC<CourseSelectionViewProps> = ({ 
    completedCourses, onCompleteCourse, onGenerateChallenge, isGeneratingChallenge,
    onGenerateNotes, isGeneratingNotes, selectedCourseForNotes 
}) => {
  const [activeTab, setActiveTab] = useState(allCompanyCourses[0]?.id || '');
  const [searchTerm, setSearchTerm] = useState('');

  const activeCompany = allCompanyCourses.find(c => c.id === activeTab);
  
  const filteredCourses = activeCompany
    ? activeCompany.courses.filter(course => 
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  return (
    <div className="animate-fade-in">
      <header className="mb-10">
        <h1 className="text-4xl font-extrabold text-white">Company-Wise Courses</h1>
        <p className="text-slate-400 mt-2 max-w-2xl">Explore curated learning paths from our industry partners, and generate custom AI coding challenges to test your skills.</p>
      </header>
      
      <div className="flex border-b border-slate-700 mb-6">
        {allCompanyCourses.map(company => (
          <button
            key={company.id}
            onClick={() => {
                setActiveTab(company.id);
                setSearchTerm(''); // Reset search on tab change
            }}
            className={`px-4 py-3 font-semibold text-sm transition-colors ${
              activeTab === company.id
                ? 'border-b-2 border-teal-400 text-white'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {company.name}
          </button>
        ))}
      </div>

      <div className="relative mb-8">
        <label htmlFor="course-search" className="sr-only">Search Courses</label>
        <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 pointer-events-none" />
        <input
          id="course-search"
          type="text"
          placeholder={`Search in ${activeCompany?.name} courses...`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-11 pr-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
      </div>

      <section>
        {filteredCourses.length > 0 ? (
          <div className="space-y-6">
            {filteredCourses.map((course) => (
              <ExternalCourseCard 
                key={course.id} 
                course={course} 
                isCompleted={completedCourses.has(course.id)}
                onComplete={() => onCompleteCourse(course.id)}
                onGenerateChallenge={() => onGenerateChallenge(course)}
                isGeneratingChallenge={isGeneratingChallenge}
                onGenerateNotes={() => onGenerateNotes(course)}
                isGeneratingNotes={isGeneratingNotes && selectedCourseForNotes?.id === course.id}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-slate-800/50 rounded-lg border border-slate-700">
            <h3 className="text-xl font-semibold text-white">No Courses Found</h3>
            <p className="text-slate-400 mt-2">Try adjusting your search term.</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default CourseSelectionView;