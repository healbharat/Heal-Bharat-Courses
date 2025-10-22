import React from 'react';
import { WarningIcon } from './icons/WarningIcon';

interface ScreenshotBlockerProps {
  onClose: () => void;
}

const ScreenshotBlocker: React.FC<ScreenshotBlockerProps> = ({ onClose }) => {
  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in"
      aria-modal="true"
      role="dialog"
    >
      <div
        className="bg-slate-800 border border-slate-700 rounded-2xl shadow-2xl w-full max-w-md p-8 text-center"
      >
        <div className="mx-auto mb-6 bg-amber-500/10 w-20 h-20 rounded-full flex items-center justify-center border-4 border-amber-500/20">
            <WarningIcon className="w-12 h-12 text-amber-400" />
        </div>
        
        <h1 className="text-2xl font-bold text-white mb-2">Action Blocked for Security</h1>
        <p className="text-slate-400 mb-6">
          Taking screenshots and copying content is disabled on this platform to protect intellectual property.
        </p>
        
        <button
          onClick={onClose}
          className="w-full mt-2 bg-teal-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-teal-600 transition duration-300 transform hover:scale-105"
        >
          I Understand
        </button>
      </div>
    </div>
  );
};

export default ScreenshotBlocker;
