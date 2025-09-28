import React, { useState, useEffect } from 'react';
import { BrainIcon } from './icons/BrainIcon';
import type { QuizQuestion } from '../types';

const aptitudeQuiz: QuizQuestion[] = [
    {
        question: "Which number should come next in the pattern? 37, 34, 31, 28, ...",
        options: ["25", "26", "22", "24"],
        correctAnswer: "25",
    },
    {
        question: "Book is to Reading as Fork is to:",
        options: ["Drawing", "Writing", "Eating", "Stirring"],
        correctAnswer: "Eating",
    },
    {
        question: "If a car travels at 60 km/h, how far will it travel in 2.5 hours?",
        options: ["120 km", "150 km", "180 km", "100 km"],
        correctAnswer: "150 km",
    },
    {
        question: "Which one of the five is least like the other four?",
        options: ["Dog", "Mouse", "Lion", "Snake", "Elephant"],
        correctAnswer: "Snake",
    },
];

const AptitudePracticeView: React.FC = () => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [score, setScore] = useState(0);
    const [quizFinished, setQuizFinished] = useState(false);

    const handleNextQuestion = () => {
        const isCorrect = selectedAnswer === aptitudeQuiz[currentQuestionIndex].correctAnswer;
        if (isCorrect) {
            setScore(prev => prev + 1);
        }
        
        if (currentQuestionIndex < aptitudeQuiz.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
            setSelectedAnswer(null);
        } else {
           setQuizFinished(true);
        }
    };
    
    const handleRestart = () => {
        setCurrentQuestionIndex(0);
        setSelectedAnswer(null);
        setScore(0);
        setQuizFinished(false);
    }

    const finalScore = score + (selectedAnswer === aptitudeQuiz[currentQuestionIndex]?.correctAnswer && !quizFinished ? 1 : 0);
    const percentage = Math.round((quizFinished ? score : finalScore) / aptitudeQuiz.length * 100);

    return (
        <div className="animate-fade-in">
            <header className="mb-8">
                <div className="flex items-center gap-3">
                <BrainIcon className="w-8 h-8 text-amber-400" />
                <h1 className="text-4xl font-extrabold text-white">Aptitude Practice</h1>
                </div>
                <p className="text-slate-400 mt-2 text-lg">Test your logical reasoning and quantitative skills.</p>
            </header>

            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 sm:p-8">
               {quizFinished ? (
                 <div className="text-center max-w-2xl mx-auto">
                    <h1 className="text-3xl md:text-4xl font-extrabold text-white">Quiz Complete!</h1>
                    <div className="mt-8 bg-slate-800/50 p-8 rounded-xl border border-slate-700">
                        <p className="text-2xl text-slate-300">Your Score:</p>
                        <p className="text-6xl md:text-7xl font-bold text-teal-400 my-4">{percentage}%</p>
                        <p className="text-xl text-slate-300">You answered {score} out of {aptitudeQuiz.length} questions correctly.</p>
                    </div>
                    <button onClick={handleRestart} className="mt-8 bg-indigo-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-indigo-700 transition duration-300">
                        Try Again
                    </button>
                </div>
               ) : (
                <div className="max-w-3xl mx-auto">
                    <header className="mb-8">
                        <div className="w-full bg-slate-700 rounded-full h-2.5">
                            <div className="bg-indigo-500 h-2.5 rounded-full" style={{width: `${((currentQuestionIndex + 1) / aptitudeQuiz.length) * 100}%`}}></div>
                        </div>
                    </header>
                    <div>
                        <h2 className="text-xl text-slate-300 mb-2">Question {currentQuestionIndex + 1} of {aptitudeQuiz.length}</h2>
                        <p className="text-2xl font-semibold text-white mb-6">{aptitudeQuiz[currentQuestionIndex].question}</p>
                        <div className="space-y-4">
                            {aptitudeQuiz[currentQuestionIndex].options.map((option, index) => (
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
                            {currentQuestionIndex === aptitudeQuiz.length - 1 ? 'Finish Quiz' : 'Next Question'}
                            </button>
                        </div>
                    </div>
                </div>
               )}
            </div>
        </div>
    );
};

export default AptitudePracticeView;
