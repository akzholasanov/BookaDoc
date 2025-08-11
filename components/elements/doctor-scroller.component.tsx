'use client';

import React from 'react';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { DoctorCard } from './doctor-card.component';

interface DoctorsProps {
  doctors: { key: string; name: string; position: string }[];
  columnWidth: number;
  doctorsRef: React.RefObject<HTMLDivElement | null>;
}

export function DoctorScroller({
  doctors,
  columnWidth,
  doctorsRef,
}: DoctorsProps) {
  const scrollBy = (offset: number) => {
    if (!doctorsRef.current) return;
    doctorsRef.current.scrollBy({ left: offset, behavior: 'smooth' });
  };

  return (
    <div className='flex items-center w-auto' style={{ marginLeft: '35px' }}>
      <button
        onClick={() => scrollBy(-columnWidth)}
        className='!p-2 border rounded border-gray-200 hover:bg-gray-100 transition cursor-pointer'
        aria-label='Scroll doctors left'
        style={{ marginRight: '11px' }}
      >
        <LeftOutlined />
      </button>

      <div
        ref={doctorsRef}
        className='flex overflow-x-auto no-scrollbar scrollbar-hide'
        style={{ scrollSnapType: 'x mandatory' }}
      >
        {doctors.map((doctor, index) => (
          <div
            key={index}
            style={{
              scrollSnapAlign: 'start',
              flex: '0 0 auto',
              width: columnWidth,
            }}
          >
            <DoctorCard name={doctor.name} position={doctor.position} />
          </div>
        ))}
      </div>

      <button
        onClick={() => scrollBy(columnWidth)}
        className='!p-2 !m-2 border rounded border-gray-200 hover:bg-gray-100 transition cursor-pointer'
        aria-label='Scroll doctors right'
      >
        <RightOutlined />
      </button>
    </div>
  );
}
