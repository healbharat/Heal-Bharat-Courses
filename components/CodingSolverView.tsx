import React, { useState, useRef, useEffect } from 'react';
import type { CodingProblem } from '../types';

// Add Prism to the window object for TypeScript
declare global {
    interface Window {
      Prism: {
        highlightElement: (element: Element) => void;
      };
    }
}

interface CodingSolverViewProps {
  problem: CodingProblem;
  onBack: () => void;
}

const parseMarkdown = (text: string): string => {
    let html = text.replace(/`([^`]+)`/g, '<code class="bg-slate-700 text-teal-300 rounded px-1.5 py-0.5 font-mono text-sm">$1</code>');
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-white">$1</strong>');
    return html.split('\n').map(p => p ? `<p>${p}</p>` : '<br/>').join('');
};

const DifficultyChip: React.FC<{ difficulty: string }> = ({ difficulty }) => {
    const color = {
        'Easy': 'text-green-400 bg-green-500/10 border border-green-500/20',
        'Medium': 'text-yellow-400 bg-yellow-500/10 border border-yellow-500/20',
        'Hard': 'text-red-400 bg-red-500/10 border border-red-500/20',
    }[difficulty] || 'text-slate-400 bg-slate-500/10';
    return <span className={`px-2 py-1 text-xs font-semibold rounded-full ${color}`}>{difficulty}</span>
};


const CodingSolverView: React.FC<CodingSolverViewProps> = ({ problem, onBack }) => {
    const [code, setCode] = useState(problem.starterCode);
    const [output, setOutput] = useState<string[]>(['Click "Run Code" to see the output.']);
    const [activeTab, setActiveTab] = useState<'console' | 'tests'>('console');
    
    const codeRef = useRef<HTMLElement>(null);
    const preRef = useRef<HTMLPreElement>(null);

    useEffect(() => {
        if (codeRef.current && window.Prism) {
            window.Prism.highlightElement(codeRef.current);
        }
    }, [code]);

    const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setCode(e.target.value);
    };
    
    const handleScroll = (e: React.UIEvent<HTMLTextAreaElement>) => {
        const { scrollTop, scrollLeft } = e.currentTarget;
        if (preRef.current) {
            preRef.current.scrollTop = scrollTop;
            preRef.current.scrollLeft = scrollLeft;
        }
    };

    const handleRunCode = () => {
        setOutput(['Running code...']);
        setActiveTab('console');
        try {
            // WARNING: This uses new Function() which can be a security risk.
            // This is for demonstration in a controlled frontend environment.
            // A real implementation would use a sandboxed environment or a backend service.
            const logs: any[] = [];
            const capturedConsoleLog = (...args: any[]) => {
                const formattedArgs = args.map(arg => {
                    if (typeof arg === 'object' && arg !== null) {
                        return JSON.stringify(arg, null, 2);
                    }
                    return String(arg);
                });
                logs.push(formattedArgs.join(' '));
            };

            const functionBody = `
                const console = { log: capturedConsoleLog };
                ${code}
                
                // Example test case - a real runner would be more robust and dynamic
                try {
                    if (typeof twoSum === 'function') {
                      const result = twoSum([2, 7, 11, 15], 9);
                      console.log('Test Case 1 ([2,7,11,15], 9) Result:', result);
                    } else {
                       console.log("Function 'twoSum' not found. Make sure your function is named correctly.");
                    }
                } catch(e) {
                  console.log('Error running test case:', e.message);
                }
            `;
            
            new Function(functionBody)();

            if (logs.length > 0) {
                setOutput(logs);
            } else {
                setOutput(['Code executed. No output to console.']);
            }

        } catch (e: any) {
            setOutput([`Error: ${e.message}`]);
        }
    };
    
    const handleSubmit = () => {
      alert('Solution submitted! (This is a demo feature)');
    };

    return (
        <div className="animate-fade-in flex flex-col" style={{ height: 'calc(100vh - 120px)'}}>
            <header className="flex items-center justify-between mb-4 flex-shrink-0">
                <button onClick={onBack} className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
                    Back to Problems
                </button>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-1 min-h-0">
                {/* Left Panel: Problem Description */}
                <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 overflow-y-auto">
                    <div className="flex items-center gap-3 mb-4">
                        <h1 className="text-2xl font-bold text-white">{problem.title}</h1>
                        <DifficultyChip difficulty={problem.difficulty} />
                    </div>
                    <div className="prose prose-invert max-w-none text-slate-300 leading-relaxed space-y-4" dangerouslySetInnerHTML={{ __html: parseMarkdown(problem.description) }} />
                    
                    {problem.examples.map((ex, index) => (
                        <div key={index} className="mt-6 bg-slate-900/50 p-4 rounded-lg border border-slate-700">
                            <h3 className="font-semibold text-white">Example {index + 1}:</h3>
                            <div className="mt-2 text-sm font-mono bg-slate-800 p-3 rounded-md">
                                <p><strong className="text-slate-400">Input:</strong> {ex.input}</p>
                                <p><strong className="text-slate-400">Output:</strong> {ex.output}</p>
                                {ex.explanation && <p><strong className="text-slate-400">Explanation:</strong> {ex.explanation}</p>}
                            </div>
                        </div>
                    ))}
                </div>
                
                {/* Right Panel: Code Editor & Output */}
                <div className="flex flex-col gap-4 min-h-0">
                    <div className="flex-1 flex flex-col bg-[#0f172a] rounded-xl border border-slate-700 overflow-hidden">
                        <div className="flex-shrink-0 bg-slate-800 p-2 border-b border-slate-700">
                            <h3 className="font-mono text-sm text-slate-400">JavaScript</h3>
                        </div>
                        <div className="relative flex-1">
                             <textarea
                                value={code}
                                onChange={handleCodeChange}
                                onScroll={handleScroll}
                                spellCheck="false"
                                className="absolute inset-0 w-full h-full p-4 font-mono text-sm leading-relaxed resize-none focus:outline-none bg-transparent text-transparent caret-white z-10"
                            />
                            <pre ref={preRef} aria-hidden="true" className="absolute inset-0 w-full h-full p-4 font-mono text-sm leading-relaxed pointer-events-none overflow-auto prism-code">
                                <code ref={codeRef} className="language-javascript">
                                    {code}
                                </code>
                            </pre>
                        </div>
                    </div>
                    <div className="h-48 flex flex-col bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
                        <div className="flex-shrink-0 bg-slate-800 border-b border-slate-700 flex items-center">
                            <button onClick={() => setActiveTab('console')} className={`font-mono text-sm px-4 py-2 ${activeTab === 'console' ? 'bg-slate-700 text-white' : 'text-slate-400 hover:bg-slate-700/50'}`}>Console</button>
                        </div>
                        <div className="flex-1 overflow-y-auto p-2 font-mono text-xs text-slate-300">
                            {output.map((line, index) => (
                                <pre key={index} className={`whitespace-pre-wrap p-1 border-b border-slate-700/50 ${line.toLowerCase().includes('error') ? 'text-red-400' : ''}`}>{line}</pre>
                            ))}
                        </div>
                    </div>
                     <div className="flex justify-end gap-4 flex-shrink-0">
                        <button onClick={handleRunCode} className="bg-slate-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-slate-700 transition">Run Code</button>
                        <button onClick={handleSubmit} className="bg-green-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-green-700 transition">Submit</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CodingSolverView;
