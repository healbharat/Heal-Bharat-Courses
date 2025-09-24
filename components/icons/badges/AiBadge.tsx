import React from 'react';

export const AiBadge: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" {...props}>
    <g fill="none" strokeWidth="3">
      <circle cx="50" cy="50" r="45" stroke="#a78bfa" fill="#0f172a" />
      <path d="M50,20 C35,20 25,35 25,50 C25,65 35,80 50,80" stroke="#f0f9ff" />
      <path d="M50,20 C65,20 75,35 75,50 C75,65 65,80 50,80" stroke="#f0f9ff" />
      <path d="M28,35 H 72" stroke="#f0f9ff" />
      <path d="M28,65 H 72" stroke="#f0f9ff" />
      <path d="M50,20 V 80" stroke="#f0f9ff" />
      <circle cx="50" cy="50" r="8" fill="#a78bfa" stroke="#f0f9ff" />
    </g>
  </svg>
);
