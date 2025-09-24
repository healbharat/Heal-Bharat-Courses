import React from 'react';

export const SecurityBadge: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" {...props}>
    <g fill="none" strokeWidth="4">
      <path d="M50 5 L95 25 L95 60 C 95 80, 50 95, 50 95 C 50 95, 5 80, 5 60 L 5 25 Z" stroke="#34d399" fill="#0f172a" />
      <path d="M35 50 L48 63 L65 42" stroke="#f0f9ff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="5" />
    </g>
  </svg>
);
