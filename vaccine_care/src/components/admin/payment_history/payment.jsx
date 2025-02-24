import React, { useState } from 'react';
import { Table, Tag } from 'antd';
import './payment.css';

const PaymentHistory = () => {
  const [data] = useState([
    {
      id: '1',
      date: '2024-03-15',
      customerName: 'Nguyễn Văn A',
      childName: 'Nguyễn Văn B',
      amount: '500000',
      paymentMethod: 'Tiền mặt',
      status: 'Đã thanh toán',
    },
    {
      id: '2',
      date: '2024-03-14',
      customerName: 'Trần Thị C',
      childName: 'Trần Văn D',
      amount: '750000',
      paymentMethod: 'VNPay',
      status: 'Đã thanh toán',
    },
    // Add more sample data as needed
  ]);

  const columns = [
    {
      title: 'Mã hóa đơn',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Ngày thanh toán',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Tên phụ huynh',
      dataIndex: 'customerName',
      key: 'customerName',
    },
    {
      title: 'Tên trẻ',
      dataIndex: 'childName',
      key: 'childName',
    },
    {
      title: 'Số tiền',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount) => `${parseInt(amount).toLocaleString('vi-VN')} VNĐ`,
    },
    {
      title: 'Phương thức',
      dataIndex: 'paymentMethod',
      key: 'paymentMethod',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={status === 'Đã thanh toán' ? 'green' : 'red'}>
          {status}
        </Tag>
      ),
    },
  ];

  return (
    <div className="payment-history">
      <h2 className="payment-history-title">Lịch sử thanh toán</h2>
      <Table 
        columns={columns} 
        dataSource={data} 
        rowKey="id"
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
};

export default PaymentHistory;
