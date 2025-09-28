import React from 'react';
import { LaptopCodeIcon } from './icons/LaptopCodeIcon';
import { codingProblems } from '../data/codingProblems';
import { CheckCircleIcon } from './icons/CheckCircleIcon';

const problems = codingProblems; // Use problems from the central data file

const DifficultyChip: React.FC<{ difficulty: string }> = ({ difficulty }) => {
    const color = {
        'Easy': 'text-green-400 bg-green-500/10',
        'Medium': 'text-yellow-400 bg-yellow-500/10',
        'Hard': 'text-red-400 bg-red-500/10',
    }[difficulty] || 'text-slate-400 bg-slate-500/10';
    return <span className={`px-2 py-1 text-xs font-semibold rounded-full ${color}`}>{difficulty}</span>
};

interface CodingPracticeViewProps {
    onSolve: (problemId: number) => void;
    solvedProblems: Set<number>;
}

const CodingPracticeView: React.FC<CodingPracticeViewProps> = ({ onSolve, solvedProblems }) => {
  return (
    <div className="animate-fade-in">
      <header className="mb-8">
        <div className="flex items-center gap-3">
          <LaptopCodeIcon className="w-8 h-8 text-teal-400" />
          <h1 className="text-4xl font-extrabold text-white">Coding Practice</h1>
        </div>
        <p className="text-slate-400 mt-2 text-lg">Sharpen your problem-solving skills with our curated list of challenges.</p>
      </header>

      <div className="bg-slate-800/50 border border-slate-700 rounded-xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-800">
            <tr>
              <th className="p-4 text-sm font-semibold text-slate-300">Title</th>
              <th className="p-4 text-sm font-semibold text-slate-300 hidden md:table-cell">Category</th>
              <th className="p-4 text-sm font-semibold text-slate-300">Difficulty</th>
              <th className="p-4"></th>
            </tr>
          </thead>
          <tbody>
            {problems.map((problem, index) => (
              <tr key={problem.id} className={`border-t border-slate-700 ${index % 2 === 0 ? 'bg-slate-900/20' : ''}`}>
                <td className="p-4 font-medium text-white">
                  <div className="flex items-center gap-2">
                    {solvedProblems.has(problem.id) && <CheckCircleIcon className="w-5 h-5 text-green-400 flex-shrink-0" />}
                    <span>{problem.title}</span>
                  </div>
                </td>
                <td className="p-4 text-slate-400 hidden md:table-cell">{problem.category}</td>
                <td className="p-4"><DifficultyChip difficulty={problem.difficulty} /></td>
                <td className="p-4 text-right">
                    <button 
                        onClick={() => onSolve(problem.id)}
                        className="bg-teal-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-teal-700 transition text-sm">
                        Solve
                    </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CodingPracticeView;
