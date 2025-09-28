import React, { useState, useRef, useEffect } from 'react';
import type { CodingProblem } from '../types';
import { CheckCircleIcon } from './icons/CheckCircleIcon';
import { XCircleIcon } from './icons/XCircleIcon';
import Spinner from './Spinner';

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
  onProblemSolved: (problemId: number, difficulty: 'Easy' | 'Medium' | 'Hard') => void;
}

interface TestResult {
  inputText: string;
  output: string;
  actualOutput: string;
  status: 'Accepted' | 'Wrong Answer' | 'Runtime Error';
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

const CodingSolverView: React.FC<CodingSolverViewProps> = ({ problem, onBack, onProblemSolved }) => {
    const [code, setCode] = useState(problem.starterCode);
    const [activeTab, setActiveTab] = useState<'tests' | 'console'>('tests');
    const [testResults, setTestResults] = useState<TestResult[] | null>(null);
    const [consoleOutput, setConsoleOutput] = useState<string[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'success' | 'fail'>('idle');

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
    
    const runCodeForAllTestCases = (userCode: string): { results: TestResult[], logs: string[] } => {
        const logs: string[] = [];
        const capturedConsoleLog = (...args: any[]) => {
            logs.push(args.map(arg => typeof arg === 'object' ? JSON.stringify(arg) : String(arg)).join(' '));
        };

        const results = problem.examples.map(example => {
            try {
                // This is a simplified and somewhat unsafe runner for demo purposes.
                // A production environment should use a sandboxed web worker or backend service.
                const codeToRun = `
                    const console = { log: capturedConsoleLog };
                    ${userCode};
                    return ${problem.functionName}(...JSON.parse('${JSON.stringify(example.input)}'));
                `;

                let result = new Function(codeToRun)();
                
                // Special handling for array results that can be in any order for specific problems (like Two Sum)
                // And for problems that modify arrays in-place (like Reverse String)
                if (problem.id === 2) { // Reverse String
                    // The function modifies the input array, so we check that.
                    // We need to create a copy for the runner.
                    let inputCopy = JSON.parse(JSON.stringify(example.input));
                    const inPlaceRunner = `
                        const console = { log: capturedConsoleLog };
                        ${userCode};
                        let s = ${JSON.stringify(inputCopy[0])};
                        ${problem.functionName}(s);
                        return s;
                    `;
                    result = new Function(inPlaceRunner)();
                }

                if (Array.isArray(result) && problem.id === 1) {
                    result.sort((a,b) => a - b);
                }

                const actualOutput = JSON.stringify(result ?? 'undefined');
                
                // In-place modification check
                let expectedOutput = example.output;

                // FIX: Explicitly type the `status` variable to prevent it from being widened to `string`.
                const status: TestResult['status'] = actualOutput === expectedOutput ? 'Accepted' : 'Wrong Answer';
                
                return { inputText: example.inputText, output: expectedOutput, actualOutput, status };

            } catch (e: any) {
                const status: TestResult['status'] = 'Runtime Error';
                return { inputText: example.inputText, output: example.output, actualOutput: `Error: ${e.message}`, status };
            }
        });
        
        return { results, logs };
    };

    const handleRunOrSubmit = (isSubmit: boolean) => {
        setIsSubmitting(true);
        setSubmissionStatus('idle');
        setTestResults(null);
        setConsoleOutput([]);

        // Simulate a short delay
        setTimeout(() => {
            const { results, logs } = runCodeForAllTestCases(code);
            setTestResults(results);
            setConsoleOutput(logs.length > 0 ? logs : ["No console output."]);
            setActiveTab('tests');
            
            if(isSubmit) {
                const allPassed = results.every(r => r.status === 'Accepted');
                if (allPassed) {
                    setSubmissionStatus('success');
                    onProblemSolved(problem.id, problem.difficulty);
                } else {
                    setSubmissionStatus('fail');
                }
            }
            setIsSubmitting(false);
        }, 500);
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
                                <p><strong className="text-slate-400">Input:</strong> {ex.inputText}</p>
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
                        <div className="flex-shrink-0 bg-slate-800 border-b border-slate-700 flex items-center justify-between">
                            <div className="flex items-center">
                                <button onClick={() => setActiveTab('tests')} className={`font-mono text-sm px-4 py-2 ${activeTab === 'tests' ? 'bg-slate-700 text-white' : 'text-slate-400 hover:bg-slate-700/50'}`}>Test Cases</button>
                                <button onClick={() => setActiveTab('console')} className={`font-mono text-sm px-4 py-2 ${activeTab === 'console' ? 'bg-slate-700 text-white' : 'text-slate-400 hover:bg-slate-700/50'}`}>Console</button>
                            </div>
                            {submissionStatus === 'success' && <div className="px-4 text-green-400 font-bold text-sm animate-pulse">Solution Accepted!</div>}
                            {submissionStatus === 'fail' && <div className="px-4 text-red-400 font-bold text-sm">Solution Failed</div>}
                        </div>
                        <div className="flex-1 overflow-y-auto p-2 font-mono text-xs">
                           {isSubmitting && <div className="flex items-center justify-center h-full"><Spinner /></div>}
                           {!isSubmitting && activeTab === 'tests' && (
                            <div className="space-y-2 p-2">
                                {!testResults && <p className="text-slate-400">Run or submit code to see test case results.</p>}
                                {testResults?.map((result, i) => (
                                    <div key={i} className="bg-slate-900/50 p-2 rounded">
                                        <div className="flex items-center gap-2 mb-1">
                                            {result.status === 'Accepted' ? <CheckCircleIcon className="w-4 h-4 text-green-400"/> : <XCircleIcon className="w-4 h-4 text-red-400"/>}
                                            <span className={`font-bold ${result.status === 'Accepted' ? 'text-green-400' : 'text-red-400'}`}>{result.status}</span>
                                            <span className="text-slate-300 font-semibold ml-auto">Case {i+1}</span>
                                        </div>
                                        <div className="pl-6 text-slate-400">
                                            <p><strong className="text-slate-300">Input:</strong> {result.inputText}</p>
                                            <p><strong className="text-slate-300">Expected:</strong> {result.output}</p>
                                            <p><strong className="text-slate-300">Output:</strong> <span className={result.status !== 'Accepted' ? 'text-red-400' : 'text-green-400'}>{result.actualOutput}</span></p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                           )}
                           {!isSubmitting && activeTab === 'console' && (
                             <div className="p-2">
                                {consoleOutput.map((line, i) => <pre key={i} className="whitespace-pre-wrap border-b border-slate-700/50 pb-1 mb-1">{line}</pre>)}
                             </div>
                           )}
                        </div>
                    </div>
                     <div className="flex justify-end gap-4 flex-shrink-0">
                        <button onClick={() => handleRunOrSubmit(false)} disabled={isSubmitting} className="bg-slate-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-slate-700 transition disabled:bg-slate-700/50 disabled:cursor-not-allowed">Run Code</button>
                        <button onClick={() => handleRunOrSubmit(true)} disabled={isSubmitting} className="bg-green-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-green-700 transition disabled:bg-green-700/50 disabled:cursor-not-allowed">Submit</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CodingSolverView;