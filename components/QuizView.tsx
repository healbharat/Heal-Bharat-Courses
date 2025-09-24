
import React, { useState, useEffect } from 'react';
import type { QuizQuestion } from '../types';
import Spinner from './Spinner';

interface QuizViewProps {
    quiz: QuizQuestion[];
    onPassQuiz: (courseId: string) => void;
    courseId: string;
    hasPassedQuiz: boolean;
}

const QuizView: React.FC<QuizViewProps> = ({ quiz: questions, onPassQuiz, courseId, hasPassedQuiz }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [showPointsMessage, setShowPointsMessage] = useState(false);

  const handleNextQuestion = () => {
    // Check score before moving to the next question
    if (selectedAnswer === questions[currentQuestionIndex].correctAnswer) {
      setScore(prev => prev + 1);
    }
    
    // Check if it's the last question
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
    } else {
       // Finish the quiz on the last question
       setQuizFinished(true);
    }
  };

  const finalScore = selectedAnswer === questions[currentQuestionIndex].correctAnswer ? score + 1 : score;
  const percentage = Math.round((finalScore / questions.length) * 100);

  useEffect(() => {
    if (quizFinished) {
      if (percentage >= 70 && !hasPassedQuiz) {
        onPassQuiz(courseId);
        setShowPointsMessage(true);
      }
    }
  }, [quizFinished, percentage, hasPassedQuiz, onPassQuiz, courseId]);

  if (!questions || questions.length === 0) {
    return (
        <div className="flex items-center justify-center h-full">
            <div className="bg-yellow-500/10 border border-yellow-500 text-yellow-400 p-6 rounded-lg">
              <h3 className="font-bold text-lg mb-2">Quiz Not Available</h3>
              <p>There are no questions for this quiz at the moment.</p>
            </div>
        </div>
    );
  }
  
  if (quizFinished) {
    return (
        <div className="text-center max-w-2xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-extrabold text-white">Quiz Complete!</h1>
            <p className="text-slate-400 text-lg mt-2">You've finished the final assessment.</p>
            <div className="mt-8 bg-slate-800/50 p-8 rounded-xl border border-slate-700">
                <p className="text-2xl text-slate-300">Your Score:</p>
                <p className="text-6xl md:text-7xl font-bold text-teal-400 my-4">{percentage}%</p>
                <p className="text-xl text-slate-300">You answered {finalScore} out of {questions.length} questions correctly.</p>
                {showPointsMessage && (
                  <p className="mt-4 text-lg font-bold text-amber-400 animate-pulse">+50 Points Awarded!</p>
                )}
            </div>
        </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  return (
    <div className="max-w-3xl mx-auto">
      <header className="mb-8">
        <p className="text-sm font-semibold text-indigo-400">FINAL QUIZ</p>
        <h1 className="text-2xl md:text-3xl font-bold text-white mt-1">Final Assessment</h1>
        <div className="mt-4 w-full bg-slate-700 rounded-full h-2.5">
            <div className="bg-indigo-500 h-2.5 rounded-full" style={{width: `${((currentQuestionIndex + 1) / questions.length) * 100}%`}}></div>
        </div>
      </header>

      {currentQuestion && (
        <div>
          <h2 className="text-xl text-slate-300 mb-2">Question {currentQuestionIndex + 1} of {questions.length}</h2>
          <p className="text-2xl font-semibold text-white mb-6">{currentQuestion.question}</p>
          <div className="space-y-4">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => setSelectedAnswer(option)}
                className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${
                  selectedAnswer === option
                    ? 'bg-teal-500/30 border-teal-500 text-white'
                    : 'bg-slate-800 border-slate-700 hover:bg-slate-700 hover:border-slate-600 text-slate-300'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
          <div className="mt-8 text-right">
            <button
              onClick={handleNextQuestion}
              disabled={!selectedAnswer}
              className="bg-indigo-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-indigo-700 disabled:bg-slate-700 disabled:text-slate-500 disabled:cursor-not-allowed transition duration-300"
            >
              {currentQuestionIndex === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizView;
