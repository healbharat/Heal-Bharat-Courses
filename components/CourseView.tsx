
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

interface CourseViewProps {
  day: CourseDay;
  course: Course;
  onComplete: (courseId: string, day: number) => void;
  completedDays: Set<number>;
}

const parseMarkdown = (text: string): string => {
    let html = text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  
    // Code blocks (```...```)
    html = html.replace(/```(\w*)\n([\s\S]*?)```/g, (_match, lang, code) => {
      const language = lang || 'plaintext';
      const escapedCode = code.replace(/</g, '&lt;').replace(/>/g, '&gt;');
      return `<pre class="bg-slate-900 rounded-md p-4 overflow-x-auto my-4 text-sm font-mono relative border border-slate-700"><div class="absolute top-2 right-3 text-xs text-slate-500 uppercase">${language}</div><code class="language-${language}">${escapedCode.trim()}</code></pre>`;
    });

    // Headings (###, ##, #)
    html = html.replace(/^### (.*$)/gim, '<h3 class="text-xl font-bold mt-6 mb-2 text-white">$1</h3>');
    html = html.replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold mt-8 mb-3 border-b border-slate-700 pb-2 text-white">$1</h2>');

    // Bold (**...**)
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-white">$1</strong>');
  
    // Inline code (`...`)
    html = html.replace(/`([^`]+)`/g, '<code class="bg-slate-700 text-teal-300 rounded px-1.5 py-0.5 font-mono text-sm">$1</code>');
  
    // Unordered lists (* or -)
    html = html.replace(/^\s*([*-]) (.*(?:\n(?!^\s*[*-]).*)*)/gm, '<li>$2</li>');
    html = html.replace(/((?:<li>.*<\/li>\s*)+)/g, (match) => {
      if (!match.startsWith('<ul>')) {
        return `<ul class="list-disc list-inside space-y-2 my-4">${match.trim()}</ul>`;
      }
      return match;
    });

    // Replace paragraphs (sequences of non-empty lines)
    html = html.split(/\n\s*\n/).map(paragraph => {
      if (paragraph.startsWith('<') || paragraph.trim() === '') {
        return paragraph;
      }
      return `<p>${paragraph.replace(/\n/g, '<br/>')}</p>`;
    }).join('');

    // Cleanup <p><br/></p>
    html = html.replace(/<p><br\/><\/p>/g, '');
    
    return html;
};

const CourseView: React.FC<CourseViewProps> = ({ day, course, onComplete, completedDays }) => {
  const [isTutorOpen, setIsTutorOpen] = useState(false);
  const [isPracticeQuizOpen, setIsPracticeQuizOpen] = useState(false);
  const [showPointsNotification, setShowPointsNotification] = useState(false);

  const handleDownloadNotes = () => {
    const blob = new Blob([day.notes], { type: 'text/markdown;charset=utf-8' });
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
                <div className="prose prose-invert max-w-none mt-4 text-slate-300 leading-relaxed" dangerouslySetInnerHTML={{ __html: parseMarkdown(day.notes) }} />
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
          {!day.isProject && (
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
    </>
  );
};

export default CourseView;