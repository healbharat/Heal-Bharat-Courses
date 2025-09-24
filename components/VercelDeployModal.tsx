
import React, { useState } from 'react';
import { GitHubIcon } from './icons/GitHubIcon';
import { LinkIcon } from './icons/LinkIcon';
import { ChevronDownIcon } from './icons/ChevronDownIcon';
import { TriangleIcon } from './icons/TriangleIcon';

interface VercelDeployModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const VercelDeployModal: React.FC<VercelDeployModalProps> = ({ isOpen, onClose }) => {
  const [envVars, setEnvVars] = useState([
    { id: 1, key: 'EXAMPLE_NAME', value: 'I9JU23NF394R6HH' },
  ]);

  const addEnvVar = () => {
    setEnvVars([...envVars, { id: Date.now(), key: '', value: '' }]);
  };

  const removeEnvVar = (id: number) => {
    setEnvVars(envVars.filter(v => v.id !== id));
  };

  const handleEnvVarChange = (id: number, field: 'key' | 'value', val: string) => {
    setEnvVars(envVars.map(v => v.id === id ? { ...v, [field]: val } : v));
  };
  
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/80 flex justify-center items-start p-4 sm:p-8 z-50 animate-fade-in overflow-y-auto"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div 
        className="bg-black text-slate-300 w-full max-w-3xl my-8"
        onClick={e => e.stopPropagation()}
      >
        <header className="mb-10">
          <h1 className="text-4xl font-bold text-white">New Project</h1>
        </header>

        <main className="space-y-8">
          {/* GitHub Import Section */}
          <div className="border border-slate-800 rounded-lg p-6 bg-[#0B0B0B]">
            <p className="text-sm text-slate-400 mb-2">Importing from GitHub</p>
            <div className="flex items-center gap-3 text-white font-medium">
              <GitHubIcon className="w-5 h-5" />
              <span>healbharat/Heal-Bharat-Courses</span>
              <LinkIcon className="w-4 h-4 text-slate-500" />
              <span className="text-slate-400">main</span>
            </div>
          </div>
          
          {/* Project Name Section */}
          <div className="space-y-4">
            <h2 className="text-white font-medium">Choose where you want to create the project and give it a name.</h2>
            <div className="flex flex-col sm:flex-row items-center border border-slate-800 rounded-lg bg-[#111]">
              <div className="w-full sm:w-auto p-4 flex items-center gap-3 border-b sm:border-b-0 sm:border-r border-slate-800">
                 <div className="w-6 h-6 rounded-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500"></div>
                 <span className="text-white font-medium">Heal Bharat's projects</span>
                 <span className="text-xs font-semibold bg-slate-700 text-slate-300 px-2 py-1 rounded-md">Hobby</span>
                 <ChevronDownIcon className="w-5 h-5 text-slate-400" />
              </div>
              <span className="text-2xl text-slate-700 hidden sm:block">/</span>
              <div className="flex-1 p-4 w-full">
                <label htmlFor="projectName" className="text-sm text-slate-400 mb-1 block">Project Name</label>
                <input type="text" id="projectName" defaultValue="heal-bharat-courses-nmzk" className="w-full bg-transparent text-white focus:outline-none" />
              </div>
            </div>
          </div>

          {/* Framework Preset Section */}
          <div className="space-y-2">
            <label className="text-sm text-slate-400">Framework Preset</label>
            <div className="flex items-center justify-between p-3 border border-slate-800 rounded-lg bg-[#111]">
                <div className="flex items-center gap-3">
                    <TriangleIcon className="w-5 h-5 text-slate-400" />
                    <span className="text-white">Other</span>
                </div>
                <ChevronDownIcon className="w-5 h-5 text-slate-400" />
            </div>
          </div>

          {/* Root Directory Section */}
          <div className="space-y-2">
             <label className="text-sm text-slate-400">Root Directory</label>
             <div className="flex items-center p-3 border border-slate-800 rounded-lg bg-[#111]">
                <span className="text-white flex-1 font-mono">./</span>
                <button className="text-sm bg-slate-800 hover:bg-slate-700 text-white font-medium py-1 px-3 rounded-md transition-colors">Edit</button>
             </div>
          </div>

          {/* Collapsible Sections */}
          <div className="space-y-4">
            <details className="border border-slate-800 rounded-lg bg-[#111]">
                <summary className="p-3 cursor-pointer flex items-center justify-between text-white font-medium">
                    Build and Output Settings
                    <ChevronDownIcon className="w-5 h-5 text-slate-400" />
                </summary>
                <div className="p-4 border-t border-slate-800 text-slate-400">
                    Configuration options will appear here.
                </div>
            </details>
            <details open className="border border-slate-800 rounded-lg bg-[#111]">
                <summary className="p-3 cursor-pointer flex items-center justify-between text-white font-medium">
                    Environment Variables
                    <ChevronDownIcon className="w-5 h-5 text-slate-400" />
                </summary>
                <div className="p-4 border-t border-slate-800 space-y-3">
                    {envVars.map((v, index) => (
                      <div key={v.id} className="flex items-center gap-2">
                        <div className="flex-1">
                          {index === 0 && <label className="text-xs text-slate-500 mb-1 block">Key</label>}
                          <input 
                            type="text" 
                            placeholder="Key" 
                            value={v.key}
                            onChange={(e) => handleEnvVarChange(v.id, 'key', e.target.value)}
                            className="w-full bg-[#0B0B0B] border border-slate-700 rounded-md p-2 text-white font-mono focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>
                        <div className="flex-1">
                          {index === 0 && <label className="text-xs text-slate-500 mb-1 block">Value</label>}
                          <input 
                            type="text" 
                            placeholder="Value" 
                            value={v.value}
                            onChange={(e) => handleEnvVarChange(v.id, 'value', e.target.value)}
                            className="w-full bg-[#0B0B0B] border border-slate-700 rounded-md p-2 text-white font-mono focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>
                        <button onClick={() => removeEnvVar(v.id)} className="p-2.5 mt-auto bg-transparent border border-slate-700 rounded-md text-slate-400 hover:bg-slate-800">-</button>
                      </div>
                    ))}
                    <button onClick={addEnvVar} className="text-sm bg-slate-800 hover:bg-slate-700 text-white font-medium py-2 px-4 rounded-md transition-colors">+ Add More</button>
                    <p className="text-sm text-slate-500 mt-4">
                        Tip: Paste an .env above to populate the form. <a href="#" className="text-blue-400 hover:underline">Learn more</a>
                    </p>
                </div>
            </details>
          </div>

          <footer className="pt-4 border-t border-slate-800 flex justify-end">
            <button 
                onClick={onClose}
                className="bg-white text-black font-bold py-2 px-6 rounded-lg hover:bg-slate-200 transition-colors"
            >
                Deploy
            </button>
          </footer>
        </main>
      </div>
    </div>
  );
};

export default VercelDeployModal;
