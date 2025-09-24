import React from 'react';

export const DataBadge: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" {...props}>
    <g fill="none" strokeWidth="4">
      <rect x="5" y="5" width="90" height="90" rx="15" stroke="#fb923c" fill="#0f172a" />
      <rect x="25" y="60" width="10" height="20" fill="#fb923c" />
      <rect x="45" y="40" width="10" height="40" fill="#fb923c" />
      <rect x="65" y="20" width="10" height="60" fill="#fb923c" />
    </g>
  </svg>
);
