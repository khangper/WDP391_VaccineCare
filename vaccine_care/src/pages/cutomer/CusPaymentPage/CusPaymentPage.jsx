import React, { useState, useEffect, useContext } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';
import api from '../../../services/api';
import './CusPaymentPage.css';
import { Spin } from 'antd';

function CusPaymentPage() {
  const { appointmentId } = useParams();
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cashPaymentStatus, setCashPaymentStatus] = useState('initial'); // 'initial', 'processing', 'success'

  // Xử lý thanh toán tiền mặt
  const handleCashPayment = () => {
    if (cashPaymentStatus === 'initial') {
      setCashPaymentStatus('processing');
    } else if (cashPaymentStatus === 'processing') {
      setCashPaymentStatus('success');
      // Có thể thêm API call để cập nhật trạng thái thanh toán
      setTimeout(() => {
        navigate('/bill'); // Chuyển về trang hóa đơn sau khi thanh toán thành công
      }, 2000);
    }
  };

  // Xử lý thanh toán VNPay
  const handleVNPayPayment = async () => {
    try {
      const response = await api.get(`/VNPay/CreatePaymentUrl?PaymentId=${paymentDetails?.paymentId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      // Chuyển hướng đến trang thanh toán VNPay
      if (response.data) {
        window.location.href = response.data;
      }
    } catch (error) {
      console.error('Lỗi khi tạo URL thanh toán:', error);
      alert('Không thể tạo đường dẫn thanh toán. Vui lòng thử lại sau!');
    }
  };

  // Kiểm tra kết quả thanh toán VNPay khi quay lại
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const vnpayStatus = urlParams.get('vnp_ResponseCode');
    
    if (vnpayStatus) {
      api.get('/VNPay/ReturnUrl' + window.location.search, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(response => {
        if (vnpayStatus === '00') {
          // Thanh toán thành công
          alert('Thanh toán thành công!');
          navigate('/bill');
        } else {
          // Thanh toán thất bại
          alert('Thanh toán thất bại!');
        }
      })
      .catch(error => {
        console.error('Lỗi khi kiểm tra kết quả thanh toán:', error);
        alert('Có lỗi xảy ra khi xác nhận thanh toán!');
      });
    }
  }, []);

  useEffect(() => {
    const fetchPaymentDetails = async () => {
      try {
        const response = await api.get(`/Payment/detail/${appointmentId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setPaymentDetails(response.data);
        setLoading(false);
      } catch (err) {
        setError('Không thể tải thông tin thanh toán');
        setLoading(false);
      }
    };

    if (appointmentId && token) {
      fetchPaymentDetails();
    }
  }, [appointmentId, token]);

  const getStatusBadgeClass = (status) => {
    switch(status?.toLowerCase()) {
      case 'paid':
        return 'status-badge-success';
      case 'not paid':
        return 'status-badge-pending';
      default:
        return 'status-badge-default';
    }
  };

  const getCashPaymentButton = () => {
    switch (cashPaymentStatus) {
      case 'processing':
        return (
          <button className="btn-cash processing" onClick={handleCashPayment}>
            <Spin /> Xác nhận thanh toán
          </button>
        );
      case 'success':
        return (
          <button className="btn-cash success" disabled>
            ✓ Thanh toán thành công
          </button>
        );
      default:
        return (
          <button className="btn-cash" onClick={handleCashPayment}>
            Thanh toán tiền mặt
          </button>
        );
    }
  };

  if (loading) return <div>Đang tải...</div>;
  if (error) return <div>{error}</div>;
  if (!paymentDetails) return <div>Không tìm thấy thông tin thanh toán</div>;

  return (
    <div className='HomePage-Allcontainer'>
      <div className="HomePage-main-container">
        <div className='container'>
          <div className='row'>
            <div className='col-12 mt-152 BookingPage-titletitle'>
              <div className="BookingPage-heading-protected-together">
                Chi tiết thanh toán
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-4">
        <div className="payment-card">
          <div className="payment-details">
            <h4>Thông tin thanh toán</h4>
            <div className="info-row">
              <p><strong>Mã thanh toán:</strong> {paymentDetails?.paymentId}</p>
              <p><strong>Mã lịch hẹn:</strong> {paymentDetails?.appointmentId}</p>
              <p><strong>Ngày tiêm:</strong> {new Date(paymentDetails?.dateInjection).toLocaleDateString('vi-VN')}</p>
              <p><strong>Tổng tiền:</strong> {paymentDetails?.totalPrice?.toLocaleString('vi-VN')} VND</p>
              <p><strong>Trạng thái thanh toán:</strong> 
                <span className={`status-badge ${getStatusBadgeClass(paymentDetails?.paymentStatus)}`}>
                  {paymentDetails?.paymentStatus}
                </span>
              </p>
              <p><strong>Trạng thái tiêm chủng:</strong> {paymentDetails?.injectionProcessStatus}</p>
            </div>

            <div className="vaccine-details">
              <h5>Chi tiết vaccine</h5>
              {paymentDetails?.vaccines?.$values?.map((vaccine, index) => (
                <div key={index} className="vaccine-item">
                  <p><strong>Tên vaccine:</strong> {vaccine?.vaccineName}</p>
                  <p><strong>Mũi số:</strong> {vaccine?.doseNumber}</p>
                  <p><strong>Giá/mũi:</strong> {vaccine?.pricePerDose?.toLocaleString('vi-VN')} VND</p>
                  <p><strong>Trạng thái:</strong> {vaccine?.isInjected ? 'Đã tiêm' : 'Chưa tiêm'}</p>
                </div>
              ))}
            </div>
            
            <div className="payment-actions">
              {paymentDetails?.paymentStatus?.toLowerCase() === 'pending' && (
                <button 
                  className="btn-vnpay"
                  onClick={handleVNPayPayment}
                >
                  Thanh toán qua VNPay
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CusPaymentPage;
