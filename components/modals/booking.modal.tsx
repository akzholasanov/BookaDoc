import { Modal } from 'antd';

import { Doctor } from '@/types';
import { useBookingStore } from '@/store';

import { BookingForm } from '../form';

interface BookingModalProps {
  isModalOpen: boolean;
  selectedDate: string;
  slot: { doctor: Doctor; time: string } | null;
  handleCancel: () => void;
}

export const BookingModal = ({
  isModalOpen,
  slot,
  selectedDate,
  handleCancel,
}: BookingModalProps) => {
  const addBooking = useBookingStore(state => state.addBooking);

  if (!slot) return null;

  const initialValues = {
    timeStart: slot.time,
    timeEnd: slot.time,
  };

  return (
    <Modal
      title='Booking appointment'
      closable={{ 'aria-label': 'Custom Close Button' }}
      open={isModalOpen}
      onCancel={handleCancel}
      footer={null}
    >
      <BookingForm
        initialValues={initialValues}
        onSubmit={values => {
          addBooking({
            ...values,
            doctor: slot.doctor,
            date: selectedDate,
          });
          handleCancel();
        }}
      />
    </Modal>
  );
};
