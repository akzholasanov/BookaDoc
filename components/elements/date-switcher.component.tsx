import { format } from 'date-fns';
import { enUS } from 'date-fns/locale';
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';

interface DateSwitcherProps {
  date: Date;
  setDate: (date: Date) => void;
}

export const DateSwitcher = ({ date, setDate }: DateSwitcherProps) => {
  return (
    <div className='flex flex-col gap-2 w-48'>
      <p className='text-2xl font-bold'>
        {format(date, 'eee, d MMMM', { locale: enUS })}
      </p>
      <div className='flex justify-between items-center border border-gray-200 rounded-md overflow-hidden'>
        <button
          onClick={() =>
            setDate(new Date(date.getTime() - 24 * 60 * 60 * 1000))
          }
          className='w-full hover:bg-gray-100 cursor-pointer'
        >
          <ArrowLeftOutlined />
        </button>
        <button
          onClick={() => setDate(new Date())}
          className='w-full border-x border-gray-200 !px-4 hover:bg-gray-100 cursor-pointer'
        >
          Today
        </button>
        <button
          onClick={() =>
            setDate(new Date(date.getTime() + 24 * 60 * 60 * 1000))
          }
          className='w-full hover:bg-gray-100 cursor-pointer'
        >
          <ArrowRightOutlined />
        </button>
      </div>
    </div>
  );
};
