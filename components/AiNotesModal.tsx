import React from 'react';
import Spinner from './Spinner';

interface AiNotesModalProps {
  isOpen: boolean;
  isLoading: boolean;
  onClose: () => void;
  courseTitle: string | null;
  notesContent: string;
}

const ContentRenderer: React.FC<{ content: string }> = ({ content }) => {
    const createMarkup = () => {
      const html = content
        // Bold **text**
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        // Bulleted lists * item
        .replace(/^\* (.*$)/gm, '<ul class="list-disc list-inside ml-4"><li>$1</li></ul>')
        // Collapse multiple <ul> tags
        .replace(/<\/ul>\s?<ul>/g, '')
        // Convert newlines to breaks
        .replace(/\n/g, '<br />');
      
      return { __html: html };
    };
  
    return <div className="prose prose-invert max-w-none text-slate-300 leading-relaxed space-y-4" dangerouslySetInnerHTML={createMarkup()} />;
};

const AiNotesModal: React.FC<AiNotesModalProps> = ({ isOpen, isLoading, onClose, courseTitle, notesContent }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div
        className="bg-slate-800 border border-slate-700 rounded-2xl shadow-2xl w-full max-w-2xl p-8 relative max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors text-3xl leading-none">&times;</button>
        
        <header className="mb-6 border-b border-slate-700 pb-4">
          <h2 className="text-sm font-semibold text-teal-400 uppercase tracking-wider">AI Generated Notes</h2>
          <h1 className="text-2xl font-bold text-white mt-1">{courseTitle || 'Loading...'}</h1>
        </header>

        <div className="flex-1 overflow-y-auto pr-2">
          {isLoading ? (
            <div className="flex items-center justify-center h-48">
              <div className="text-center">
                 <Spinner />
                 <p className="text-slate-400 mt-4">Generating your notes...</p>
              </div>
            </div>
          ) : (
            <ContentRenderer content={notesContent} />
          )}
        </div>
      </div>
    </div>
  );
};

export default AiNotesModal;