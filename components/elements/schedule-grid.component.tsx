'use client';

import React, { useEffect, useState } from 'react';
import { Popover } from 'antd';

import { Doctor } from '@/types';
import { useBookingStore } from '@/store';
import { DOCTOR_COLORS } from '@/constants';

interface ScheduleGridProps {
  times: string[];
  doctors: Doctor[];
  selectedDate: string;
  columnWidth: number;
  rowHeight?: number;
  maxHeight?: string;
  gridRef: React.RefObject<HTMLDivElement | null>;
  onCellClick?: (doctor: Doctor, time: string) => void;
}

export function ScheduleGrid({
  doctors,
  times,
  gridRef,
  columnWidth,
  rowHeight = 48,
  onCellClick,
  maxHeight,
  selectedDate,
}: ScheduleGridProps) {
  const getBookingsByDate = useBookingStore(state => state.getBookingsByDate);
  const highlightBooking = useBookingStore(s => s.highlightBooking);
  const [highlightedId, setHighlightedId] = useState<string | null>(null);

  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!highlightBooking) return;

    if (highlightBooking.date === selectedDate) {
      const el = document.querySelector(
        `[data-booking-id="${highlightBooking.doctor.key}-${highlightBooking.timeStart}"]`,
      ) as HTMLElement;

      if (el) {
        el.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
          inline: 'center',
        });
        setHighlightedId(
          `${highlightBooking.doctor.key}-${highlightBooking.timeStart}`,
        );

        const timer = setTimeout(() => setHighlightedId(null), 3000);
        return () => clearTimeout(timer);
      }
    }
  }, [highlightBooking, selectedDate]);

  const bookings = isMounted ? getBookingsByDate(selectedDate) : [];

  console.log(highlightBooking, 'highlightBooking');

  return (
    <div
      ref={gridRef}
      className='flex-1 flex overflow-auto scrollbar-hide relative'
      style={{ maxHeight, scrollSnapType: 'x mandatory' }}
    >
      {doctors.map(doc => (
        <div
          key={doc.key}
          className='flex-shrink-0 relative'
          style={{
            minWidth: columnWidth,
            width: columnWidth,
          }}
        >
          {times.map(time => (
            <div
              key={time}
              className='h-12 border-b border-r border-gray-300 cursor-pointer hover:bg-blue-50'
              style={{ height: rowHeight, scrollSnapAlign: 'start' }}
              onClick={() => onCellClick?.(doc, time)}
            />
          ))}

          {bookings
            .filter(b => b.doctor?.key === doc.key)
            .map((b, idx) => {
              const startIndex = times.indexOf(b.timeStart);
              const endIndex = times.indexOf(b.timeEnd);
              if (startIndex === -1 || endIndex === -1) return null;

              const top = startIndex * rowHeight;
              const height = (endIndex - startIndex + 1) * rowHeight;

              return (
                <Popover
                  key={idx}
                  content={
                    <div>
                      <div>Patient: {b.patient}</div>
                      <div>Phone: {b.phone}</div>
                      <div>Doctor: {b.doctor.name}</div>
                      <div>Status: {b.status}</div>
                      <div>Type: {b.type}</div>
                      <div>Comment: {b.comment}</div>
                      <div>
                        {b.timeStart} — {b.timeEnd}
                      </div>
                    </div>
                  }
                  placement='top'
                >
                  <div
                    data-booking-id={`${doc.key}-${b.timeStart}`}
                    className={`absolute left-0 right-0 rounded p-1 text-xs overflow-hidden cursor-pointer
    ${highlightedId === doc.key ? 'animate-highlight' : ''}`}
                    style={{
                      top,
                      height,
                      backgroundColor: 'rgba(255, 255, 255, 0.8)',
                      border: `2px solid ${DOCTOR_COLORS[doc.key]}`,
                      display: 'flex',
                    }}
                  >
                    <div
                      style={{
                        width: 4,
                        height: '100%',
                        backgroundColor: DOCTOR_COLORS[doc.key],
                        marginRight: 4,
                        paddingTop: 4,
                      }}
                    />
                    <div style={{ flex: 1 }}>
                      <strong>{b.patient}</strong>
                      <div>{b.type}</div>
                    </div>
                  </div>
                </Popover>
              );
            })}
        </div>
      ))}
    </div>
  );
}
