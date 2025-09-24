import React from 'react';

export const PythonBadge: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" {...props}>
    <g transform="translate(0, 5)">
      <path d="M50 5 a 20 20 0 0 1 0 40 H 40 a 10 10 0 0 1 0 -20 H 60 a 10 10 0 0 0 0 -20 H 50" fill="#4b8bbe" />
      <path d="M50 90 a 20 20 0 0 0 0 -40 H 60 a 10 10 0 0 0 0 20 H 40 a 10 10 0 0 1 0 20 H 50" fill="#ffd43b" />
      <circle cx="45" cy="20" r="4" fill="white" />
      <circle cx="55" cy="75" r="4" fill="white" />
    </g>
  </svg>
);
