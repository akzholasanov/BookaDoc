'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button, Layout, Menu, theme, Input } from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  CalendarOutlined,
  DashboardOutlined,
  CloseOutlined,
} from '@ant-design/icons';
import { useBookingStore } from '@/store';

const { Search } = Input;
const { Header, Sider, Content } = Layout;

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobile, setIsMobile] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const pathname = usePathname();

  const searchBookings = useBookingStore(s => s.searchBookings);
  const setHighlightBooking = useBookingStore(s => s.setHighlightBooking);

  useEffect(() => {
    setIsMounted(true);
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const onSearch = (value: string) => {
    if (!value.trim()) {
      setHighlightBooking(null);
      return;
    }

    const results = searchBookings(value);
    if (results.length > 0) {
      const b = results[0];
      setHighlightBooking({
        date: b.date,
        doctor: b.doctor,
        timeStart: b.timeStart,
      });
    } else {
      setHighlightBooking(null);
    }
  };

  if (!isMounted) return null;

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        collapsedWidth={isMobile ? 0 : 80}
        width={isMobile ? '100vw' : 200}
        style={{
          position: 'fixed',
          zIndex: isMobile ? 2000 : undefined,
          height: '100vh',
          left: collapsed ? (isMobile ? '-100vw' : 0) : 0,
          top: 0,
          bottom: 0,
          transition: 'left 0.3s ease',
          background: '#001529',
        }}
      >
        <div className='flex items-center justify-between !p-6 !mb-6 relative'>
          <p
            className={`font-bold text-white transition-all duration-200 flex-1 text-center ${
              collapsed ? 'text-sm' : 'text-lg'
            }`}
          >
            BookaDoc
          </p>
          {isMobile && (
            <Button
              type='text'
              icon={<CloseOutlined style={{ color: 'white' }} />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: '16px',
                width: 40,
                height: 40,
                position: 'absolute',
                right: 16,
                top: 16,
              }}
            />
          )}
        </div>
        <Menu
          theme='dark'
          mode='inline'
          selectedKeys={[pathname]}
          items={[
            {
              key: '/dashboard',
              icon: <DashboardOutlined />,
              label: <Link href='/dashboard'>Dashboard</Link>,
            },
            {
              key: '/calendar',
              icon: <CalendarOutlined />,
              label: <Link href='/calendar'>Calendar</Link>,
            },
          ]}
        />
      </Sider>

      <Layout style={{ marginLeft: collapsed ? (isMobile ? 0 : 80) : 200 }}>
        <Header
          style={{
            position: 'fixed',
            top: 0,
            left: collapsed ? (isMobile ? 0 : 80) : 200,
            right: 0,
            zIndex: 10,
            padding: '0 20px 0 0',
            background: colorBgContainer,
            transition: 'left 0.2s',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Button
            type='text'
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 60,
              height: 60,
            }}
          />
          <Search
            placeholder='Search'
            allowClear
            enterButton
            size='middle'
            onSearch={onSearch}
            className='!w-[70%] md:!w-[20%]'
          />
        </Header>

        <Content
          style={{
            marginTop: 64,
            minHeight: 'calc(100vh - 64px)',
            overflowY: 'auto',
            background: colorBgContainer,
          }}
          className='!p-4 lg:!p-6'
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}
