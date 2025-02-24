import React, { useState } from 'react';
import { Table, Tag } from 'antd';
import './disease.css';
// import { diseaseApi } from '../../../services/api';

const Disease = () => {
    const [diseases] = useState([
        {
            id: 'D001',
            name: 'Measles',
            description: 'A highly contagious viral infection',
            symptoms: 'Fever, Rash, Cough',
            preventiveMeasures: 'MMR Vaccine',
            riskLevel: 'High',
            status: 'Active'
        },
        {
            id: 'D002',
            name: 'Chickenpox',
            description: 'Viral infection causing itchy rash',
            symptoms: 'Fever, Itchy rash, Fatigue',
            preventiveMeasures: 'Varicella Vaccine',
            riskLevel: 'Medium',
            status: 'Active'
        },
        // Add more sample data as needed
    ]);

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Disease Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Symptoms',
            dataIndex: 'symptoms',
            key: 'symptoms',
        },
        {
            title: 'Preventive Measures',
            dataIndex: 'preventiveMeasures',
            key: 'preventiveMeasures',
        },
        {
            title: 'Risk Level',
            dataIndex: 'riskLevel',
            key: 'riskLevel',
            render: (riskLevel) => (
                <Tag color={
                    riskLevel === 'High' ? 'red' : 
                    riskLevel === 'Medium' ? 'orange' : 
                    'green'
                }>
                    {riskLevel}
                </Tag>
            ),
        },
        {
            title: 'Status',
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
            <div className="disease-management">
                <h2 className="disease-management-title">Disease Management</h2>
                <Table 
                    columns={columns} 
                    dataSource={diseases}
                    rowKey="id"
                    pagination={{ pageSize: 10 }}
                />
            </div>
        </div>
    );
};

export default Disease; 