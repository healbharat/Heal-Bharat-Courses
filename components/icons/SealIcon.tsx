import React from 'react';

export const SealIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <circle cx="12" cy="12" r="10" />
        <path d="m9 12 2 2 4-4" />
        <path d="M12 18.22A25.84 25.84 0 0 0 12 3.82" />
        <path d="M12 3.82A25.84 25.84 0 0 1 12 18.22" />
        <path d="M18.22 12A25.84 25.84 0 0 0 3.82 12" />
        <path d="M3.82 12A25.84 25.84 0 0 1 18.22 12" />
    </svg>
);
