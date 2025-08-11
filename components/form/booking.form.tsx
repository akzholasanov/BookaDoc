import React from 'react';
import { Form, Input, Select } from 'antd';

import { TIMES } from '@/constants';
import { BookingFormType } from '@/types';

const { Option } = Select;

interface BookingFormProps {
  initialValues?: Partial<BookingFormType>;
  onSubmit: (values: BookingFormType) => void;
}

export const BookingForm: React.FC<BookingFormProps> = ({
  initialValues,
  onSubmit,
}) => {
  const [form] = Form.useForm<BookingFormType>();

  return (
    <Form
      form={form}
      layout='vertical'
      initialValues={initialValues}
      onFinish={onSubmit}
    >
      <Form.Item
        name='patient'
        label='Patient'
        rules={[{ required: true, message: 'Enter patient name' }]}
      >
        <Input placeholder='Patient name' />
      </Form.Item>

      <Form.Item
        name='phone'
        label='Phone'
        rules={[{ required: true, message: 'Enter phone number' }]}
      >
        <Input placeholder='+996 (___) ___-__-__' />
      </Form.Item>

      <Form.Item
        name='status'
        label='Status'
        rules={[{ required: true, message: 'Select status' }]}
      >
        <Select placeholder='Select status'>
          <Option value='arrived'>Arrived</Option>
          <Option value='not-arrived'>Not Arrived</Option>
          <Option value='canceled'>Canceled</Option>
        </Select>
      </Form.Item>

      <Form.Item
        name='type'
        label='Type'
        rules={[{ required: true, message: 'Select type' }]}
      >
        <Select placeholder='Select type'>
          <Option value='treatment'>Treatment</Option>
          <Option value='checkup'>Checkup</Option>
        </Select>
      </Form.Item>

      <Form.Item
        name='timeStart'
        label='Start time'
        rules={[{ required: true, message: 'Select start time' }]}
      >
        <Select>
          {TIMES.map(t => (
            <Option key={t} value={t}>
              {t}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        name='timeEnd'
        label='End time'
        rules={[{ required: true, message: 'Select end time' }]}
      >
        <Select>
          {TIMES.map(t => (
            <Option key={t} value={t}>
              {t}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item name='comment' label='Comment'>
        <Input.TextArea
          placeholder='Additional information'
          autoSize={{ minRows: 3, maxRows: 5 }}
        />
      </Form.Item>

      <Form.Item name='timeStart' hidden>
        <Input type='hidden' />
      </Form.Item>
      <Form.Item name='timeEnd' hidden>
        <Input type='hidden' />
      </Form.Item>

      <Form.Item>
        <button
          type='submit'
          className='!px-4 !py-2 bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer transition'
        >
          Save
        </button>
      </Form.Item>
    </Form>
  );
};
