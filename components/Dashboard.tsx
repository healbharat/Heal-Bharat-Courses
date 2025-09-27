import React, { useState, useCallback, useMemo, useEffect } from 'react';
import Header from './Header';
import CourseView from './CourseView';
import QuizView from './QuizView';
import ProfileModal from './ProfileModal';
import CertificateView from './CertificateView';
import CourseSelectionView from './CourseSelectionView';
import { courses } from '../data/courses';
import type { User, Course } from '../types';
import { View } from '../types';
import MainSidebar from './MainSidebar';
import DashboardHome from './DashboardHome';
import CodingPracticeView from './CodingPracticeView';
import InterviewPracticeView from './InterviewPracticeView';
import AptitudePracticeView from './AptitudePracticeView';
import InternshipView from './InternshipView';
import Sidebar from './Sidebar'; // This is now the Course-specific sidebar
import CodingSolverView from './CodingSolverView';
import { codingProblems } from '../data/codingProblems';


interface DashboardProps {
  user: User;
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, onLogout }) => {
  const [activeView, setActiveView] = useState<View>(View.DASHBOARD_HOME);
  const [activeCourseId, setActiveCourseId] = useState<string | null>(null);
  const [selectedProblemId, setSelectedProblemId] = useState<number | null>(null);
  const [selectedDay, setSelectedDay] = useState<number>(1);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [certificateCourse, setCertificateCourse] = useState<Course | null>(null);
  const [isCourseSidebarOpen, setIsCourseSidebarOpen] = useState(false);

  // Load progress from localStorage
  const [progress, setProgress] = useState<Record<string, Set<number>>>(() => {
    const savedProgress = localStorage.getItem('course-progress');
    if (savedProgress) {
      try {
        const parsed = JSON.parse(savedProgress);
        const newProgress: Record<string, Set<number>> = {};
        Object.keys(parsed).forEach(courseId => {
          if (Array.isArray(parsed[courseId])) {
            newProgress[courseId] = new Set(parsed[courseId]);
          }
        });
        return newProgress;
      } catch (e) { console.error("Failed to parse progress", e); return {}; }
    }
    return {};
  });

  const [points, setPoints] = useState<number>(() => {
    const savedPoints = localStorage.getItem('user-points');
    return savedPoints ? parseInt(savedPoints, 10) : 0;
  });

  const [passedQuizzes, setPassedQuizzes] = useState<Set<string>>(() => {
    const saved = localStorage.getItem('passed-quizzes');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return new Set<string>(parsed.filter((item): item is string => typeof item === 'string'));
        }
      } catch (e) { console.error("Failed to parse passed-quizzes", e); }
    }
    return new Set<string>();
  });

  // Save progress to localStorage
  useEffect(() => {
    localStorage.setItem('course-progress', JSON.stringify(
        Object.fromEntries(Object.entries(progress).map(([courseId, daySet]) => [courseId, Array.from(daySet)]))
    ));
  }, [progress]);
  
  useEffect(() => { localStorage.setItem('user-points', points.toString()); }, [points]);
  useEffect(() => { localStorage.setItem('passed-quizzes', JSON.stringify(Array.from(passedQuizzes))); }, [passedQuizzes]);

  const activeCourse = useMemo(() => courses.find(c => c.id === activeCourseId), [activeCourseId]);
  const activeCourseProgress = useMemo(() => progress[activeCourseId!] || new Set<number>(), [progress, activeCourseId]);
  const isCourseComplete = useMemo(() => activeCourse ? activeCourseProgress.size === activeCourse.structure.length : false, [activeCourse, activeCourseProgress]);

  const handleSelectCourse = useCallback((courseId: string) => {
    setActiveCourseId(courseId);
    setSelectedDay(1);
    setActiveView(View.COURSE_CONTENT);
  }, []);

  const handleDaySelect = useCallback((day: number) => {
    setSelectedDay(day);
    setIsCourseSidebarOpen(false); // Close sidebar on mobile after selection
  }, []);
  
  const handleViewChange = useCallback((view: View) => {
    setActiveCourseId(null);
    setActiveView(view);
  }, []);
  
  const handleSolveProblem = useCallback((problemId: number) => {
    setSelectedProblemId(problemId);
    setActiveView(View.CODING_SOLVER);
  }, []);

  const handleCompleteDay = useCallback((courseId: string, day: number) => {
    if (!(progress[courseId] || new Set()).has(day)) {
        setPoints(p => p + 10);
    }
    setProgress(prev => {
        const newProgress = { ...prev };
        const courseProgress = new Set(newProgress[courseId] || []);
        courseProgress.add(day);
        newProgress[courseId] = courseProgress;
        return newProgress;
    });
  }, [progress]);
  
  const handleCompleteAll = useCallback(() => {
    if (!activeCourse) return;
    const allDayIds = activeCourse.structure.map(d => d.day);
    setProgress(p => ({ ...p, [activeCourse.id]: new Set(allDayIds) }));
  }, [activeCourse]);
  
  const handlePassQuiz = useCallback((courseId: string) => {
    if (!passedQuizzes.has(courseId)) {
        setPoints(p => p + 50);
        setPassedQuizzes(prev => {
            const newSet = new Set(prev); newSet.add(courseId); return newSet;
        });
    }
  }, [passedQuizzes]);

  const handleStartQuiz = useCallback(() => {
    setActiveView(View.QUIZ);
    setIsCourseSidebarOpen(false);
  }, []);

  const handleViewCertificate = useCallback((course: Course) => {
    setCertificateCourse(course);
    setIsProfileOpen(false);
    setActiveView(View.CERTIFICATE);
  }, []);

  const renderMainContent = () => {
    const currentCourseDay = activeCourse?.structure.find(d => d.day === selectedDay);

    switch(activeView) {
      case View.DASHBOARD_HOME:
        return <DashboardHome user={user} progressData={progress} points={points} />;
      case View.COURSE_SELECTION:
        return <CourseSelectionView onSelectCourse={handleSelectCourse} progress={progress} />;
      case View.CODING_PRACTICE:
        return <CodingPracticeView onSolve={handleSolveProblem} />;
      case View.INTERVIEW_PRACTICE:
        return <InterviewPracticeView />;
      case View.APTITUDE_PRACTICE:
        return <AptitudePracticeView />;
      case View.INTERNSHIP:
        return <InternshipView progressData={progress} />;
      case View.CODING_SOLVER: {
          const problem = codingProblems.find(p => p.id === selectedProblemId);
          return problem ? <CodingSolverView problem={problem} onBack={() => setActiveView(View.CODING_PRACTICE)} /> : <div>Problem not found. Please go back.</div>;
      }
      case View.COURSE_CONTENT:
        return activeCourse && currentCourseDay && (
          <CourseView course={activeCourse} day={currentCourseDay} onComplete={handleCompleteDay} completedDays={activeCourseProgress} />
        );
      case View.QUIZ:
        return activeCourse && (
            <QuizView quiz={activeCourse.quiz} onPassQuiz={handlePassQuiz} courseId={activeCourse.id} hasPassedQuiz={passedQuizzes.has(activeCourse.id)} />
        );
      case View.CERTIFICATE:
        return certificateCourse && <CertificateView user={user} course={certificateCourse} onBack={() => setActiveView(View.DASHBOARD_HOME)} />;
      default:
        return <DashboardHome user={user} progressData={progress} points={points} />;
    }
  }
  
  const isCourseViewActive = [View.COURSE_CONTENT, View.QUIZ].includes(activeView);

  return (
    <>
      <div className="flex h-screen bg-slate-900">
        <MainSidebar activeView={activeView} setActiveView={handleViewChange} />
        
        {isCourseViewActive && activeCourse && (
          <>
            {isCourseSidebarOpen && (
              <div className="fixed inset-0 bg-black/60 z-40 md:hidden" onClick={() => setIsCourseSidebarOpen(false)} aria-hidden="true"></div>
            )}
            <Sidebar
              course={activeCourse}
              selectedDay={selectedDay}
              onDaySelect={handleDaySelect}
              completedDays={activeCourseProgress}
              onStartQuiz={handleStartQuiz}
              isCourseComplete={isCourseComplete}
              onCompleteAll={handleCompleteAll}
              isOpen={isCourseSidebarOpen}
              onClose={() => setIsCourseSidebarOpen(false)}
            />
          </>
        )}

        <div className="flex-1 flex flex-col overflow-hidden">
          <Header 
            user={user} 
            onLogout={onLogout} 
            points={points}
            onOpenProfile={() => setIsProfileOpen(true)}
            onToggleSidebar={isCourseViewActive ? () => setIsCourseSidebarOpen(p => !p) : undefined}
            isCourseViewActive={isCourseViewActive}
          />
          <main className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8">
            {renderMainContent()}
          </main>
        </div>
      </div>
      <ProfileModal 
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        user={user}
        progressData={progress}
        points={points}
        onViewCertificate={handleViewCertificate}
      />
    </>
  );
};

export default Dashboard;