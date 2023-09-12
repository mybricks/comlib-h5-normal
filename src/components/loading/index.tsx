import React, { CSSProperties } from 'react';
import css from './style.less';

interface LoadingProps {
  className?: string;
  style?: CSSProperties;
  color?: string;
}

export default function Loading({ className, style, color }: LoadingProps) {
  return (
    <div className={`${css.loading} ${className ? className : ''}`} style={style}>
      <svg viewBox="0 0 80 80">
        <path
          strokeDasharray="160"
          strokeLinecap="round"
          d="M40 40l8.201-8.201c4.53-4.53 11.873-4.53 16.402 0A11.598 11.598 0 0 1 68 40c0 6.405-5.193 11.598-11.598 11.598a11.598 11.598 0 0 1-8.201-3.397L40 40l-8.201-8.201c-4.53-4.53-11.873-4.53-16.402 0A11.598 11.598 0 0 0 12 40c0 6.405 5.193 11.598 11.598 11.598 3.076 0 6.026-1.222 8.201-3.397L40 40z"
          strokeWidth="7"
          stroke={color}
          fill="none"
          fillRule="evenodd"
        />
      </svg>
    </div>
  );
}
