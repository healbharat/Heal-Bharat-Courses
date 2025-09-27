import React from 'react';
import FlipCard from './FlipCard';

interface ContentRendererProps {
  markdown: string;
}

const parseMarkdown = (text: string): string => {
    let html = text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  
    // Code blocks (```...```)
    html = html.replace(/```(\w*)\n([\s\S]*?)```/g, (_match, lang, code) => {
      const language = lang || 'plaintext';
      const escapedCode = code.replace(/</g, '&lt;').replace(/>/g, '&gt;');
      return `<pre class="bg-slate-900 rounded-md p-4 overflow-x-auto my-4 text-sm font-mono relative border border-slate-700"><div class="absolute top-2 right-3 text-xs text-slate-500 uppercase">${language}</div><code class="language-${language}">${escapedCode.trim()}</code></pre>`;
    });

    // Headings (###, ##, #)
    html = html.replace(/^### (.*$)/gim, '<h3 class="text-xl font-bold mt-6 mb-2 text-white">$1</h3>');
    html = html.replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold mt-8 mb-3 border-b border-slate-700 pb-2 text-white">$1</h2>');

    // Bold (**...**)
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-white">$1</strong>');
  
    // Inline code (`...`)
    html = html.replace(/`([^`]+)`/g, '<code class="bg-slate-700 text-teal-300 rounded px-1.5 py-0.5 font-mono text-sm">$1</code>');
  
    // Unordered lists (* or -)
    html = html.replace(/^\s*([*-]) (.*(?:\n(?!^\s*[*-]).*)*)/gm, '<li>$2</li>');
    html = html.replace(/((?:<li>.*<\/li>\s*)+)/g, (match) => {
      if (!match.startsWith('<ul>')) {
        return `<ul class="list-disc list-inside space-y-2 my-4">${match.trim()}</ul>`;
      }
      return match;
    });

    // Replace paragraphs (sequences of non-empty lines)
    html = html.split(/\n\s*\n/).map(paragraph => {
      if (paragraph.startsWith('<') || paragraph.trim() === '') {
        return paragraph;
      }
      return `<p>${paragraph.replace(/\n/g, '<br/>')}</p>`;
    }).join('');
    
    html = html.replace(/<p><br\/><\/p>/g, '');
    
    return html;
};

const ContentRenderer: React.FC<ContentRendererProps> = ({ markdown }) => {
  // Regex to find the custom [FLIPCARD] tag and split the string by it
  const parts = markdown.split(/(\[FLIPCARD front=".*?" back=".*?"\])/g);

  return (
    <>
      {parts.map((part, index) => {
        // Check if the part is a FLIPCARD tag
        const match = part.match(/\[FLIPCARD front="(.*?)" back="(.*?)"\]/);
        
        if (match) {
          const [, front, back] = match;
          return <FlipCard key={index} frontContent={front} backContent={back} />;
        } else if (part.trim()) {
          // Otherwise, it's regular markdown text
          return <div key={index} dangerouslySetInnerHTML={{ __html: parseMarkdown(part) }} />;
        }
        return null;
      })}
    </>
  );
};

export default ContentRenderer;
