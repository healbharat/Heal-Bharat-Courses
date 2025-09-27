import React, { useState, useCallback } from 'react';
import { MicIcon } from './icons/MicIcon';
import Spinner from './Spinner';
import { getInterviewQuestion } from '../services/geminiService';

const InterviewPracticeView: React.FC = () => {
  const [question, setQuestion] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isInterviewStarted, setIsInterviewStarted] = useState(false);

  const handleStartInterview = useCallback(async () => {
    setIsLoading(true);
    setError('');
    setQuestion('');
    try {
      const newQuestion = await getInterviewQuestion();
      setQuestion(newQuestion);
      setIsInterviewStarted(true);
    } catch (e: any) {
      setError('Failed to fetch an interview question. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="animate-fade-in">
      <header className="mb-8">
        <div className="flex items-center gap-3">
          <MicIcon className="w-8 h-8 text-indigo-400" />
          <h1 className="text-4xl font-extrabold text-white">Virtual Interview Practice</h1>
        </div>
        <p className="text-slate-400 mt-2 text-lg">Practice common behavioral questions and get ready for your next big interview.</p>
      </header>

      <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-8 min-h-[400px] flex flex-col items-center justify-center text-center">
        {!isInterviewStarted && !isLoading && (
          <>
            <div className="w-20 h-20 bg-indigo-500/10 rounded-full flex items-center justify-center mb-4">
              <MicIcon className="w-10 h-10 text-indigo-300" />
            </div>
            <h2 className="text-2xl font-bold text-white">Ready to start?</h2>
            <p className="text-slate-400 mt-2 mb-6">Click the button below to receive your first question from our AI interviewer.</p>
            <button
              onClick={handleStartInterview}
              disabled={isLoading}
              className="bg-indigo-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-indigo-700 transition duration-300 text-lg"
            >
              Start Interview
            </button>
          </>
        )}
        
        {isLoading && <Spinner />}

        {error && <p className="text-red-400">{error}</p>}
        
        {isInterviewStarted && question && (
          <div className="w-full animate-fade-in">
            <p className="text-sm font-semibold text-indigo-400">AI INTERVIEWER ASKS:</p>
            <p className="text-2xl font-semibold text-white my-6 leading-relaxed">"{question}"</p>
            <textarea
                placeholder="Compose your answer here... A good answer often follows the STAR method (Situation, Task, Action, Result)."
                className="w-full h-48 p-4 bg-slate-900 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
            ></textarea>
            <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={handleStartInterview}
                  disabled={isLoading}
                  className="bg-slate-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-slate-700 transition duration-300"
                >
                  Get New Question
                </button>
                 <button
                  className="bg-indigo-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-indigo-700 transition duration-300"
                >
                  Submit for Feedback (Coming Soon)
                </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InterviewPracticeView;