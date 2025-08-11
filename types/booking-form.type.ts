export type BookingFormType = {
  patient: string;
  phone: string;
  status: 'arrived' | 'not-arrived' | 'canceled';
  type: 'treatment' | 'checkup';
  comment?: string;
  timeStart: string;
  timeEnd: string;
};
