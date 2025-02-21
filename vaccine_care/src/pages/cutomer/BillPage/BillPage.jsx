import React, { useState } from 'react'
import "./BillPage.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import tiemle from '../../../assets/HomePage/tiemle.png'
import tiemtheogoi from '../../../assets/HomePage/tiemtheogoi.png'
import tuvanmuitiem from '../../../assets/HomePage/tuvanmuitiem.png'
import { Link, useNavigate } from 'react-router-dom';




function BillPage() {
  const navigate = useNavigate();

  // Danh sách hóa đơn mẫu
  const invoices = [
    { id: "INV20250217", customer: "Đoàn Anh Khang", phone: "037477590", amount: 500000, description: "Thanh toán hóa đơn mua hàng" },
    { id: "INV20250218", customer: "Nguyễn Văn A", phone: "0912345678", amount: 350000, description: "Thanh toán phí dịch vụ" },
    { id: "INV20250219", customer: "Trần Thị B", phone: "0987654321", amount: 750000, description: "Thanh toán đặt hàng online" },
  ];

  const [selectedInvoice, setSelectedInvoice] = useState(null);

  const handlePayment = () => {
    if (selectedInvoice) {
      navigate('/billpayment', { state: { invoice: selectedInvoice } });
    } else {
      alert("Vui lòng chọn một hóa đơn để thanh toán!");
    }
  };

  return (
    <div className='HomePage-Allcontainer'>
      {/* Body-homepage */}

      <div className="HomePage-main-container">
             <div className='container'>
              <div className='row'>
                <div className='col-12 mt-152 BookingPage-titletitle'>
                <div className="BookingPage-heading-protected-together">
          Hóa đơn
        </div>
                </div>
              </div>
             </div>
    </div>

        {/* Đặt Lịch */}
        <div className='BookingPage-container'>
            <div className='container'>
                <div className='row'>
                    <div className='col-12'>
                    <div className='Footer-input'>
                    <div className="bg-shadow">
        <input
      type="text"
      className="BillPage-single-input"
      placeholder="Mã hóa đơn"
    />
    
    <button className="submit-btn" onClick={handlePayment}>
          <span className="BillPagesend">Thanh toán</span>
        </button>
    

      </div>
                    </div>
                    </div>
                </div>
            </div>
        </div>
      {/* Danh sách hóa đơn */}
      <div className='BookingPage-container'>
        <div className='container'>
          <div className='row'>
            <div className='col-12'>
              <div className='Footer-input'>
                <div className="bg-shadow">
                  <h4>Danh sách hóa đơn</h4>
                  <ul className="list-group">
                    {invoices.map((invoice) => (
                      <li key={invoice.id} className={`list-group-item ${selectedInvoice?.id === invoice.id ? "active" : ""}`} onClick={() => setSelectedInvoice(invoice)}>
                        <strong>{invoice.id}</strong> - {invoice.customer} - {invoice.amount.toLocaleString()} VND
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
              {/* Danh mục dịch vụ */}
              <div className='HomePage-DichVu container'>
        <div className='HomePage-tilte rowrow'>
        <div className="col-6">
        <h2 className='HomePage-dm'>Danh mục dịch vụ</h2>
            </div>
            </div>
          <div className='container'>
            <div className='row'>
              <div className='col-12'>
                <div className='HomePage-Danhmuc-Background'>
                  <div className='HomePage-Danhmuc-content'>
                    <img src={tiemtheogoi} className='HomePage-Danhmuc-img'></img>
                    <div className='HomePage-Danhmuc-title'>Tiêm theo gói</div>
                  </div>
                  <div className='HomePage-Danhmuc-content'>
                    <img src={tiemle} className='HomePage-Danhmuc-img'></img>
                    <div className='HomePage-Danhmuc-title'>Tiêm lẻ</div>
                  </div>
                  <div className='HomePage-Danhmuc-content'>
                    <img src={tuvanmuitiem} className='HomePage-Danhmuc-img'></img>
                    <div className='HomePage-Danhmuc-title'>Tư vấn mũi tiêm</div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>




    </div>
  )
}

export default BillPage
