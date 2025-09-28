import React, { useState, useCallback, useMemo, useEffect } from 'react';
import Header from './Header';
import ProfileModal from './ProfileModal';
import CourseSelectionView from './CourseSelectionView';
import type { User, CodingProblem } from '../types';
import { View } from '../types';
import MainSidebar from './MainSidebar';
import DashboardHome from './DashboardHome';
import CodingPracticeView from './CodingPracticeView';
import InterviewPracticeView from './InterviewPracticeView';
import AptitudePracticeView from './AptitudePracticeView';
import InternshipView from './InternshipView';
import CodingSolverView from './CodingSolverView';
import { codingProblems } from '../data/codingProblems';
import { allCompanyCourses, ExternalCourse } from '../data/companyCourses';
import AiChatbotView from './AiChatbotView';
import { generateCodingChallenge, generateCourseNotes } from '../services/geminiService';
import AiNotesModal from './AiNotesModal';


interface DashboardProps {
  user: User;
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, onLogout }) => {
  const [activeView, setActiveView] = useState<View>(View.DASHBOARD_HOME);
  const [activeProblem, setActiveProblem] = useState<CodingProblem | null>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isGeneratingChallenge, setIsGeneratingChallenge] = useState(false);
  
  const [isGeneratingNotes, setIsGeneratingNotes] = useState(false);
  const [isNotesModalOpen, setIsNotesModalOpen] = useState(false);
  const [notesContent, setNotesContent] = useState('');
  const [selectedCourseForNotes, setSelectedCourseForNotes] = useState<ExternalCourse | null>(null);

  const [isFullScreen, setIsFullScreen] = useState(!!document.fullscreenElement);

  const [points, setPoints] = useState<number>(() => {
    const savedPoints = localStorage.getItem('user-points');
    return savedPoints ? parseInt(savedPoints, 10) : 0;
  });

  const [completedCourses, setCompletedCourses] = useState<Set<string>>(() => {
    const saved = localStorage.getItem('completed-courses');
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });
  
  const [solvedProblems, setSolvedProblems] = useState<Set<number>>(() => {
    const saved = localStorage.getItem('solved-problems');
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });

  useEffect(() => { localStorage.setItem('user-points', points.toString()); }, [points]);
  useEffect(() => {
    localStorage.setItem('completed-courses', JSON.stringify(Array.from(completedCourses)));
  }, [completedCourses]);
  useEffect(() => {
    localStorage.setItem('solved-problems', JSON.stringify(Array.from(solvedProblems)));
  }, [solvedProblems]);

  useEffect(() => {
    const onFullScreenChange = () => {
        setIsFullScreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', onFullScreenChange);
    return () => document.removeEventListener('fullscreenchange', onFullScreenChange);
  }, []);
  
  const handleViewChange = useCallback((view: View) => {
    setActiveView(view);
  }, []);

  const handleToggleFullScreen = useCallback(() => {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(err => {
            alert(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
        });
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }
  }, []);
  
  const handleSelectProblem = useCallback((problemId: number) => {
    const problem = codingProblems.find(p => p.id === problemId);
    if (problem) {
      setActiveProblem(problem);
      setActiveView(View.CODING_SOLVER);
    }
  }, []);

  const handleGenerateChallenge = useCallback(async (course: ExternalCourse) => {
    setIsGeneratingChallenge(true);
    try {
      const newProblem = await generateCodingChallenge(course.title);
      setActiveProblem(newProblem);
      setActiveView(View.CODING_SOLVER);
    } catch (e) {
      console.error(e);
      alert("Failed to generate AI challenge. Please try again.");
    } finally {
      setIsGeneratingChallenge(false);
    }
  }, []);

  const handleGenerateNotes = useCallback(async (course: ExternalCourse) => {
    setIsNotesModalOpen(true);
    setIsGeneratingNotes(true);
    setSelectedCourseForNotes(course);
    setNotesContent(''); // Clear previous notes
    try {
      const notes = await generateCourseNotes(course.title, course.description);
      setNotesContent(notes);
    } catch (e) {
      console.error(e);
      setNotesContent("### Error\nFailed to generate notes. Please try again later.");
    } finally {
      setIsGeneratingNotes(false);
    }
  }, []);

  const handleCloseNotesModal = useCallback(() => {
    setIsNotesModalOpen(false);
    setSelectedCourseForNotes(null);
    setNotesContent('');
  }, []);


  const handleCompleteCourse = useCallback((courseId: string) => {
    if (completedCourses.has(courseId)) return;

    setCompletedCourses(prev => {
        const newSet = new Set(prev);
        newSet.add(courseId);
        return newSet;
    });
    setPoints(prev => prev + 100);
  }, [completedCourses]);

  const handleProblemSolved = useCallback((problemId: number, difficulty: 'Easy' | 'Medium' | 'Hard') => {
    const isStaticProblem = codingProblems.some(p => p.id === problemId);
    if (isStaticProblem && !solvedProblems.has(problemId)) {
        setSolvedProblems(prev => {
            const newSet = new Set(prev);
            newSet.add(problemId);
            return newSet;
        });
        const pointsAwarded = { 'Easy': 10, 'Medium': 25, 'Hard': 50 }[difficulty];
        setPoints(prev => prev + pointsAwarded);
    }
    else if (!isStaticProblem) {
        const pointsAwarded = { 'Easy': 10, 'Medium': 25, 'Hard': 50 }[difficulty];
        setPoints(prev => prev + pointsAwarded);
    }
  }, [solvedProblems]);

  const handleBackToProblems = useCallback(() => {
    setActiveView(View.CODING_PRACTICE);
    setActiveProblem(null);
  }, []);

  const completedCoursesDetails = useMemo(() => {
    return allCompanyCourses.flatMap(company => company.courses).filter(course => completedCourses.has(course.id));
  }, [completedCourses]);

  const renderView = () => {
    switch (activeView) {
      case View.DASHBOARD_HOME:
        return <DashboardHome user={user} points={points} onViewChange={handleViewChange} />;
      case View.COURSE_SELECTION:
        return <CourseSelectionView 
            completedCourses={completedCourses} 
            onCompleteCourse={handleCompleteCourse}
            onGenerateChallenge={handleGenerateChallenge}
            isGeneratingChallenge={isGeneratingChallenge}
            onGenerateNotes={handleGenerateNotes}
            isGeneratingNotes={isGeneratingNotes}
            selectedCourseForNotes={selectedCourseForNotes}
          />;
      case View.CODING_PRACTICE:
        return <CodingPracticeView onSolve={handleSelectProblem} solvedProblems={solvedProblems} />;
      case View.CODING_SOLVER:
        if (activeProblem) {
          return <CodingSolverView problem={activeProblem} onBack={handleBackToProblems} onProblemSolved={handleProblemSolved} />;
        }
        return <CodingPracticeView onSolve={handleSelectProblem} solvedProblems={solvedProblems} />;
      case View.INTERVIEW_PRACTICE:
        return <InterviewPracticeView />;
      case View.APTITUDE_PRACTICE:
        return <AptitudePracticeView />;
      case View.INTERNSHIP:
        return <InternshipView />;
      case View.AI_CHATBOT:
        return <AiChatbotView />;
      default:
        return <DashboardHome user={user} points={points} onViewChange={handleViewChange} />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-900 text-slate-200 font-sans">
      <MainSidebar activeView={activeView} setActiveView={handleViewChange} />
      <div className="flex-1 flex flex-col min-w-0">
        <Header 
          user={user} 
          onLogout={onLogout} 
          points={points} 
          onOpenProfile={() => setIsProfileOpen(true)}
          isFullScreen={isFullScreen}
          onToggleFullScreen={handleToggleFullScreen}
        />
        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          {renderView()}
        </main>
      </div>
      <ProfileModal 
        isOpen={isProfileOpen} 
        onClose={() => setIsProfileOpen(false)} 
        user={user} 
        points={points} 
        completedCourses={completedCoursesDetails}
      />
      <AiNotesModal
        isOpen={isNotesModalOpen}
        isLoading={isGeneratingNotes}
        onClose={handleCloseNotesModal}
        courseTitle={selectedCourseForNotes?.title || null}
        notesContent={notesContent}
      />
    </div>
  );
};

export default Dashboard;