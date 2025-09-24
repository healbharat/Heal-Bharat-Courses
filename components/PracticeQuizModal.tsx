import React, { useState, useEffect, useCallback } from 'react';
import { generatePracticeQuiz } from '../services/geminiService';
import type { QuizQuestion } from '../types';
import Spinner from './Spinner';
import { QuizIcon } from './icons/QuizIcon';
import { CheckCircleIcon } from './icons/CheckCircleIcon';
import { XCircleIcon } from './icons/XCircleIcon';

interface PracticeQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  lessonTopic: string;
  lessonNotes: string;
}

const PracticeQuizModal: React.FC<PracticeQuizModalProps> = ({ isOpen, onClose, lessonTopic, lessonNotes }) => {
  const [quiz, setQuiz] = useState<QuizQuestion[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [quizFinished, setQuizFinished] = useState(false);

  const loadQuiz = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setQuiz([]);
    try {
      const questions = await generatePracticeQuiz(lessonNotes, lessonTopic);
      setQuiz(questions);
    } catch (e: any) {
      setError(e.message || 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [lessonNotes, lessonTopic]);

  useEffect(() => {
    if (isOpen) {
      // Reset state when modal opens
      setQuizFinished(false);
      setSelectedAnswers({});
      setCurrentQuestionIndex(0);
      loadQuiz();
    }
  }, [isOpen, loadQuiz]);

  const handleAnswerSelect = (answer: string) => {
    if (quizFinished) return;
    setSelectedAnswers(prev => ({ ...prev, [currentQuestionIndex]: answer }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < quiz.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setQuizFinished(true);
    }
  };
  
  const handleRestart = () => {
    setQuizFinished(false);
    setSelectedAnswers({});
    setCurrentQuestionIndex(0);
  }
  
  const score = quiz.reduce((acc, question, index) => {
      return selectedAnswers[index] === question.correctAnswer ? acc + 1 : acc;
  }, 0);


  if (!isOpen) return null;
  
  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-center">
          <Spinner />
          <p className="mt-4 text-slate-300 font-semibold">Generating your practice quiz...</p>
          <p className="mt-2 text-sm text-slate-400">The AI is creating questions based on the lesson content.</p>
        </div>
      );
    }
    
    if (error) {
        return (
            <div className="flex flex-col items-center justify-center h-full text-center p-4">
                <div className="w-16 h-16 flex items-center justify-center bg-red-500/10 rounded-full mb-4">
                    <XCircleIcon className="w-8 h-8 text-red-400"/>
                </div>
                <h3 className="text-xl font-bold text-white">Quiz Generation Failed</h3>
                <p className="mt-2 text-slate-400">{error}</p>
                 <button onClick={loadQuiz} className="mt-6 bg-indigo-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-indigo-700 transition">
                    Try Again
                </button>
            </div>
        );
    }

    if (quizFinished) {
        return (
            <div className="p-6 text-center">
                <h3 className="text-2xl font-bold text-white">Quiz Complete!</h3>
                <p className="text-6xl font-bold text-teal-400 my-4">{score} / {quiz.length}</p>
                <div className="space-y-4 max-h-80 overflow-y-auto pr-2">
                    {quiz.map((q, index) => {
                        const userAnswer = selectedAnswers[index];
                        const isCorrect = userAnswer === q.correctAnswer;
                        return (
                            <div key={index} className={`p-3 rounded-lg text-left ${isCorrect ? 'bg-green-500/10 border border-green-500/30' : 'bg-red-500/10 border border-red-500/30'}`}>
                                <p className="font-semibold text-slate-200">{q.question}</p>
                                <p className={`mt-1 text-sm ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>
                                    Your answer: {userAnswer || 'Not answered'} {isCorrect ? <CheckCircleIcon className="inline-block w-4 h-4 ml-1"/> : <XCircleIcon className="inline-block w-4 h-4 ml-1" />}
                                </p>
                                {!isCorrect && <p className="mt-1 text-sm text-slate-400">Correct answer: {q.correctAnswer}</p>}
                            </div>
                        );
                    })}
                </div>
                 <div className="mt-6 flex gap-4 justify-center">
                     <button onClick={handleRestart} className="bg-slate-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-slate-700 transition">
                        Try Again
                    </button>
                     <button onClick={onClose} className="bg-indigo-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-indigo-700 transition">
                        Close
                    </button>
                 </div>
            </div>
        )
    }

    const currentQuestion = quiz[currentQuestionIndex];
    if (!currentQuestion) return null;

    return (
        <div className="p-6 flex flex-col h-full">
            <p className="text-sm font-semibold text-indigo-400">Question {currentQuestionIndex + 1} of {quiz.length}</p>
            <p className="text-xl font-semibold text-white mt-2 mb-6">{currentQuestion.question}</p>
            <div className="space-y-3 flex-1">
                {currentQuestion.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(option)}
                    className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${
                      selectedAnswers[currentQuestionIndex] === option
                        ? 'bg-teal-500/30 border-teal-500 text-white'
                        : 'bg-slate-700 border-slate-600 hover:bg-slate-600/70 text-slate-300'
                    }`}
                  >
                    {option}
                  </button>
                ))}
            </div>
            <div className="mt-6 text-right">
                <button
                  onClick={handleNext}
                  disabled={!selectedAnswers[currentQuestionIndex]}
                  className="bg-indigo-600 text-white font-bold py-2 px-8 rounded-lg hover:bg-indigo-700 disabled:bg-slate-600 disabled:text-slate-500 disabled:cursor-not-allowed transition"
                >
                  {currentQuestionIndex === quiz.length - 1 ? 'Finish' : 'Next'}
                </button>
            </div>
        </div>
    );
  }

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="bg-slate-800 border border-slate-700 rounded-2xl shadow-2xl w-full max-w-2xl h-[70vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="p-4 border-b border-slate-700 flex justify-between items-center flex-shrink-0">
          <div className="flex items-center gap-3">
            <QuizIcon className="w-7 h-7 text-indigo-400" />
            <h2 className="text-xl font-bold text-white">AI Practice Quiz: {lessonTopic}</h2>
          </div>
          <button onClick={onClose} className="text-slate-500 hover:text-white transition-colors text-3xl leading-none">&times;</button>
        </header>
        <div className="flex-1 overflow-y-auto">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default PracticeQuizModal;
