import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { pythonCourseData } from '../data/pythonCourse';
import type { CourseSection } from '../types';
import { CheckCircleIcon } from './icons/CheckCircleIcon';
import { LockIcon } from './icons/LockIcon';
import { ClockIcon } from './icons/ClockIcon';
import { NotesIcon } from './icons/NotesIcon';
import { generateCourseSectionNotes } from '../services/geminiService';
import AiNotesModal from './AiNotesModal';
import Spinner from './Spinner';
import { VideoIcon } from './icons/VideoIcon';
import { QuizIcon } from './icons/QuizIcon';
import { CodeIcon } from './icons/CodeIcon';
import { TerminalIcon } from './icons/TerminalIcon';
import { CertificateIcon } from './icons/CertificateIcon';

interface PythonCourseViewProps {
  completedSections: Set<string>;
  onCompleteSection: (sectionId: string) => void;
}

const QuizComponent: React.FC<{ section: CourseSection, onQuizComplete: () => void }> = ({ section, onQuizComplete }) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState<(number | null)[]>(Array(section.quiz.length).fill(null));
    const [showResults, setShowResults] = useState(false);

    const handleAnswerSelect = (optionIndex: number) => {
        if(showResults) return;
        setSelectedAnswers(prev => {
            const newAnswers = [...prev];
            newAnswers[currentQuestionIndex] = optionIndex;
            return newAnswers;
        });
    };
    
    const handleNext = () => {
        if (currentQuestionIndex < section.quiz.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
        } else {
            setShowResults(true);
            const correctAnswers = selectedAnswers.filter((ans, i) => ans === section.quiz[i].correctAnswerIndex).length;
            // Mark complete if user gets at least half right
            if (correctAnswers >= Math.ceil(section.quiz.length / 2)) {
                onQuizComplete();
            }
        }
    }
    
    if (showResults) {
        const score = selectedAnswers.filter((ans, i) => ans === section.quiz[i].correctAnswerIndex).length;
        const total = section.quiz.length;
        return (
            <div className="bg-slate-900/50 p-6 rounded-lg border border-slate-700">
                <h3 className="text-xl font-bold text-white mb-2">Quiz Results</h3>
                <p className="text-lg text-slate-300">You scored {score} out of {total}.</p>
                <ul className="mt-4 space-y-3">
                    {section.quiz.map((q, i) => {
                        const isCorrect = selectedAnswers[i] === q.correctAnswerIndex;
                        return (
                             <li key={i} className={`p-3 rounded-md border ${isCorrect ? 'border-green-500/30 bg-green-500/10' : 'border-red-500/30 bg-red-500/10'}`}>
                                <p className="font-semibold text-slate-200">{q.question}</p>
                                <p className={`text-sm ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>Your answer: {q.options[selectedAnswers[i]!] ?? 'Not answered'}</p>
                                {!isCorrect && <p className="text-sm text-slate-400 mt-1"><strong>Correct Answer:</strong> {q.options[q.correctAnswerIndex]}</p>}
                                <p className="text-xs text-slate-500 mt-2">{q.explanation}</p>
                            </li>
                        )
                    })}
                </ul>
            </div>
        )
    }

    const currentQuestion = section.quiz[currentQuestionIndex];

    return (
        <div className="bg-slate-900/50 p-6 rounded-lg border border-slate-700">
            <h3 className="text-xl font-bold text-white mb-4">Check Your Knowledge</h3>
            <p className="font-semibold text-slate-300 mb-4">{currentQuestion.question}</p>
            <div className="space-y-3">
                {currentQuestion.options.map((option, index) => (
                     <button key={index} onClick={() => handleAnswerSelect(index)} className={`w-full text-left p-3 rounded-md border-2 transition-all ${selectedAnswers[currentQuestionIndex] === index ? 'border-teal-500 bg-teal-500/20' : 'border-slate-600 hover:border-slate-500'}`}>
                        {option}
                     </button>
                ))}
            </div>
            <div className="text-right mt-6">
                 <button onClick={handleNext} disabled={selectedAnswers[currentQuestionIndex] === null} className="bg-indigo-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-indigo-700 transition disabled:bg-slate-700/50 disabled:cursor-not-allowed">
                    {currentQuestionIndex < section.quiz.length - 1 ? 'Next' : 'Submit'}
                </button>
            </div>
        </div>
    );
};

const FeatureCard: React.FC<{ icon: React.FC<any>, title: string, description: string }> = ({ icon: Icon, title, description }) => (
    <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700 flex items-start gap-4">
        <div className="bg-slate-700 p-2 rounded-md mt-1">
            <Icon className="w-6 h-6 text-teal-400" />
        </div>
        <div>
            <h4 className="font-bold text-white">{title}</h4>
            <p className="text-sm text-slate-400 mt-1">{description}</p>
        </div>
    </div>
);


const PythonCourseView: React.FC<PythonCourseViewProps> = ({ completedSections, onCompleteSection }) => {
  const [activeSectionId, setActiveSectionId] = useState<string>(pythonCourseData[0].id);
  
  const [isGeneratingNotes, setIsGeneratingNotes] = useState(false);
  const [isNotesModalOpen, setIsNotesModalOpen] = useState(false);
  const [notesContent, setNotesContent] = useState('');

  const activeSection = useMemo(() => {
    return pythonCourseData.find(s => s.id === activeSectionId) || pythonCourseData[0];
  }, [activeSectionId]);
  
  const handleSelectSection = (sectionId: string) => {
    const sectionIndex = pythonCourseData.findIndex(s => s.id === sectionId);
    if (sectionIndex === 0) {
        setActiveSectionId(sectionId);
        return;
    }
    const prevSectionId = pythonCourseData[sectionIndex - 1].id;
    if (completedSections.has(prevSectionId)) {
        setActiveSectionId(sectionId);
    }
  };

  useEffect(() => {
    // If the active section is completed, move to the next available one
    if(completedSections.has(activeSectionId)) {
        const currentIndex = pythonCourseData.findIndex(s => s.id === activeSectionId);
        if (currentIndex < pythonCourseData.length - 1) {
            const nextSection = pythonCourseData[currentIndex + 1];
            handleSelectSection(nextSection.id);
        }
    }
  }, [completedSections, activeSectionId]);

  const handleGenerateNotes = useCallback(async (section: CourseSection) => {
    setIsNotesModalOpen(true);
    setIsGeneratingNotes(true);
    setNotesContent('');
    try {
      const notes = await generateCourseSectionNotes(section.title, section.description);
      setNotesContent(notes);
    } catch (e) {
      console.error(e);
      setNotesContent("### Error\nFailed to generate notes. Please try again later.");
    } finally {
      setIsGeneratingNotes(false);
    }
  }, []);

  return (
    <div className="animate-fade-in flex flex-col md:flex-row gap-8 h-full">
      {/* Sidebar */}
      <aside className="w-full md:w-80 flex-shrink-0 bg-slate-800/50 border border-slate-700 rounded-xl p-4 flex flex-col">
        <h2 className="text-lg font-bold text-white mb-4 px-2">Course Outline</h2>
        <nav className="flex-1 overflow-y-auto">
          <ul className="space-y-2">
            {pythonCourseData.map((section, index) => {
              const isCompleted = completedSections.has(section.id);
              const isLocked = index > 0 && !completedSections.has(pythonCourseData[index - 1].id);
              const isActive = section.id === activeSectionId;

              return (
                <li key={section.id}>
                  <button
                    onClick={() => handleSelectSection(section.id)}
                    disabled={isLocked}
                    className={`w-full text-left p-3 rounded-lg transition-colors flex items-center gap-3 text-sm ${
                      isLocked ? 'text-slate-500 cursor-not-allowed' :
                      isActive ? 'bg-slate-700 text-white font-semibold' :
                      'text-slate-300 hover:bg-slate-700/50'
                    }`}
                  >
                    {isCompleted ? <CheckCircleIcon className="w-5 h-5 text-green-400 flex-shrink-0" /> :
                     isLocked ? <LockIcon className="w-5 h-5 text-slate-500 flex-shrink-0" /> :
                     <div className={`w-5 h-5 flex-shrink-0 flex items-center justify-center font-bold rounded-full ${isActive ? 'bg-white text-slate-800' : 'bg-slate-600 text-slate-200'}`}>{index + 1}</div>
                    }
                    <span>{section.title}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pr-2">
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
          <header className="mb-6">
            <div className="flex items-center justify-between flex-wrap gap-2">
                <h1 className="text-3xl font-extrabold text-white">{activeSection.title}</h1>
                <div className="flex items-center gap-2 text-sm text-slate-400 bg-slate-700/50 px-3 py-1 rounded-full">
                    <ClockIcon className="w-4 h-4"/>
                    <span>{activeSection.duration}</span>
                </div>
            </div>
            <p className="text-slate-400 mt-2">{activeSection.description}</p>
          </header>

          <div className="my-8">
            <h3 className="text-2xl font-bold text-white mb-4">This Course Includes:</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <FeatureCard icon={VideoIcon} title="4+ Hours of Video" description="In-depth video lessons covering all key concepts." />
                <FeatureCard icon={NotesIcon} title="AI-Generated Notes" description="Get concise, smart notes for every section." />
                <FeatureCard icon={QuizIcon} title="Interactive Quizzes" description="Test your knowledge after each section to solidify learning." />
                <FeatureCard icon={CodeIcon} title="Code Snippets" description="Practical code examples you can use and learn from." />
                <FeatureCard icon={TerminalIcon} title="Hands-on Practice" description="Apply what you learn with practical exercises and challenges." />
                <FeatureCard icon={CertificateIcon} title="Certificate of Completion" description="Earn a shareable certificate to showcase your new skills." />
            </div>
          </div>

          <div className="aspect-video mb-6">
             <iframe
                className="w-full h-full rounded-lg border border-slate-700"
                src={`https://www.youtube.com/embed/${activeSection.youtubeId}`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen>
            </iframe>
          </div>

          <div className="mb-6">
            <button
                onClick={() => handleGenerateNotes(activeSection)}
                disabled={isGeneratingNotes}
                className="inline-flex items-center gap-2 bg-teal-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-teal-700 transition duration-300 disabled:bg-slate-700 disabled:cursor-wait"
            >
                {isGeneratingNotes ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : <NotesIcon className="w-5 h-5" />}
                Get AI Notes for this Section
            </button>
          </div>
          
          {!completedSections.has(activeSectionId) && (
             <QuizComponent section={activeSection} onQuizComplete={() => onCompleteSection(activeSection.id)} />
          )}

          {completedSections.has(activeSectionId) && (
            <div className="text-center p-8 bg-green-500/10 border border-green-500/20 rounded-lg">
                <CheckCircleIcon className="w-12 h-12 text-green-400 mx-auto mb-4"/>
                <h3 className="text-2xl font-bold text-white">Section Completed!</h3>
                <p className="text-slate-300 mt-2">You've mastered this section. Move on to the next to continue your journey.</p>
            </div>
          )}

        </div>
      </main>

      <AiNotesModal
        isOpen={isNotesModalOpen}
        isLoading={isGeneratingNotes}
        onClose={() => setIsNotesModalOpen(false)}
        courseTitle={activeSection.title}
        notesContent={notesContent}
      />
    </div>
  );
};

export default PythonCourseView;