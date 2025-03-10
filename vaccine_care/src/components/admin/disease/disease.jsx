import React, { useState, useEffect } from 'react';
import { Table, Tag } from 'antd';
import axios from 'axios';
import './disease.css';

const Disease = () => {
    const [diseases, setDiseases] = useState([]);
    const [loading, setLoading] = useState(true);

    const getAllDiseases = () => axios.get('https://vaccinecare.azurewebsites.net/api/Disease/get-all?PageSize=30');

    useEffect(() => {
        fetchDiseases();
    }, []);

    const fetchDiseases = async () => {
        try {
            const response = await getAllDiseases();
            const formattedData = response.data.$values.map(disease => ({
                id: disease.id,
                name: disease.name,
                vaccineCount: disease.vaccines.$values.length,
                status: 'Active'
            }));
            setDiseases(formattedData);
        } catch (error) {
            console.error('Error fetching diseases:', error);
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
            title: 'Tên bệnh',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Số lượng vaccine',
            dataIndex: 'vaccineCount',
            key: 'vaccineCount',
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
            <div className="disease-management">
                <h2 className="disease-management-title">Quản lý bệnh</h2>
                <Table 
                    columns={columns} 
                    dataSource={diseases}
                    rowKey="id"
                    pagination={{ pageSize: 10 }}
                    loading={loading}
                />
            </div>
        </div>
    );
};

export default Disease; 