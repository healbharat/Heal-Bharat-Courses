import React from 'react';

export const WebDevBadge: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" {...props}>
    <g fill="none" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M25,5 L75,5 L95,50 L75,95 L25,95 L5,50 Z" stroke="#06b6d4" fill="#0f172a" />
      <path d="M35 35 L25 50 L35 65" stroke="#f0f9ff" />
      <path d="M65 35 L75 50 L65 65" stroke="#f0f9ff" />
      <path d="M42 65 L58 35" stroke="#f0f9ff" />
    </g>
  </svg>
);
