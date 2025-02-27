import React, { useState, useEffect } from 'react';
import { Table, Tag, Image, Tooltip, Radio, Button, message, Modal } from 'antd';
import axios from 'axios';
import './vaccine.css';

const Vaccine = () => {
    const [vaccines, setVaccines] = useState([]);
    const [vaccinePackages, setVaccinePackages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('vaccine');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const [expandedRowKeys, setExpandedRowKeys] = useState([]);

    const getAllVaccines = () => axios.get('https://vaccinecare.azurewebsites.net/api/Vaccine/get-all');
    const getAllVaccinePackages = () => axios.get('https://vaccinecare.azurewebsites.net/api/VaccinePackage/get-all');

    useEffect(() => {
        if (activeTab === 'vaccine') {
            fetchVaccines();
        } else {
            fetchVaccinePackages();
        }
    }, [activeTab]);

    const fetchVaccines = async () => {
        try {
            const response = await getAllVaccines();
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

    const fetchVaccinePackages = async () => {
        try {
            const response = await getAllVaccinePackages();
            const formattedData = response.data.$values.map(pkg => ({
                id: pkg.id,
                name: pkg.name,
                totalPrice: pkg.totalPrice || 0,
                createdAt: new Date(pkg.createdAt).toLocaleDateString('vi-VN'),
                vaccineCount: pkg.vaccinePackageItems.$values.length,
                status: pkg.vaccinePackageItems.$values.length > 0 ? 'Active' : 'Inactive'
            }));
            setVaccinePackages(formattedData);
        } catch (error) {
            console.error('Error fetching vaccine packages:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchVaccinePackageDetails = async (id) => {
        try {
            const response = await axios.get(`https://vaccinecare.azurewebsites.net/api/VaccinePackage/get-by-id/${id}`);
            return response.data.vaccinePackageItems.$values.map(item => ({
                id: item.vaccine.id,
                name: item.vaccine.name,
                manufacture: item.vaccine.manufacture,
                price: item.pricePerDose,
                description: item.vaccine.description,
                imageUrl: item.vaccine.imageUrl,
                status: item.vaccine.inStockNumber > 0 ? 'Còn hàng' : 'Hết hàng',
            }));
        } catch (error) {
            console.error('Error fetching vaccine package details:', error);
            return [];
        }
    };

    const handleTabChange = (e) => {
        setActiveTab(e.target.value);
        setLoading(true);
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
                <Tooltip title={text} placement="topLeft" styles={{ root: { maxWidth: '500px' } }}>
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

    const packageColumns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            width: 70,
        },
        {
            title: 'Tên gói',
            dataIndex: 'name',
            key: 'name',
            width: 200,
        },
        {
            title: 'Số lượng vaccine',
            dataIndex: 'vaccineCount',
            key: 'vaccineCount',
            width: 150,
        },
        {
            title: 'Tổng giá (VNĐ)',
            dataIndex: 'totalPrice',
            key: 'totalPrice',
            width: 150,
            render: (price) => price.toLocaleString('vi-VN'),
        },
        {
            title: 'Ngày tạo',
            dataIndex: 'createdAt',
            key: 'createdAt',
            width: 120,
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            width: 120,
            render: (status) => (
                <Tag color={status === 'Active' ? 'green' : 'red'}>
                    {status}
                </Tag>
            ),
        },
        {
            title: 'Hành động',
            key: 'action',
            render: (_, record) => (
                <Button 
                    className="admin-delete-button" 
                    type="primary" 
                    onClick={() => showDeleteConfirm(record.id)}
                >
                    Xóa
                </Button>
            ),
        },
    ];

    const showDeleteConfirm = (id) => {
        setDeleteId(id);
        setIsModalVisible(true);
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`https://vaccinecare.azurewebsites.net/api/VaccinePackage/delete/${deleteId}`);
            message.success('Gói vaccine đã được xóa thành công.');
            fetchVaccinePackages(); // Refresh the list after deletion
        } catch (error) {
            console.error('Error deleting vaccine package:', error);
            message.error('Đã xảy ra lỗi khi xóa gói vaccine.');
        } finally {
            setIsModalVisible(false);
            setDeleteId(null);
        }
    };

    const expandedRowRender = async (record) => {
        const vaccines = await fetchVaccinePackageDetails(record.id);
        
        const vaccineColumns = [
            {
                title: 'Tên Vaccine',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: 'Nhà sản xuất',
                dataIndex: 'manufacture',
                key: 'manufacture',
            },
            {
                title: 'Giá (VNĐ)',
                dataIndex: 'price',
                key: 'price',
                render: (price) => price.toLocaleString('vi-VN'),
            },
            {
                title: 'Trạng thái',
                dataIndex: 'status',
                key: 'status',
                render: (status) => (
                    <Tag color={status === 'Còn hàng' ? 'green' : 'red'}>
                        {status}
                    </Tag>
                ),
            },
        ];

        return (
            <Table
                columns={vaccineColumns}
                dataSource={vaccines}
                pagination={false}
                rowKey="id"
            />
        );
    };

    return (
        <>
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
                        <Table 
                            columns={packageColumns}
                            dataSource={vaccinePackages}
                            rowKey="id"
                            pagination={{ pageSize: 10 }}
                            loading={loading}
                            scroll={{ x: 1000 }}
                            expandable={{
                                expandedRowRender,
                                rowExpandable: (record) => true,
                                expandedRowKeys,
                                onExpand: (expanded, record) => {
                                    setExpandedRowKeys(expanded ? [...expandedRowKeys, record.id] : expandedRowKeys.filter(key => key !== record.id));
                                },
                            }}
                        />
                    )}
                </div>
            </div>
            
            <Modal
                title="Xác nhận xóa"
                open={isModalVisible}
                onOk={handleDelete}
                onCancel={() => setIsModalVisible(false)}
                okText="Xóa"
                cancelText="Hủy"
            >
                <p>Bạn có chắc chắn muốn xóa gói vaccine này không?</p>
            </Modal>
        </>
    );
};

export default Vaccine;