import React from 'react';
import { BriefcaseIcon } from './icons/BriefcaseIcon';

const InternshipView: React.FC = () => {
  return (
    <div className="animate-fade-in">
      <header className="mb-8">
        <div className="flex items-center gap-3">
          <BriefcaseIcon className="w-8 h-8 text-green-400" />
          <h1 className="text-4xl font-extrabold text-white">Internship Portal</h1>
        </div>
        <p className="text-slate-400 mt-2 text-lg">Your journey to a real-world project starts here.</p>
      </header>
      
      <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-8 text-center">
          <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mb-4 mx-auto">
            <BriefcaseIcon className="w-10 h-10 text-green-300" />
          </div>
          <h2 className="text-3xl font-bold text-white">Apply for Your Internship!</h2>
          <p className="text-slate-300 mt-4 max-w-2xl mx-auto">To proceed with your internship placement and receive your real-time project assignment, please complete the application form.</p>

          <div className="mt-8">
              <a 
                  href="https://forms.gle/Druvya4VmWhCcJot8"
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block bg-teal-500 text-white font-bold py-4 px-10 rounded-lg hover:bg-teal-600 transition duration-300 transform hover:scale-105 text-lg"
              >
                  Fill Internship Application Form
              </a>
              <p className="mt-4 text-sm text-slate-400">You will be redirected to a Google Form to provide your details.</p>
          </div>
      </div>
    </div>
  );
};

export default InternshipView;