import { Avatar } from 'antd';

interface DoctorCardProps {
  avatar?: string;
  name: string;
  position: string;
}

export const DoctorCard = ({ avatar, name, position }: DoctorCardProps) => {
  return (
    <div className='flex gap-4 items-start'>
      {avatar ? (
        <Avatar src={avatar} />
      ) : (
        <Avatar style={{ backgroundColor: '#87d068' }}>
          {name.charAt(0).toUpperCase()}
        </Avatar>
      )}
      <span className='flex flex-col gap-1'>
        <p className='font-bold'>{name}</p>
        <p className='text-gray-500'>{position}</p>
      </span>
    </div>
  );
};
