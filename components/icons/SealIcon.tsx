import React from 'react';

export const SealIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" {...props}>
        <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="3"/>
        <circle cx="50" cy="50" r="42" fill="none" stroke="currentColor" strokeWidth="1"/>
        <path d="M50 15 L55 35 L75 35 L60 48 L65 68 L50 55 L35 68 L40 48 L25 35 L45 35 Z" fill="currentColor"/>
    </svg>
);
