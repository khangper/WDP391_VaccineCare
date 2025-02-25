import React from 'react'
import { Link } from 'react-router-dom'
function SuccesBooking() {
  return (
    <div className='SuccessRegis-container'>
      <div className='SuccessRegis-title'>Chúc mừng bạn đã tạo tài khoản cho bé thành công</div>
      <Link to='/'><div className='SuccessRegis-button'>
        Trang chủ
      </div></Link>
    </div>
  )
}

export default SuccesBooking
