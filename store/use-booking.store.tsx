import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { BookingFormType, Doctor } from '../types';

type Booking = BookingFormType & {
  doctor: Doctor;
  date: string;
};

interface BookingState {
  bookings: Record<string, Booking[]>;
  addBooking: (booking: Booking) => void;
  getBookingsByDate: (date: string) => Booking[];
  searchBookings: (query: string) => Booking[];
  highlightBooking: { date: string; doctor: Doctor; timeStart: string } | null;
  setHighlightBooking: (
    booking: { date: string; doctor: Doctor; timeStart: string } | null,
  ) => void;
  clearHighlightBooking: () => void;
}

export const useBookingStore = create<BookingState>()(
  persist(
    (set, get) => ({
      bookings: {},
      highlightBooking: null,

      setHighlightBooking: booking => set({ highlightBooking: booking }),
      clearHighlightBooking: () => set({ highlightBooking: null }),

      addBooking: booking => {
        set(state => {
          const dateKey = booking.date;
          const existingBookings = state.bookings[dateKey] || [];
          return {
            bookings: {
              ...state.bookings,
              [dateKey]: [...existingBookings, booking],
            },
          };
        });
      },

      getBookingsByDate: date => {
        return get().bookings[date] || [];
      },

      searchBookings: (query: string) => {
        const allBookings = Object.values(get().bookings).flat();
        const lowerQ = query.toLowerCase();
        return allBookings.filter(b =>
          b.patient.toLowerCase().includes(lowerQ),
        );
      },
    }),
    {
      name: 'booking-storage',
    },
  ),
);
