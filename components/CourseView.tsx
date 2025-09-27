import React, { useState } from 'react';
import type { CourseDay, Course } from '../types';
import { NotesIcon } from './icons/NotesIcon';
import { ChallengeIcon } from './icons/ChallengeIcon';
import { DownloadIcon } from './icons/DownloadIcon';
import { AiIcon } from './icons/AiIcon';
import AiTutorModal from './AiTutorModal';
import { QuizIcon } from './icons/QuizIcon';
import PracticeQuizModal from './PracticeQuizModal';
import CodeEditor from './CodeEditor';
import { VideoIcon } from './icons/VideoIcon';
import { DeployIcon } from './icons/DeployIcon';
import VercelDeployModal from './VercelDeployModal';
import ContentRenderer from './ContentRenderer';

interface CourseViewProps {
  day: CourseDay;
  course: Course;
  onComplete: (courseId: string, day: number) => void;
  completedDays: Set<number>;
}

const CourseView: React.FC<CourseViewProps> = ({ day, course, onComplete, completedDays }) => {
  const [isTutorOpen, setIsTutorOpen] = useState(false);
  const [isPracticeQuizOpen, setIsPracticeQuizOpen] = useState(false);
  const [isDeployModalOpen, setIsDeployModalOpen] = useState(false);
  const [showPointsNotification, setShowPointsNotification] = useState(false);

  const handleDownloadNotes = () => {
    // A simplified version of notes for download (without interactive components)
    const downloadableNotes = day.notes.replace(/\[FLIPCARD.*?\]/g, '');
    const blob = new Blob([downloadableNotes], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${course.title.replace(/\s+/g, '_')}_Day_${day.day}_Notes.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  
  const handleCompletionClick = () => {
    if (!completedDays.has(day.day)) {
        setShowPointsNotification(true);
        setTimeout(() => {
            setShowPointsNotification(false);
        }, 2500);
    }
    onComplete(course.id, day.day);
  };
  
  return (
    <>
      <div className="space-y-8 animate-fade-in">
        <header>
          <p className="text-sm font-semibold text-teal-400">{day.module} - DAY {day.day}</p>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white mt-1">{day.topic}</h1>
        </header>
        
        {/* Optional Video Lesson */}
        {day.videoUrl && (
          <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
            <h2 className="text-2xl font-bold flex items-center gap-3 mb-4">
              <VideoIcon className="w-7 h-7 text-teal-400" />
              Video Lesson
            </h2>
            <div className="relative pt-[56.25%] rounded-lg overflow-hidden border border-slate-700"> {/* 16:9 Aspect Ratio */}
              <iframe
                src={day.videoUrl}
                title={`Video for ${day.topic}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute top-0 left-0 w-full h-full"
              ></iframe>
            </div>
          </div>
        )}

        {day.isProject ? (
          <CodeEditor day={day} />
        ) : (
          <>
            {/* Notes */}
            <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold flex items-center gap-3"><NotesIcon className="w-7 h-7 text-teal-400"/> Study Notes</h2>
                    <button onClick={handleDownloadNotes} className="flex items-center gap-2 bg-slate-700 text-slate-300 text-sm font-semibold py-2 px-3 rounded-lg hover:bg-slate-600 transition duration-300">
                        <DownloadIcon className="w-4 h-4"/> Download
                    </button>
                </div>
                <div className="prose prose-invert max-w-none mt-4 text-slate-300 leading-relaxed">
                  <ContentRenderer markdown={day.notes} />
                </div>
            </div>

            {/* Challenge */}
            <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
                <h2 className="text-2xl font-bold flex items-center gap-3"><ChallengeIcon className="w-7 h-7 text-teal-400"/> Today's Challenge</h2>
                <h3 className="text-xl font-semibold text-white mt-4">{day.challenge.title}</h3>
                <p className="mt-2 text-slate-300 whitespace-pre-line">{day.challenge.description}</p>
            </div>
          </>
        )}

        <div className="text-center pt-4 flex flex-col sm:flex-row justify-center items-center gap-4 relative">
          <button
            onClick={handleCompletionClick}
            className="bg-green-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-green-700 transition duration-300 transform hover:scale-105 w-full sm:w-auto"
          >
            Mark as Complete
          </button>
          {day.isProject ? (
            <button
              onClick={() => setIsDeployModalOpen(true)}
              className="flex items-center justify-center gap-2 bg-slate-100 text-slate-900 font-bold py-3 px-6 rounded-lg hover:bg-white transition duration-300 transform hover:scale-105 w-full sm:w-auto"
            >
              <DeployIcon className="w-5 h-5" />
              Deploy to Vercel
            </button>
          ) : (
            <button
              onClick={() => setIsPracticeQuizOpen(true)}
              className="flex items-center justify-center gap-2 bg-indigo-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-indigo-700 transition duration-300 transform hover:scale-105 w-full sm:w-auto"
            >
              <QuizIcon className="w-5 h-5" />
              Practice Quiz
            </button>
          )}
          {showPointsNotification && (
            <div className="absolute -bottom-12 bg-amber-500 text-slate-900 font-bold py-2 px-4 rounded-full text-sm animate-bounce">
                +10 Points!
            </div>
          )}
        </div>
      </div>
      
      <button
        onClick={() => setIsTutorOpen(true)}
        className="fixed bottom-6 right-6 md:bottom-8 md:right-8 bg-violet-600 text-white p-4 rounded-full shadow-lg hover:bg-violet-700 transition-all transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-violet-500 z-40"
        aria-label="Ask AI Tutor"
      >
        <AiIcon className="w-7 h-7" />
      </button>

      <AiTutorModal
        isOpen={isTutorOpen}
        onClose={() => setIsTutorOpen(false)}
        lessonTopic={day.topic}
        lessonNotes={day.notes}
      />

      <PracticeQuizModal
        isOpen={isPracticeQuizOpen}
        onClose={() => setIsPracticeQuizOpen(false)}
        lessonTopic={day.topic}
        lessonNotes={day.notes}
      />

      <VercelDeployModal
        isOpen={isDeployModalOpen}
        onClose={() => setIsDeployModalOpen(false)}
      />
    </>
  );
};

export default CourseView;
