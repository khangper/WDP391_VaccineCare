import React, { useState } from 'react'
import "./ProfileChildPage.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import tiemle from '../../../assets/HomePage/tiemle.png'
import tiemtheogoi from '../../../assets/HomePage/tiemtheogoi.png'
import tuvanmuitiem from '../../../assets/HomePage/tuvanmuitiem.png'
import { Link } from 'react-router-dom';




function ProfileChildPage() {
    const data = ["Đoàn Anh Khang", "batman", "Iron Man", "Superman"];
     

  return (
    <div className='HomePage-Allcontainer'>
      {/* Body-homepage */}

      <div className="HomePage-main-container">
             <div className='container'>
              <div className='row'>
                <div className='col-12 mt-152 BookingPage-titletitle'>
                <div className="BookingPage-heading-protected-together">
          Hồ Sơ trẻ 
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
                    {data.map((item, index) => (
                      <Link to='/Vaccination'>
        <div key={index} className="Footer-input mt-4">
          <div className="bg-shadow">
            <div className="ProfileChildPage-single-input">
              {item}
            </div>
          </div>
        </div></Link>
      ))}
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
    </div>
  )
}

export default ProfileChildPage
