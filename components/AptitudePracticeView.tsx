import React from 'react';
import { BrainIcon } from './icons/BrainIcon';
import QuizView from './QuizView'; // Reusing QuizView for the UI
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
    // We can reuse the QuizView component but we need to handle the pass state locally
    const handlePassQuiz = () => {
        // In a real app, we might track aptitude scores separately
        console.log("Aptitude quiz passed/completed.");
    };

    return (
        <div className="animate-fade-in">
            <header className="mb-8">
                <div className="flex items-center gap-3">
                <BrainIcon className="w-8 h-8 text-amber-400" />
                <h1 className="text-4xl font-extrabold text-white">Aptitude Practice</h1>
                </div>
                <p className="text-slate-400 mt-2 text-lg">Test your logical reasoning and quantitative skills.</p>
            </header>

            {/* We wrap the QuizView to provide a consistent page structure */}
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 sm:p-8">
                <QuizView 
                    quiz={aptitudeQuiz} 
                    onPassQuiz={handlePassQuiz}
                    courseId="aptitude"
                    hasPassedQuiz={false} // This can be managed with a separate state if needed
                />
            </div>
        </div>
    );
};

export default AptitudePracticeView;