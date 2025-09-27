import React, { useRef, useState } from 'react';
import type { User, Course } from '../types';
import { SealIcon } from './icons/SealIcon';

// Add html2canvas to the window object for TypeScript compatibility
declare global {
  interface Window {
    html2canvas: (element: HTMLElement, options?: any) => Promise<HTMLCanvasElement>;
  }
}

interface CertificateViewProps {
  user: User;
  course: Course;
  onBack: () => void;
}

const CertificateView: React.FC<CertificateViewProps> = ({ user, course, onBack }) => {
  const certificateRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const completionDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  
  const handleDownload = async () => {
    if (!certificateRef.current) return;

    if (typeof window.html2canvas === 'undefined') {
        console.error("html2canvas is not loaded.");
        alert("Sorry, the download feature is currently unavailable. Please try again later.");
        return;
    }

    setIsDownloading(true);
    try {
        const canvas = await window.html2canvas(certificateRef.current, {
            scale: 2, // Double the resolution for better quality
        });
        const dataUrl = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = `Certificate_${course.title.replace(/\s+/g, '-')}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } catch (error) {
        console.error("Error downloading certificate:", error);
        alert("An error occurred while trying to download the certificate.");
    } finally {
        setIsDownloading(false);
    }
  };

  return (
    <div className="animate-fade-in flex flex-col items-center justify-center p-4">
      <div ref={certificateRef} className="bg-white text-gray-800 w-full max-w-4xl aspect-[1.414] p-8 md:p-12 rounded-lg shadow-2xl border-4 border-teal-500 relative overflow-hidden">
        <div className="absolute inset-0 border-8 border-slate-200 m-2 rounded"></div>
        <div className="relative z-10 flex flex-col h-full">

          <div className="text-center">
            <h1 className="text-2xl md:text-4xl font-serif font-bold text-slate-700 tracking-wider">
              Certificate of Completion
            </h1>
            <p className="mt-4 text-sm md:text-base text-slate-500">This certificate is proudly presented to</p>
          </div>
          
          <div className="flex-grow flex items-center justify-center">
            <h2 className="text-4xl md:text-7xl font-['Caveat',_cursive] text-teal-600 font-bold my-8 md:my-16">
              {user.name}
            </h2>
          </div>

          <div className="text-center">
            <p className="text-sm md:text-base text-slate-500">
              for successfully completing the
            </p>
            <h3 className="text-lg md:text-2xl font-semibold text-slate-800 mt-2">
              {course.title} Course
            </h3>
          </div>

          <div className="mt-auto flex justify-between items-end pt-8">
            <div className="text-left">
              <p className="text-xs md:text-sm font-semibold border-b border-slate-400 pb-1">{completionDate}</p>
              <p className="text-xs text-slate-500 mt-1">Date</p>
            </div>
            
            <div className="text-center">
                <SealIcon className="w-20 h-20 md:w-28 md:h-28 text-teal-600 mx-auto"/>
            </div>

            <div className="text-right">
              <p className="text-sm md:text-base font-bold font-serif text-teal-700 border-b border-slate-400 pb-1">AI Learning Platform</p>
              <p className="text-xs text-slate-500 mt-1">Issuing Organization</p>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8 flex flex-col sm:flex-row-reverse gap-4">
        <button 
            onClick={handleDownload}
            disabled={isDownloading}
            className="bg-teal-500 text-white font-bold py-3 px-8 rounded-lg hover:bg-teal-600 transition duration-300 disabled:bg-teal-800 disabled:cursor-not-allowed flex items-center justify-center min-w-[220px]"
        >
            {isDownloading ? (
                <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Downloading...
                </>
            ) : (
                'Download Certificate'
            )}
        </button>
        <button 
            onClick={onBack}
            className="bg-slate-700 text-white font-bold py-3 px-8 rounded-lg hover:bg-slate-600 transition duration-300"
        >
            Back to Courses
        </button>
      </div>
    </div>
  );
};

export default CertificateView;