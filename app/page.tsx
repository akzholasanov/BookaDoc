'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Progress, Typography } from 'antd';

const { Title } = Typography;

export default function SplashScreen() {
  const router = useRouter();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      current += 2;
      if (current > 100) current = 100;
      setProgress(current);
    }, 100);

    const timeout = setTimeout(() => {
      router.push('/dashboard');
    }, 5000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [router]);

  return (
    <div className='flex flex-col items-center justify-center h-screen bg-gray-900 text-white'>
      <Title
        level={1}
        className='mb-6'
        style={{ color: 'white', animation: 'fadeIn 1s ease-out forwards' }}
      >
        BookaDoc
      </Title>

      <div className='flex flex-col items-center justify-center'>
        <Progress
          percent={progress}
          strokeColor='#3b82f6'
          size={{ width: 100 }}
          showInfo={false}
          className='mb-4'
          status='active'
          type='line'
        />
        <p className='text-lg text-white'>{progress}%</p>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
