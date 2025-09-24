

import React, { useState, useCallback, useMemo, useEffect } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import CourseView from './CourseView';
import QuizView from './QuizView';
import ProfileModal from './ProfileModal';
import CertificateView from './CertificateView';
import CourseSelectionView from './CourseSelectionView';
import { courses } from '../data/courses';
import type { User, Course } from '../types';
import { View } from '../types';

interface DashboardProps {
  user: User;
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, onLogout }) => {
  const [activeCourseId, setActiveCourseId] = useState<string | null>(null);
  const [selectedDay, setSelectedDay] = useState<number>(1);
  const [view, setView] = useState<View>(View.COURSE_SELECTION);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [certificateCourse, setCertificateCourse] = useState<Course | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // FIX: The original code was creating Sets of `any` type from `JSON.parse`.
  // This explicitly reconstructs the object with the correct `Set<number>` type,
  // which resolves downstream type inference issues. It also handles potential parsing errors.
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
      } catch (e) {
        console.error("Failed to parse progress from localStorage", e);
        return {};
      }
    }
    return {};
  });
  
  const [points, setPoints] = useState<number>(() => {
    const savedPoints = localStorage.getItem('user-points');
    return savedPoints ? parseInt(savedPoints, 10) : 0;
  });

  const [passedQuizzes, setPassedQuizzes] = useState<Set<string>>(() => {
    const saved = localStorage.getItem('passed-quizzes');
    // FIX: Safely parse localStorage data to ensure the Set is of type `string`.
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Fix: Ensure parsed value is an array and filter its contents to ensure they are strings before creating a Set.
        if (Array.isArray(parsed)) {
          return new Set<string>(parsed.filter((item): item is string => typeof item === 'string'));
        }
      } catch (e) {
        console.error("Failed to parse passed-quizzes from localStorage", e);
      }
    }
    return new Set<string>();
  });

  useEffect(() => {
    localStorage.setItem('course-progress', JSON.stringify(
        Object.fromEntries(Object.entries(progress).map(([courseId, daySet]) => [courseId, Array.from(daySet)]))
    ));
  }, [progress]);
  
  useEffect(() => {
    localStorage.setItem('user-points', points.toString());
  }, [points]);

  useEffect(() => {
    localStorage.setItem('passed-quizzes', JSON.stringify(Array.from(passedQuizzes)));
  }, [passedQuizzes]);

  const activeCourse = useMemo(() => courses.find(c => c.id === activeCourseId), [activeCourseId]);
  const activeCourseProgress = useMemo(() => progress[activeCourseId!] || new Set<number>(), [progress, activeCourseId]);
  const isCourseComplete = useMemo(() => activeCourse ? activeCourseProgress.size === activeCourse.structure.length : false, [activeCourse, activeCourseProgress]);

  const handleSelectCourse = useCallback((courseId: string) => {
    setActiveCourseId(courseId);
    setSelectedDay(1);
    setView(View.COURSE_CONTENT);
  }, []);

  const handleDaySelect = useCallback((day: number) => {
    setSelectedDay(day);
    setView(View.COURSE_CONTENT);
    setIsSidebarOpen(false); // Close sidebar on mobile after selection
  }, []);

  const handleCompleteDay = useCallback((courseId: string, day: number) => {
    const courseProgressForDay = new Set(progress[courseId] || []);
    if (!courseProgressForDay.has(day)) {
        setPoints(currentPoints => currentPoints + 10);
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
    setProgress(prev => ({
        ...prev,
        [activeCourse.id]: new Set(allDayIds)
    }));
  }, [activeCourse]);
  
  const handlePassQuiz = useCallback((courseId: string) => {
    if (!passedQuizzes.has(courseId)) {
        setPoints(p => p + 50);
        setPassedQuizzes(prev => {
            const newSet = new Set(prev);
            newSet.add(courseId);
            return newSet;
        });
    }
  }, [passedQuizzes]);

  const handleStartQuiz = useCallback(() => {
    setView(View.QUIZ);
    setIsSidebarOpen(false); // Close sidebar on mobile
  }, []);

  const handleViewCertificate = useCallback((course: Course) => {
    setCertificateCourse(course);
    setIsProfileOpen(false);
    setView(View.CERTIFICATE);
  }, []);
  
  const handleBackToCourses = useCallback(() => {
    setActiveCourseId(null);
    setView(View.COURSE_SELECTION);
  }, []);

  const renderMainContent = () => {
    const currentCourseDay = activeCourse?.structure.find(d => d.day === selectedDay);

    switch(view) {
      case View.COURSE_SELECTION:
        return <CourseSelectionView onSelectCourse={handleSelectCourse} progress={progress} />;
      case View.COURSE_CONTENT:
        return activeCourse && currentCourseDay && (
          <CourseView 
            course={activeCourse}
            day={currentCourseDay} 
            onComplete={handleCompleteDay}
            completedDays={activeCourseProgress}
          />
        );
      case View.QUIZ:
        return activeCourse && (
            <QuizView 
                quiz={activeCourse.quiz} 
                onPassQuiz={handlePassQuiz}
                courseId={activeCourse.id}
                hasPassedQuiz={passedQuizzes.has(activeCourse.id)}
            />
        );
      case View.CERTIFICATE:
        return certificateCourse && <CertificateView user={user} course={certificateCourse} onBack={handleBackToCourses} />;
      default:
        return null;
    }
  }

  if (view === View.COURSE_SELECTION || !activeCourse) {
    return (
        <div className="flex flex-col h-screen">
             <Header 
                user={user} 
                onLogout={onLogout} 
                progress={0}
                totalDays={0}
                points={points}
                onOpenProfile={() => setIsProfileOpen(true)}
              />
            <main className="flex-1 overflow-y-auto p-6 md:p-8">
                {renderMainContent()}
            </main>
             <ProfileModal 
                isOpen={isProfileOpen}
                onClose={() => setIsProfileOpen(false)}
                user={user}
                progressData={progress}
                points={points}
                onViewCertificate={handleViewCertificate}
            />
        </div>
    );
  }

  return (
    <>
       {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
          aria-hidden="true"
        ></div>
      )}
      <div className="flex h-screen bg-slate-900">
        <Sidebar
          course={activeCourse}
          selectedDay={selectedDay}
          onDaySelect={handleDaySelect}
          completedDays={activeCourseProgress}
          onStartQuiz={handleStartQuiz}
          isCourseComplete={isCourseComplete}
          onCompleteAll={handleCompleteAll}
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header 
            user={user} 
            onLogout={onLogout} 
            progress={activeCourseProgress.size}
            totalDays={activeCourse.structure.length}
            points={points}
            onOpenProfile={() => setIsProfileOpen(true)}
            onBackToCourses={handleBackToCourses}
            courseTitle={activeCourse.title}
            onToggleSidebar={() => setIsSidebarOpen(prev => !prev)}
            activeCourseId={activeCourseId}
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