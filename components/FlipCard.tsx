import React from 'react';

interface FlipCardProps {
  frontContent: React.ReactNode;
  backContent: React.ReactNode;
}

const FlipCard: React.FC<FlipCardProps> = ({ frontContent, backContent }) => {
  return (
    <div className="group my-4 h-48 [perspective:1000px]">
      <div className="relative h-full w-full rounded-xl shadow-xl transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
        {/* Front */}
        <div className="absolute inset-0 bg-slate-800 border border-slate-700 rounded-xl flex flex-col items-center justify-center p-4">
          <h3 className="text-xl font-bold text-teal-400">{frontContent}</h3>
          <p className="text-sm text-slate-400 mt-2">(Hover to reveal)</p>
        </div>
        
        {/* Back */}
        <div className="absolute inset-0 bg-teal-900/50 border border-teal-700 rounded-xl p-6 text-center flex items-center justify-center [transform:rotateY(180deg)] [backface-visibility:hidden]">
          <p className="text-slate-200">{backContent}</p>
        </div>
      </div>
    </div>
  );
};

export default FlipCard;
