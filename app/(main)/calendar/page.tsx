'use client';

import { Divider } from 'antd';
import { DateSwitcher } from '@/components/elements';
import { CalendarGrid } from '@/components/containers';
import { useBookingStore } from '@/store';
import { useState, useEffect } from 'react';

export default function Calendar() {
  const [date, setDate] = useState(new Date());
  const highlightBooking = useBookingStore(s => s.highlightBooking);
  const clearHighlightBooking = useBookingStore(s => s.clearHighlightBooking);

  useEffect(() => {
    if (
      highlightBooking &&
      highlightBooking.date !== date.toISOString().split('T')[0]
    ) {
      setDate(new Date(highlightBooking.date));
      clearHighlightBooking();
    }
  }, [highlightBooking, date, clearHighlightBooking]);

  return (
    <div className='flex flex-col border border-gray-200 rounded-xl !p-2 lg:!p-6'>
      <DateSwitcher date={date} setDate={setDate} />

      <Divider />

      <CalendarGrid selectedDate={date.toISOString().split('T')[0]} />
    </div>
  );
}
