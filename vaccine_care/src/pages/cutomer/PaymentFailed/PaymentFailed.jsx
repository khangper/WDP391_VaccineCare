import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTimesCircle } from 'react-icons/fa';
import './PaymentFailed.css';

function PaymentFailed() {
  const navigate = useNavigate();

  useEffect(() => {
    // Tự động chuyển về trang bill sau 5 giây
    const timeout = setTimeout(() => {
      navigate('/bill');
    }, 5000);

    return () => clearTimeout(timeout);
  }, [navigate]);

  return (
    <div className="payment-result-container">
      <div className="payment-result-card">
        <FaTimesCircle className="result-icon failed" />
        <h1 className="failed-title">Thanh toán thất bại!</h1>
        <p className="failed-message">Đã xảy ra lỗi trong quá trình thanh toán.</p>
        <p className="redirect-message">Bạn sẽ được chuyển về trang hóa đơn sau 5 giây...</p>
        <div className="button-group">
          <button 
            className="retry-button"
            onClick={() => navigate('/bill')}
          >
            Thử lại
          </button>
          <button 
            className="home-button"
            onClick={() => navigate('/')}
          >
            Về trang chủ
          </button>
        </div>
      </div>
    </div>
  );
}

export default PaymentFailed; 