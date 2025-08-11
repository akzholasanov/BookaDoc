'use client';

import React from 'react';

interface TimeColumnProps {
  times: string[];
  timeRef: React.RefObject<HTMLDivElement | null>;
  rowHeight?: number;
  maxHeight?: string;
}

export function TimeColumn({
  times,
  timeRef,
  maxHeight,
  rowHeight = 48,
}: TimeColumnProps) {
  return (
    <div
      ref={timeRef}
      className='w-20 select-none border-r border-gray-300 overflow-y-auto'
      style={{ maxHeight, boxSizing: 'border-box' }}
    >
      {times.map(t => (
        <div
          key={t}
          className='flex items-center justify-center text-xs text-gray-500 border-b border-gray-300'
          style={{ height: rowHeight }}
        >
          {t}
        </div>
      ))}
    </div>
  );
}
