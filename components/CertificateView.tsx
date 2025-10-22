import React, { useRef } from 'react';
import type { User } from '../types';
import { SealIcon } from './icons/SealIcon';
import { DownloadIcon } from './icons/DownloadIcon';
import { LinkedInIcon } from './icons/LinkedInIcon';

declare global {
  interface Window {
    html2canvas: any;
  }
}

interface CertificateViewProps {
  user: User;
}

const CertificateView: React.FC<CertificateViewProps> = ({ user }) => {
  const certificateRef = useRef<HTMLDivElement>(null);
  const completionDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const handleDownload = () => {
    if (certificateRef.current && window.html2canvas) {
        window.html2canvas(certificateRef.current, {
            scale: 2, // Higher scale for better quality
            backgroundColor: '#1e293b', // Match the certificate background
        }).then((canvas: HTMLCanvasElement) => {
            const link = document.createElement('a');
            link.download = 'Certificate_Python_AI_DS.png';
            link.href = canvas.toDataURL('image/png');
            link.click();
        });
    }
  };
  
  const handleShare = () => {
      const text = `I'm excited to share that I've completed the "Python with AI & Data Science" course on the AI Learning Platform! #Python #AI #DataScience #HealBharat #Learning`;
      const url = `https://www.linkedin.com/sharing/share-offsite/?summary=${encodeURIComponent(text)}`;
      window.open(url, '_blank', 'noopener,noreferrer');
  }

  return (
    <div className="animate-fade-in">
        <header className="mb-8 text-center">
            <h1 className="text-4xl font-extrabold text-white">Congratulations, {user.name}!</h1>
            <p className="text-slate-400 mt-2 text-lg">You have successfully completed the course. Here is your certificate.</p>
        </header>

        <div className="max-w-4xl mx-auto">
            <div
                ref={certificateRef}
                className="bg-slate-800 border-4 border-teal-500/50 p-8"
                style={{ fontFamily: "'EB Garamond', serif" }}
            >
                <div className="border-2 border-slate-600 p-8 text-center relative">
                    <div className="absolute top-4 left-4 w-16 h-16 bg-slate-700/50 rounded-full border-2 border-slate-600"></div>
                    <div className="absolute bottom-4 right-4 w-16 h-16 bg-slate-700/50 rounded-full border-2 border-slate-600"></div>

                    <p className="text-2xl text-slate-400 tracking-widest">CERTIFICATE OF COMPLETION</p>
                    <p className="text-lg text-slate-300 mt-8">This certificate is proudly presented to</p>
                    <p className="text-6xl text-white my-4" style={{ fontFamily: "'Caveat', cursive" }}>{user.name}</p>
                    <p className="text-lg text-slate-300">for successfully completing the</p>
                    <p className="text-3xl font-bold text-teal-400 my-3">Python with AI & Data Science</p>
                    <p className="text-lg text-slate-300">course on {completionDate}.</p>
                    
                    <div className="flex justify-center items-center mt-12 gap-16">
                        <div>
                            <p className="text-xl font-bold text-white">Heal Bharat</p>
                            <p className="text-sm text-slate-400 border-t border-slate-600 mt-1 pt-1">Initiative</p>
                        </div>
                        <SealIcon className="w-24 h-24 text-teal-500" />
                        <div>
                            <p className="text-xl font-bold text-white">AI Platform</p>
                             <p className="text-sm text-slate-400 border-t border-slate-600 mt-1 pt-1">Authorized</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-8 flex justify-center gap-4">
                <button
                    onClick={handleDownload}
                    className="inline-flex items-center gap-2 bg-teal-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-teal-700 transition duration-300"
                >
                    <DownloadIcon className="w-5 h-5" />
                    Download Certificate
                </button>
                <button
                    onClick={handleShare}
                    className="inline-flex items-center gap-2 bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition duration-300"
                >
                    <LinkedInIcon className="w-5 h-5" />
                    Share on LinkedIn
                </button>
            </div>
        </div>
    </div>
  );
};

export default CertificateView;