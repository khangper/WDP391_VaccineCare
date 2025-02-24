import React, { useState, useEffect } from 'react';
import { Table, Tag, Image, Tooltip, Radio } from 'antd';
import './vaccine.css';
import { vaccineApi } from '../../../services/api';

const Vaccine = () => {
    const [vaccines, setVaccines] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('vaccine');

    useEffect(() => {
        fetchVaccines();
    }, []);

    const fetchVaccines = async () => {
        try {
            const response = await vaccineApi.getAllVaccines();
            const formattedData = response.data.$values.map(vaccine => ({
                id: vaccine.id,
                name: vaccine.name,
                manufacture: vaccine.manufacture,
                description: vaccine.description,
                imageUrl: vaccine.imageUrl,
                recAgeStart: vaccine.recAgeStart,
                recAgeEnd: vaccine.recAgeEnd,
                inStockNumber: vaccine.inStockNumber,
                price: vaccine.price,
                status: vaccine.inStockNumber > 0 ? 'Còn hàng' : 'Hết hàng'
            }));
            setVaccines(formattedData);
        } catch (error) {
            console.error('Error fetching vaccines:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleTabChange = (e) => {
        setActiveTab(e.target.value);
    };

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            width: 70,
        },
        {
            title: 'Hình ảnh',
            dataIndex: 'imageUrl',
            key: 'imageUrl',
            width: 120,
            render: (imageUrl) => (
                <Image
                    src={imageUrl}
                    alt="vaccine"
                    style={{ width: 100, height: 100, objectFit: 'cover' }}
                />
            ),
        },
        {
            title: 'Tên vaccine',
            dataIndex: 'name',
            key: 'name',
            width: 150,
        },
        {
            title: 'Nhà sản xuất',
            dataIndex: 'manufacture',
            key: 'manufacture',
            width: 120,
        },
        {
            title: 'Mô tả',
            dataIndex: 'description',
            key: 'description',
            width: 300,
            render: (text) => (
                <Tooltip 
                    title={text} 
                    placement="topLeft" 
                    overlayStyle={{ maxWidth: '500px' }}
                >
                    <div className="vaccine-description-cell">
                        {text}
                    </div>
                </Tooltip>
            ),
        },
        {
            title: 'Độ tuổi (năm)',
            key: 'age',
            width: 150,
            render: (_, record) => (
                `${record.recAgeStart} - ${record.recAgeEnd}`
            ),
        },
        {
            title: 'Số lượng',
            dataIndex: 'inStockNumber',
            key: 'inStockNumber',
            width: 100,
        },
        {
            title: 'Giá (VNĐ)',
            dataIndex: 'price',
            key: 'price',
            width: 120,
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            width: 120,
            render: (status) => (
                <Tag color={status === 'Còn hàng' ? 'green' : 'red'}>
                    {status}
                </Tag>
            ),
        },
    ];

    return (
        <div className="admin">
            <div className="admin-vaccine-container">
                <div className="admin-vaccine-header">
                    <h2 className="admin-vaccine-title">Quản lý vaccine</h2>
                    <Radio.Group 
                        value={activeTab}
                        onChange={handleTabChange}
                        className="admin-vaccine-tabs"
                    >
                        <Radio.Button value="vaccine">Vaccine</Radio.Button>
                        <Radio.Button value="package">Gói Vaccine</Radio.Button>
                    </Radio.Group>
                </div>
                
                {activeTab === 'vaccine' ? (
                    <Table 
                        columns={columns} 
                        dataSource={vaccines}
                        rowKey="id"
                        pagination={{ pageSize: 10 }}
                        loading={loading}
                        scroll={{ x: 1300 }}
                    />
                ) : (
                    <div className="admin-vaccine-packages">
                        <Table 
                            columns={[
                                {
                                    title: 'ID',
                                    dataIndex: 'id',
                                    key: 'id',
                                },
                                {
                                    title: 'Tên gói',
                                    dataIndex: 'name',
                                    key: 'name',
                                },
                                {
                                    title: 'Mô tả',
                                    dataIndex: 'description',
                                    key: 'description',
                                },
                                {
                                    title: 'Giá (VNĐ)',
                                    dataIndex: 'price',
                                    key: 'price',
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
                            ]}
                            dataSource={[]}
                            rowKey="id"
                            pagination={{ pageSize: 10 }}
                            loading={loading}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Vaccine;