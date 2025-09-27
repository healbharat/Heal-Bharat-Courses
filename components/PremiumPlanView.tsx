import React from 'react';
import type { User } from '../types';
import { CheckCircleIcon } from './icons/CheckCircleIcon';
import { LaptopCodeIcon } from './icons/LaptopCodeIcon';
import { MicIcon } from './icons/MicIcon';
import { BrainIcon } from './icons/BrainIcon';
import { BriefcaseIcon } from './icons/BriefcaseIcon';

interface PremiumPlanProps {
  onSubscribe: () => void;
  user: User;
}

const features = [
  { icon: LaptopCodeIcon, text: "Special Coding Assessments" },
  { icon: MicIcon, text: "Virtual Interview Practice" },
  { icon: BrainIcon, text: "Aptitude & Logic Tests" },
  { icon: BriefcaseIcon, text: "Guaranteed Internship on Real-Time Projects" },
  { icon: CheckCircleIcon, text: "6-Month Full Access to All Courses" },
];

const PremiumPlanView: React.FC<PremiumPlanProps> = ({ onSubscribe, user }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 p-4">
      <div className="w-full max-w-2xl">
        <div className="bg-slate-800 border border-slate-700 rounded-2xl shadow-2xl p-8 text-center animate-fade-in">
          <div className="mx-auto mb-6 bg-gradient-to-br from-teal-500 to-indigo-600 w-20 h-20 rounded-full flex items-center justify-center">
            <BriefcaseIcon className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Unlock Your Future</h1>
          <p className="text-slate-400 mb-8">
            Welcome, {user.name}! Take the next step with our Internship Kickstarter Plan.
          </p>
          
          <div className="bg-slate-900/50 p-6 rounded-lg border border-slate-700 text-left mb-8">
            <h2 className="text-lg font-semibold text-white mb-4">Plan Benefits:</h2>
            <ul className="space-y-3">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center gap-3">
                  <feature.icon className="w-5 h-5 text-teal-400 flex-shrink-0" />
                  <span className="text-slate-300">{feature.text}</span>
                </li>
              ))}
            </ul>
          </div>

          <p className="text-slate-300 text-lg">One-time payment for lifetime access to practice tools and your internship placement.</p>
          <p className="text-5xl font-extrabold text-white my-4">₹499</p>

          <button
            onClick={onSubscribe}
            className="w-full mt-4 bg-teal-500 text-white font-bold py-4 px-4 rounded-lg hover:bg-teal-600 transition duration-300 transform hover:scale-105 text-lg"
          >
            Join Now & Start Your Internship Journey
          </button>
        </div>
      </div>
    </div>
  );
};

export default PremiumPlanView;