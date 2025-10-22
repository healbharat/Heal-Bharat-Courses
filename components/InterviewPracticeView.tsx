import React, { useState, useEffect, useCallback } from 'react';
import { MicIcon } from './icons/MicIcon';
import { CheckCircleIcon } from './icons/CheckCircleIcon';
import { XCircleIcon } from './icons/XCircleIcon';

// Mock data for the assessment
const mcqQuestions = [
  {
    question: "What is the output of the following code snippet?",
    code: `const x = 0;
function foo() {
  const x = 1;
  console.log(x);
}
foo();
console.log(x);`,
    options: ["1, 0", "0, 1", "1, 1", "0, 0"],
    correctAnswer: "1, 0",
  },
  {
    question: "Which of these is NOT a valid JavaScript data type?",
    code: null,
    options: ["string", "number", "character", "boolean"],
    correctAnswer: "character",
  },
  {
    question: "What does the 'this' keyword refer to in an arrow function?",
    code: null,
    options: ["The object that called the function", "The global window object", "The enclosing lexical scope's 'this' value", "It is always undefined"],
    correctAnswer: "The enclosing lexical scope's 'this' value",
  },
  {
    question: "Which method is used to add a new element to the end of an array?",
    code: `const arr = [1, 2, 3];`,
    options: ["arr.add(4)", "arr.push(4)", "arr.append(4)", "arr.concat(4)"],
    correctAnswer: "arr.push(4)",
  },
  {
    question: "What will `console.log(!!'hello')` output?",
    code: null,
    options: ["true", "false", "NaN", "undefined"],
    correctAnswer: "true",
  },
];

const programmingProblem1 = {
    title: "Find the Missing Number",
    description: "Given an array `nums` containing `n` distinct numbers in the range `[0, n]`, return the only number in the range that is missing from the array.",
    starterCode: `function findMissingNumber(nums) {\n  // Write your code here\n}`
};

const programmingProblem2 = {
    title: "FizzBuzz",
    description: "Write a program that prints the numbers from 1 to 100. But for multiples of three print “Fizz” instead of the number and for the multiples of five print “Buzz”. For numbers which are multiples of both three and five print “FizzBuzz”.",
    starterCode: `function fizzBuzz() {\n  // Write your code here\n}`
};


const CodeBlock: React.FC<{ code: string }> = ({ code }) => (
    <pre className="bg-slate-900/70 p-4 rounded-md my-4 border border-slate-700">
        <code className="text-sm text-slate-300 font-mono whitespace-pre-wrap">{code}</code>
    </pre>
);

