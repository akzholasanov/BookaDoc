'use client';

import React, { useState, useRef, useEffect } from 'react';
import { TIMES, DOCTORS } from '@/constants';
import { Doctor } from '@/types';
import { DoctorScroller } from '../elements';
import { TimeColumn } from '../elements';
import { ScheduleGrid } from '../elements';
import { BookingModal } from '../modals';

const COLUMN_WIDTH = 200;
const HEADER_HEIGHT = 56;
const BUTTONS_HEIGHT = 32;

interface CalendarGridProps {
  selectedDate: string;
}

export function CalendarGrid({ selectedDate }: CalendarGridProps) {
  const doctorsRef = useRef<HTMLDivElement | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);
  const timeRef = useRef<HTMLDivElement | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<{
    doctor: Doctor;
    time: string;
  } | null>(null);

  const isSyncing = useRef(false);

  const maxHeight = `calc(100vh - ${HEADER_HEIGHT}px - ${BUTTONS_HEIGHT}px)`;

  // Horizontal sync doctors <-> grid
  useEffect(() => {
    const d = doctorsRef.current;
    const g = gridRef.current;
    if (!d || !g) return;

    const onDoctorsScroll = () => {
      if (isSyncing.current) return;
      isSyncing.current = true;
      g.scrollLeft = d.scrollLeft;
      requestAnimationFrame(() => (isSyncing.current = false));
    };
    const onGridScroll = () => {
      if (isSyncing.current) return;
      isSyncing.current = true;
      d.scrollLeft = g.scrollLeft;
      requestAnimationFrame(() => (isSyncing.current = false));
    };

    d.addEventListener('scroll', onDoctorsScroll, { passive: true });
    g.addEventListener('scroll', onGridScroll, { passive: true });

    return () => {
      d.removeEventListener('scroll', onDoctorsScroll);
      g.removeEventListener('scroll', onGridScroll);
    };
  }, []);

  // Vertical sync time <-> grid
  useEffect(() => {
    const g = gridRef.current;
    const t = timeRef.current;
    if (!g || !t) return;

    const onGridScroll = () => {
      t.scrollTop = g.scrollTop;
    };
    const onTimeScroll = () => {
      g.scrollTop = t.scrollTop;
    };

    g.addEventListener('scroll', onGridScroll, { passive: true });
    t.addEventListener('scroll', onTimeScroll, { passive: true });

    return () => {
      g.removeEventListener('scroll', onGridScroll);
      t.removeEventListener('scroll', onTimeScroll);
    };
  }, []);

  const onCellClick = (doctor: Doctor, time: string) => {
    setSelectedSlot({ doctor, time });
    setIsModalOpen(true);
  };

  return (
    <div className='flex flex-col h-full w-full'>
      <DoctorScroller
        doctors={DOCTORS}
        columnWidth={COLUMN_WIDTH}
        doctorsRef={doctorsRef}
      />

      <div className='flex flex-1 border-t border-gray-300 overflow-hidden'>
        <TimeColumn
          times={TIMES}
          timeRef={timeRef}
          rowHeight={48}
          maxHeight={maxHeight}
        />
        <ScheduleGrid
          doctors={DOCTORS}
          times={TIMES}
          gridRef={gridRef}
          columnWidth={COLUMN_WIDTH}
          rowHeight={48}
          onCellClick={onCellClick}
          maxHeight={maxHeight}
          selectedDate={selectedDate}
        />
      </div>

      <BookingModal
        isModalOpen={isModalOpen}
        slot={selectedSlot}
        selectedDate={selectedDate}
        handleCancel={() => {
          setIsModalOpen(false);
          setSelectedSlot(null);
        }}
      />
    </div>
  );
}
