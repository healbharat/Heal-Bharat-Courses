
import React, { useState, useRef, useEffect, useCallback } from 'react';
import type { CourseDay } from '../types';
import { ChallengeIcon } from './icons/ChallengeIcon';
import { NotesIcon } from './icons/NotesIcon';

interface CodeEditorProps {
  day: CourseDay;
}

// Add Prism to the window object for TypeScript
declare global {
    interface Window {
      Prism: {
        highlightElement: (element: Element) => void;
      };
    }
}

const defaultCode = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>My Project</title>
    <style>
        /* Add your CSS here */
        body {
            font-family: sans-serif;
            transition: background-color 0.3s, color 0.3s;
            padding: 2rem;
            background-color: #fff;
            color: #111;
        }

        body.dark-mode {
            background-color: #1a202c;
            color: #cbd5e0;
        }
    </style>
</head>
<body>
    <h1>My Awesome Page</h1>
    <p>Click the button to toggle the theme!</p>

    <button id="theme-switcher">Toggle Theme</button>

    <script>
        // Add your JavaScript here
        console.log("Script loaded!");
    </script>
</body>
</html>`;

interface ConsoleLog {
    level: 'log' | 'error' | 'warn';
    message: string;
    timestamp: string;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ day }) => {
  const [code, setCode] = useState(defaultCode);
  const [previewSrcDoc, setPreviewSrcDoc] = useState('');
  const [consoleLogs, setConsoleLogs] = useState<ConsoleLog[]>([]);
  const [activeTab, setActiveTab] = useState<'preview' | 'console'>('preview');
  
  const lineNumbersRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const preRef = useRef<HTMLPreElement>(null);
  const codeRef = useRef<HTMLElement>(null);

  // Effect to run syntax highlighting when code changes
  useEffect(() => {
    if (codeRef.current && window.Prism) {
        window.Prism.highlightElement(codeRef.current);
    }
  }, [code]);

  const handleMessage = useCallback((event: MessageEvent) => {
    if (event.source !== (document.querySelector('iframe') as HTMLIFrameElement)?.contentWindow) {
      return;
    }

    const { type, level, message } = event.data;
    if (type === 'console') {
        const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: "2-digit", second: "2-digit" });
        setConsoleLogs(prev => [...prev, { level, message, timestamp }]);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('message', handleMessage);
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [handleMessage]);

  const handleRunCode = () => {
    setActiveTab('preview');
    setConsoleLogs([]);

    const consoleHijackScript = `
      <script>
        const formatArg = (arg) => {
          if (typeof arg === 'object' && arg !== null) {
            try {
              return JSON.stringify(arg, null, 2);
            } catch (e) {
              return '[Unserializable Object]';
            }
          }
          return String(arg);
        };

        const originalLog = console.log;
        const originalError = console.error;
        const originalWarn = console.warn;

        console.log = (...args) => {
            window.parent.postMessage({ type: 'console', level: 'log', message: args.map(formatArg).join(' ') }, '*');
            originalLog.apply(console, args);
        };
        console.error = (...args) => {
            window.parent.postMessage({ type: 'console', level: 'error', message: args.map(formatArg).join(' ') }, '*');
            originalError.apply(console, args);
        };
        console.warn = (...args) => {
            window.parent.postMessage({ type: 'console', level: 'warn', message: args.map(formatArg).join(' ') }, '*');
            originalWarn.apply(console, args);
        };
      </script>
    `;

    const processedCode = code.replace('</head>', `${consoleHijackScript}</head>`);
    setPreviewSrcDoc(processedCode);
  };

  const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setCode(e.target.value);
  };

  const handleScroll = (e: React.UIEvent<HTMLTextAreaElement>) => {
      const { scrollTop, scrollLeft } = e.currentTarget;
      if (lineNumbersRef.current) {
          lineNumbersRef.current.scrollTop = scrollTop;
      }
      if (preRef.current) {
          preRef.current.scrollTop = scrollTop;
          preRef.current.scrollLeft = scrollLeft;
      }
  };

  const lineCount = code.split('\n').length;

  // A very simple markdown-to-html for the instructions
  const renderInstructions = (text: string) => {
    return text
      .split('\n')
      .map(line => {
        if (line.startsWith('### ')) return `<h3 class="text-xl font-semibold text-white mt-4">${line.substring(4)}</h3>`;
        if (line.match(/\d\.\s/)) return `<p class="pl-4">${line}</p>`
        if (line.startsWith('**')) return `<p><strong>${line.replace(/\*\*/g, '')}</strong></p>`;
        if (line.includes('`')) return `<p>${line.replace(/`([^`]+)`/g, '<code class="bg-slate-700 text-teal-300 rounded px-1.5 py-0.5 font-mono text-sm">$1</code>')}</p>`;
        if (line.trim() === '') return '<br />';
        return `<p>${line}</p>`;
      })
      .join('');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 min-h-[75vh]">
      {/* Instructions Panel */}
      <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 flex flex-col overflow-hidden lg:col-span-1 min-h-[50vh] lg:min-h-0">
        <div className="flex-1 overflow-y-auto pr-2">
            <h2 className="text-2xl font-bold flex items-center gap-3"><NotesIcon className="w-7 h-7 text-teal-400"/> Instructions</h2>
            <div className="prose prose-invert max-w-none text-slate-300 leading-relaxed mt-4" dangerouslySetInnerHTML={{ __html: renderInstructions(day.notes) }} />

            <h2 className="text-2xl font-bold flex items-center gap-3 mt-8"><ChallengeIcon className="w-7 h-7 text-teal-400"/> {day.challenge.title}</h2>
            <div className="prose prose-invert max-w-none text-slate-300 leading-relaxed mt-4" dangerouslySetInnerHTML={{ __html: renderInstructions(day.challenge.description) }} />
        </div>
      </div>

      {/* Editor & Preview Panel */}
      <div className="flex flex-col gap-4 overflow-hidden min-h-[75vh] lg:min-h-0 lg:col-span-2">
        <div className="flex-1 flex flex-col bg-[#0f172a] rounded-xl border border-slate-700 overflow-hidden">
          <div className="flex justify-between items-center p-2 bg-slate-800 border-b border-slate-700 flex-shrink-0">
            <h3 className="font-mono text-sm text-slate-400 px-2">Code Editor (index.html)</h3>
            <button
              onClick={handleRunCode}
              className="bg-teal-600 text-white font-semibold py-1 px-4 rounded-md hover:bg-teal-700 text-sm transition-colors"
            >
              Run Code
            </button>
          </div>
          <div className="flex-1 flex overflow-hidden">
            <div ref={lineNumbersRef} className="bg-slate-800 text-right p-4 text-slate-500 font-mono text-sm select-none overflow-y-hidden leading-relaxed">
                {Array.from({ length: lineCount }, (_, i) => i + 1).join('\n')}
            </div>
            <div className="relative flex-1">
                <textarea
                    ref={textareaRef}
                    value={code}
                    onChange={handleCodeChange}
                    onScroll={handleScroll}
                    onPaste={(e) => {
                        alert("Pasting is disabled to encourage practice!");
                        e.preventDefault();
                    }}
                    spellCheck="false"
                    className="absolute inset-0 w-full h-full p-4 font-mono text-sm leading-relaxed resize-none focus:outline-none bg-transparent text-transparent caret-white"
                    placeholder="Write your HTML, CSS, and JavaScript here..."
                />
                <pre ref={preRef} aria-hidden="true" className="absolute inset-0 w-full h-full p-4 font-mono text-sm leading-relaxed pointer-events-none overflow-auto prism-code">
                    <code ref={codeRef} className="language-html">
                        {code}
                    </code>
                </pre>
            </div>
          </div>
        </div>

        <div className="flex-1 flex flex-col bg-slate-900 rounded-xl border border-slate-700 overflow-hidden">
          <div className="bg-slate-800 border-b border-slate-700 flex-shrink-0 flex items-center">
            <button 
                onClick={() => setActiveTab('preview')}
                className={`font-mono text-sm px-4 py-2 ${activeTab === 'preview' ? 'bg-slate-700 text-white' : 'text-slate-400 hover:bg-slate-700/50'}`}
            >
                Live Preview
            </button>
            <button 
                onClick={() => setActiveTab('console')}
                className={`font-mono text-sm px-4 py-2 flex items-center gap-2 ${activeTab === 'console' ? 'bg-slate-700 text-white' : 'text-slate-400 hover:bg-slate-700/50'}`}
            >
                Console
                {consoleLogs.length > 0 && (
                    <span className="bg-teal-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">{consoleLogs.length}</span>
                )}
            </button>
          </div>
          <div className="flex-1 overflow-auto">
            {activeTab === 'preview' ? (
                <iframe
                    srcDoc={previewSrcDoc}
                    title="Live Preview"
                    sandbox="allow-scripts"
                    className="w-full h-full bg-white"
                />
            ) : (
                <div className="p-2 font-mono text-xs text-slate-300">
                    <button onClick={() => setConsoleLogs([])} className="text-slate-400 hover:text-white float-right text-xs mb-2">Clear</button>
                    {consoleLogs.length === 0 ? (
                        <p className="text-slate-500 p-2">Console is empty. Click "Run Code" to see output.</p>
                    ) : (
                        consoleLogs.map((log, index) => (
                            <div key={index} className={`flex items-start p-1.5 border-b border-slate-800 ${log.level === 'error' ? 'bg-red-500/10 text-red-400' : (log.level === 'warn' ? 'bg-yellow-500/10 text-yellow-400' : '')}`}>
                                <span className="text-slate-500 mr-2">{log.timestamp}</span>
                                <span className="whitespace-pre-wrap flex-1">{log.message}</span>
                            </div>
                        ))
                    )}
                </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;