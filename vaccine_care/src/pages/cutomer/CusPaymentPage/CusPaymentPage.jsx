import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import './CusPaymentPage.css';

function CusPaymentPage() {
  const location = useLocation();
  const invoiceData = location.state?.invoice || {
    id: "INV000000",
    customer: "Khách hàng không xác định",
    phone: "0000000000",
    amount: 0,
    description: "Không có mô tả",
  };

  const [selectedMethod, setSelectedMethod] = useState("qr");

  const qrImageUrl = "https://dhiway.com/wp-content/uploads/2021/09/Artboard-2-1.png";

  return (
    <div className='CusPaymentPage'>
            <div className="HomePage-main-container">
             <div className='container'>
              <div className='row'>
                <div className='col-12 mt-152 BookingPage-titletitle'>
                <div className="BookingPage-heading-protected-together">
          Thanh toán 
        </div>
                </div>
              </div>
             </div>
    </div>

    <div className='container'>
      <div className='row'>
        <div className='col-12'>
          <div className="payment-page mt-4">
            <div className="invoice-card card mb-3 shadow">
              <div className="card-body">
                <h5 className="card-title mb-3">Thông tin hóa đơn</h5>
                <p><strong>Mã hóa đơn:</strong> {invoiceData.id}</p>
                <p><strong>Khách hàng:</strong> {invoiceData.customer}</p>
                <p><strong>Số điện thoại:</strong> {invoiceData.phone}</p>
                <p><strong>Số tiền:</strong> {invoiceData.amount.toLocaleString()} VND</p>
                <p><strong>Nội dung:</strong> {invoiceData.description}</p>
              </div>
            </div>

            <div className="payment-method card mb-3 shadow">
              <div className="card-body">
                <h5 className="card-title mb-3">Chọn phương thức thanh toán</h5>
                <div className="payment-options">
                  <div className="form-check">
                    <input className="form-check-input" type="radio" id="qr" name="paymentMethod" value="qr" checked={selectedMethod === "qr"} onChange={(e) => setSelectedMethod(e.target.value)} />
                    <label className="form-check-label" htmlFor="qr">Thanh toán qua mã QR</label>
                  </div>
                  <div className="form-check">
                    <input className="form-check-input" type="radio" id="bank" name="paymentMethod" value="bank" checked={selectedMethod === "bank"} onChange={(e) => setSelectedMethod(e.target.value)} />
                    <label className="form-check-label" htmlFor="bank">Chuyển khoản ngân hàng</label>
                  </div>
                  <div className="form-check">
                    <input className="form-check-input" type="radio" id="cash" name="paymentMethod" value="cash" checked={selectedMethod === "cash"} onChange={(e) => setSelectedMethod(e.target.value)} />
                    <label className="form-check-label" htmlFor="cash">Thanh toán tiền mặt</label>
                  </div>
                </div>
              </div>
            </div>

            {selectedMethod === "qr" && (
              <div className="qr-code card mb-3 shadow">
                <div className="card-body text-center">
                  <h5 className="card-title mb-3">Quét mã QR để thanh toán</h5>
                  <img src={qrImageUrl} alt="QR Code" width="200" height="200" />
                </div>
              </div>
            )}

            <Link to='/' className="BillPayment-flex text-center mt-3">
              <button className="btn btn-success btn-lg">Xác nhận đã thanh toán</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
    </div>

  );
}

export default CusPaymentPage;
