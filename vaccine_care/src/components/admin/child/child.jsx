import React, { useState, useEffect } from 'react';
import { Table, Tag } from 'antd';
import './child.css';
import { childApi } from '../../../services/api';

const Child = () => {
    const [children, setChildren] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchChildren();
    }, []);

    const fetchChildren = async () => {
        try {
            const response = await childApi.getAllChildren();
            const formattedData = response.data.$values.map(child => ({
                id: child.id,
                name: child.childrenFullname,
                dateOfBirth: new Date(child.dob).toLocaleDateString('vi-VN'),
                gender: child.gender,
                parentName: child.fatherFullName,
                parentPhone: child.fatherPhoneNumber,
                address: child.address,
                status: 'Active'
            }));
            setChildren(formattedData);
        } catch (error) {
            console.error('Error fetching children:', error);
        } finally {
            setLoading(false);
        }
    };

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Họ và tên',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Ngày sinh',
            dataIndex: 'dateOfBirth',
            key: 'dateOfBirth',
        },
        {
            title: 'Giới tính',
            dataIndex: 'gender',
            key: 'gender',
        },
        {
            title: 'Tên phụ huynh',
            dataIndex: 'parentName',
            key: 'parentName',
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'parentPhone',
            key: 'parentPhone',
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            render: (status) => (
                <Tag color={status === 'Active' ? 'green' : 'red'}>
                    {status}
                </Tag>
            ),
        },
    ];

    return (
        <div className="admin">
            <div className="child-management">
                <h2 className="child-management-title">Quản lý trẻ em</h2>
                <Table 
                    columns={columns} 
                    dataSource={children}
                    rowKey="id"
                    pagination={{ pageSize: 10 }}
                    loading={loading}
                />
            </div>
        </div>
    );
};

export default Child; 