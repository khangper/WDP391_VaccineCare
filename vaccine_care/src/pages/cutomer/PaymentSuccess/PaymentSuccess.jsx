import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';
import './PaymentSuccess.css';

function PaymentSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    // Tự động chuyển về trang chủ sau 5 giây
    const timeout = setTimeout(() => {
      navigate('/');
    }, 5000);

    return () => clearTimeout(timeout);
  }, [navigate]);

  return (
    <div className="payment-result-container">
      <div className="payment-result-card">
        <FaCheckCircle className="result-icon success" />
        <h1 className="success-title">Thanh toán thành công!</h1>
        <p className="success-message">Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi.</p>
        <p className="redirect-message">Bạn sẽ được chuyển về trang chủ sau 5 giây...</p>
        <button 
          className="home-button"
          onClick={() => navigate('/')}
        >
          Về trang chủ ngay
        </button>
      </div>
    </div>
  );
}

export default PaymentSuccess; 