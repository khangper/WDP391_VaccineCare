import React, { useState } from 'react';
import { Modal, Form, Input, Button, message } from 'antd';

const RegisterForm = ({ isOpen, onClose, type, onSubmit }) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (values) => {
        if (values.password !== values.confirmPassword) {
            message.error('Mật khẩu xác nhận không khớp!');
            return;
        }

        setLoading(true);
        try {
            await onSubmit(values);
            message.success(`Tạo tài khoản ${type} thành công!`);
            form.resetFields();
            onClose();
        } catch (error) {
            message.error('Có lỗi xảy ra khi tạo tài khoản!');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal
            title={`Tạo tài khoản ${type}`}
            open={isOpen}
            onCancel={onClose}
            footer={null}
            maskClosable={false}
        >
            <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
            >
                <Form.Item
                    name="username"
                    label="Tên đăng nhập"
                    rules={[{ required: true, message: 'Vui lòng nhập tên đăng nhập!' }]}
                >
                    <Input placeholder="Nhập tên đăng nhập" />
                </Form.Item>

                <Form.Item
                    name="email"
                    label="Email"
                    rules={[
                        { required: true, message: 'Vui lòng nhập email!' },
                        { type: 'email', message: 'Email không hợp lệ!' }
                    ]}
                >
                    <Input placeholder="Nhập email" />
                </Form.Item>

                <Form.Item
                    name="password"
                    label="Mật khẩu"
                    rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
                >
                    <Input.Password placeholder="Nhập mật khẩu" />
                </Form.Item>

                <Form.Item
                    name="confirmPassword"
                    label="Xác nhận mật khẩu"
                    rules={[{ required: true, message: 'Vui lòng xác nhận mật khẩu!' }]}
                >
                    <Input.Password placeholder="Xác nhận mật khẩu" />
                </Form.Item>

                <Form.Item className="form-actions">
                    <Button onClick={onClose} style={{ marginRight: 8 }}>
                        Hủy
                    </Button>
                    <Button type="primary" htmlType="submit" loading={loading}>
                        Tạo tài khoản
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default RegisterForm; 