const TestResultsView: React.FC<{ score: number; total: number; onRestart: () => void; mcqAnswers: (string | null)[]; }> = ({ score, total, onRestart, mcqAnswers }) => {
    const percentage = total > 0 ? Math.round((score / total) * 100) : 0;
    return (
        <div className="animate-fade-in p-8 flex-1 overflow-y-auto">
            <div className="max-w-3xl mx-auto">
                <header className="text-center">
                    <h1 className="text-3xl md:text-4xl font-extrabold text-white">Assessment Complete!</h1>
                    <div className="mt-8 bg-slate-800/50 p-8 rounded-xl border border-slate-700">
                        <p className="text-2xl text-slate-300">Your MCQ Score:</p>
                        <p className="text-6xl md:text-7xl font-bold text-teal-400 my-4">{percentage}%</p>
                        <p className="text-xl text-slate-300">You answered {score} out of {total} questions correctly.</p>
                    </div>
                </header>

                <div className="mt-8 text-left">
                    <h3 className="text-xl font-bold text-white mb-4">MCQ Review:</h3>
                    <ul className="space-y-2">
                        {mcqQuestions.map((q, index) => {
                            const userAnswer = mcqAnswers[index];
                            const isCorrect = userAnswer === q.correctAnswer;
                            return (
                                <li key={index} className={`p-3 rounded-md flex items-start gap-3 ${isCorrect ? 'bg-green-500/10' : 'bg-red-500/10'}`}>
                                    {isCorrect ? <CheckCircleIcon className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" /> : <XCircleIcon className="w-5 h-5 text-red-400 mt-1 flex-shrink-0" />}
                                    <div>
                                        <p className="font-semibold text-slate-200">{q.question}</p>
                                        <p className="text-sm text-slate-400">Your answer: {userAnswer || 'Not Answered'}</p>
                                        {!isCorrect && <p className="text-sm text-green-400">Correct answer: {q.correctAnswer}</p>}
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                </div>

                <div className="text-center">
                    <button onClick={onRestart} className="mt-8 bg-indigo-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-indigo-700 transition duration-300">
                        Try Again
                    </button>
                </div>
            </div>
        </div>
    );
};

const InterviewPracticeView: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState(30 * 60); // 30 minutes in seconds
  const [activeTab, setActiveTab] = useState<'mcq' | 'prog1' | 'prog2'>('mcq');
  const [currentMcqIndex, setCurrentMcqIndex] = useState(0);
  const [mcqAnswers, setMcqAnswers] = useState<(string | null)[]>(Array(mcqQuestions.length).fill(null));
  const [progCode1, setProgCode1] = useState(programmingProblem1.starterCode);
  const [progCode2, setProgCode2] = useState(programmingProblem2.starterCode);
  const [isTestFinished, setIsTestFinished] = useState(false);
  const [score, setScore] = useState(0);

  const handleSubmitTest = useCallback(() => {
    let finalScore = 0;
    mcqAnswers.forEach((answer, index) => {
        if (answer === mcqQuestions[index].correctAnswer) {
            finalScore++;
        }
    });
    setScore(finalScore);
    setIsTestFinished(true);
    setTimeLeft(0);
  }, [mcqAnswers]);

  useEffect(() => {
    if (isTestFinished) return;
    if (timeLeft <= 0) {
        handleSubmitTest();
        return;
    };
    const timer = setInterval(() => {
      setTimeLeft(prevTime => prevTime - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft, isTestFinished, handleSubmitTest]);
  
  const handleRestartTest = useCallback(() => {
    setIsTestFinished(false);
    setScore(0);
    setTimeLeft(30 * 60);
    setActiveTab('mcq');
    setCurrentMcqIndex(0);
    setMcqAnswers(Array(mcqQuestions.length).fill(null));
    setProgCode1(programmingProblem1.starterCode);
    setProgCode2(programmingProblem2.starterCode);
  }, []);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };
  
  const handleAnswerSelect = (option: string) => {
    setMcqAnswers(prev => {
        const newAnswers = [...prev];
        newAnswers[currentMcqIndex] = option;
        return newAnswers;
    });
  };

  const handleNextMcq = () => {
    if (currentMcqIndex < mcqQuestions.length - 1) {
        setCurrentMcqIndex(prev => prev + 1);
    }
  };
  
  const handlePrevMcq = () => {
    if (currentMcqIndex > 0) {
        setCurrentMcqIndex(prev => prev - 1);
    }
  };

  const renderContent = () => {
    switch(activeTab) {
        case 'mcq':
            const question = mcqQuestions[currentMcqIndex];
            return (
                <div>
                    <p className="font-semibold text-slate-300 mb-4">Question {currentMcqIndex + 1}/{mcqQuestions.length}</p>
                    <h3 className="text-lg text-white font-medium">{question.question}</h3>
                    {question.code && <CodeBlock code={question.code} />}
                    <div className="space-y-3 mt-6">
                        {question.options.map((option, idx) => (
                             <label key={idx} className={`flex items-center p-3 rounded-md border-2 cursor-pointer transition-all ${mcqAnswers[currentMcqIndex] === option ? 'bg-indigo-500/20 border-indigo-500' : 'bg-slate-800 border-slate-700 hover:border-slate-600'}`}>
                                <input 
                                    type="radio"
                                    name={`question-${currentMcqIndex}`}
                                    value={option}
                                    checked={mcqAnswers[currentMcqIndex] === option}
                                    onChange={() => handleAnswerSelect(option)}
                                    className="w-4 h-4 text-indigo-600 bg-gray-700 border-gray-600 focus:ring-indigo-600 ring-offset-gray-800 focus:ring-2"
                                />
                                <span className="ml-3 text-slate-300">{String.fromCharCode(65 + idx)}. {option}</span>
                            </label>
                        ))}
                    </div>
                    <div className="flex justify-between mt-8">
                        <button onClick={handlePrevMcq} disabled={currentMcqIndex === 0} className="bg-slate-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-slate-700 transition disabled:bg-slate-700/50 disabled:cursor-not-allowed">Previous</button>
                        <button onClick={handleNextMcq} disabled={currentMcqIndex === mcqQuestions.length - 1} className="bg-slate-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-slate-700 transition disabled:bg-slate-700/50 disabled:cursor-not-allowed">Next</button>
                    </div>
                </div>
            );
        case 'prog1':
            return (
                 <div>
                    <h3 className="text-lg text-white font-medium mb-2">{programmingProblem1.title}</h3>
                    <p className="text-slate-400 mb-4">{programmingProblem1.description}</p>
                    <textarea value={progCode1} onChange={e => setProgCode1(e.target.value)} className="w-full h-80 bg-slate-900/70 p-4 rounded-md border border-slate-700 text-sm text-slate-300 font-mono resize-none focus:outline-none focus:ring-2 focus:ring-teal-500"></textarea>
                 </div>
            );
        case 'prog2':
            return (
                 <div>
                    <h3 className="text-lg text-white font-medium mb-2">{programmingProblem2.title}</h3>
                    <p className="text-slate-400 mb-4">{programmingProblem2.description}</p>
                    <textarea value={progCode2} onChange={e => setProgCode2(e.target.value)} className="w-full h-80 bg-slate-900/70 p-4 rounded-md border border-slate-700 text-sm text-slate-300 font-mono resize-none focus:outline-none focus:ring-2 focus:ring-teal-500"></textarea>
                 </div>
            );
        default: return null;
    }
  }

  return (
    <div className="animate-fade-in flex flex-col h-full">
        {isTestFinished ? (
            <TestResultsView score={score} total={mcqQuestions.length} onRestart={handleRestartTest} mcqAnswers={mcqAnswers} />
        ) : (
            <>
                <header className="mb-8 flex-shrink-0">
                    <div className="flex items-center gap-3">
                    <MicIcon className="w-8 h-8 text-indigo-400" />
                    <h1 className="text-4xl font-extrabold text-white">Company Technical Assessment</h1>
                    </div>
                    <p className="text-slate-400 mt-2 text-lg">Practice with a real company's technical assessment format to prepare for your interviews.</p>
                </header>

                <div className="flex-1 bg-slate-800/50 border border-slate-700 rounded-xl flex flex-col">
                    {/* Top Bar */}
                    <div className="flex justify-between items-center p-3 border-b border-slate-700 bg-slate-800/60 rounded-t-xl">
                        <h2 className="text-lg font-bold text-white">Technical Assessment</h2>
                        <div className="flex items-center gap-4">
                            <span className="text-lg font-mono font-bold text-yellow-400 bg-yellow-500/10 px-3 py-1 rounded-md">{formatTime(timeLeft)}</span>
                            <button onClick={handleSubmitTest} className="bg-red-600/80 text-white font-semibold text-sm py-2 px-4 rounded-lg hover:bg-red-700/80 transition">End Test</button>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-3 min-h-0">
                        {/* Left Panel */}
                        <div className="md:col-span-2 flex flex-col min-h-0">
                            <div className="flex-shrink-0 border-b border-slate-700">
                                <button onClick={() => setActiveTab('mcq')} className={`px-4 py-3 font-semibold text-sm transition-colors ${activeTab === 'mcq' ? 'border-b-2 border-teal-400 text-white' : 'text-slate-400 hover:text-white'}`}>MCQ</button>
                                <button onClick={() => setActiveTab('prog1')} className={`px-4 py-3 font-semibold text-sm transition-colors ${activeTab === 'prog1' ? 'border-b-2 border-teal-400 text-white' : 'text-slate-400 hover:text-white'}`}>Programming 1</button>
                                <button onClick={() => setActiveTab('prog2')} className={`px-4 py-3 font-semibold text-sm transition-colors ${activeTab === 'prog2' ? 'border-b-2 border-teal-400 text-white' : 'text-slate-400 hover:text-white'}`}>Programming 2</button>
                            </div>
                            <div className="flex-1 overflow-y-auto p-6">
                                {renderContent()}
                            </div>
                        </div>

                        {/* Right Panel */}
                        <div className="md:col-span-1 bg-slate-900/40 border-l border-slate-700 p-6 flex flex-col">
                            <h3 className="text-lg font-bold text-white mb-4">Question Palette</h3>
                            <div className="grid grid-cols-4 gap-3">
                                {mcqQuestions.map((_, index) => (
                                    <button 
                                        key={index} 
                                        onClick={() => { setActiveTab('mcq'); setCurrentMcqIndex(index); }}
                                        className={`w-12 h-12 flex items-center justify-center font-bold text-white rounded-full transition-transform hover:scale-110 ${mcqAnswers[index] ? 'bg-green-600' : 'bg-red-600'}`}>
                                        {index + 1}
                                    </button>
                                ))}
                            </div>
                            <div className="mt-auto space-y-2 text-sm">
                                <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 rounded-full bg-green-600"></div>
                                    <span className="text-slate-400">Answered</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 rounded-full bg-red-600"></div>
                                    <span className="text-slate-400">Not Answered</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Bottom Bar */}
                    <div className="flex justify-end p-3 border-t border-slate-700 bg-slate-800/60 rounded-b-xl">
                        <button onClick={handleSubmitTest} className="bg-teal-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-teal-700 transition">Submit Test</button>
                    </div>
                </div>
            </>
        )}
    </div>
  );
};

export default InterviewPracticeView;