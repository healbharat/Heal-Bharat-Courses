import React from 'react';

export const NotesIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M8 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2h-3"></path>
        <rect x="8" y="3" width="8" height="4" rx="1" ry="1"></rect>
        <path d="M16 11.5h-8"></path>
        <path d="M16 15.5h-8"></path>
        <path d="M10 7.5h4"></path>
    </svg>
);