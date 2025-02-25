import React, { useState } from 'react'
import "./BookingPage.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import Phone from '../../../assets/HomePage/phoneHome.png'
import tiemle from '../../../assets/HomePage/tiemle.png'
import tiemtheogoi from '../../../assets/HomePage/tiemtheogoi.png'
import tuvanmuitiem from '../../../assets/HomePage/tuvanmuitiem.png'

import { Link } from 'react-router-dom';




function BookingPage() {

     

  return (
    <div className='HomePage-Allcontainer'>
      {/* Body-homepage */}

      <div className="HomePage-main-container">
             <div className='container'>
              <div className='row'>
                <div className='col-12 mt-152 BookingPage-titletitle'>
                <div className="BookingPage-heading-protected-together">
          Đặt lịch tiêm
        </div>
                </div>
              </div>
             </div>
    </div>

        {/* Đặt Lịch */}
        <div className='BookingPage-container'>
            <div className='container'>
                <div className='row'>
                    <div className='col-6'>
                        <div className='BookingPage-flex'>
                        <div className='BookingPage-intro'>
                        Đăng ký thông tin tiêm chủng để tiết kiệm thời gian khi đến làm thủ tục tại quầy Lễ tân cho Quý Khách hàng, việc đăng ký thông
                        tin tiêm chủng chưa hỗ trợ đặt lịch hẹn chính xác theo giờ.
                        </div>
                        <div className='BookingPage-tuade'>
                        Thông tin người tiêm
                        </div>
                        <div className='BookingPage-Name'>
                        Họ tên người tiêm
                        </div>
                        <input className='BookingPage-input' placeholder='Tên mẹ'/>

                        <div className='BookingPage-tuade'>
                        Thông tin người liên hệ 
                        </div>
                        <div className='BookingPage-Name'>
                        Họ tên người liên hệ
                        </div>
                        <input className='BookingPage-input' placeholder='Tên mẹ'/>

                        <div className='BookingPage-flex1'>
                            <div className='BookingPage-box'>
                            <div className='BookingPage-Name'>
                        Mối quan hệ người tiêm
                        </div>
                        <input className='BookingPage-input mt-4' placeholder='Mẹ'/>
                            </div>
                            <div className='BookingPage-box'>
                            <div className='BookingPage-Name'>
                        Số điện thoại người liên hệ
                        </div>
                        <input className='BookingPage-input mt-4' placeholder='0374277590'/>
                            </div>

                        </div>

                        <div className='BookingPage-tuade'>
                        Thông tin Dịch vụ
                        </div>
                        <div className='BookingPage-Name'>
                        * Loại vắc xin muốn đăng ký
                        </div>
                        <div className='BookingPage-flex2'>
                            <div className='Booking-goi'>
                                Vắc xin gói
                            </div>
                            <div className='Booking-goi'>
                                Vắc xin lẻ
                            </div>
                        </div>
                        <div className='BookingPage-Name'>
                        * Ngày mong muốn tiêm
                        </div>
                        <input className='BookingPage-input' placeholder='Ngày/Tháng/Năm'/>
                        </div>
                        <Link to='/successbooking'>
                        <div className='BookingPage-button'>
                        Hoàn thành đăng ký
                        </div>
                        </Link>
                    </div>
                    <div className='col-6'>

                    </div>

                </div>

            </div>

        </div>




        {/* Danh mục dịch vụ */}
        <div className='HomePage-DichVu'>
        <div className='HomePage-tilte'>
        <div className='HomePage-dm'>Danh mục dịch vụ</div>
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

        {/* Footer */}

    </div>
  )
}

export default BookingPage
