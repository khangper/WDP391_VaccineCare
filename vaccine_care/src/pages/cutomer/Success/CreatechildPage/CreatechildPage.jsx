import React, { useState } from 'react'
import "./CreatechildPage.css"
import { Link } from 'react-router-dom';
function CreatechildPage() {
    const [gender, setGender] = useState("Nam");

  return (
    <div className='CreatechildPage-container'>
      <div className='CreatechildPage-From'>
      <div className='SuccessRegis-title'>Tạo hồ sơ trẻ em</div>
      <div className='CreatechildPage-content-kk'>
      <div className='CreatechildPage-content'>
            <div className='CreatechildPage-Name'>Tên của bé:</div>
            <input className='CreatechildPage-input' placeholder='Name of child '/>
        </div>
        <div className='CreatechildPage-content'>
            <div className='CreatechildPage-Name'>Ngày tháng năm sinh:</div>
            <input className='CreatechildPage-input' placeholder='DD/MM/YY'/>
        </div>
      </div>
      <div className='CreatechildPage-content-kk'>
      <div className='CreatechildPage-content'>
            <div className='CreatechildPage-Name'>Họ tên mẹ:</div>
            <input className='CreatechildPage-input' placeholder='Name of mother '/>
        </div>
        <div className='CreatechildPage-content'>
            <div className='CreatechildPage-Name'>Họ tên cha:</div>
            <input className='CreatechildPage-input' placeholder='Name of dad'/>
        </div>
        </div>
        <div className='CreatechildPage-content'>
            <div className='CreatechildPage-Name'>Số điện thoại liên lạc:</div>
            <input className='CreatechildPage-input' placeholder='Phone number'/>
        </div>
        <div className='CreatechildPage-content'>
            <div className='CreatechildPage-Name'>Giới tính:</div>
            <div className="CreatechildPage-custom-select">
        <span
          className={`CreatechildPage-custom-option ${gender === "Nam" ? "selected" : ""}`}
          onClick={() => setGender("Nam")}
        >
          Nam
        </span>
        <span
          className={`CreatechildPage-custom-option ${gender === "Nữ" ? "selected" : ""}`}
          onClick={() => setGender("Nữ")}
        >
          Nữ
        </span>
            </div>
        </div>
        <div className='CreatechildPage-content-kk'>
            <div className='CreatechildPage-address'>
            <div className='CreatechildPage-Name'>Tỉnh thành:</div>
            <input className='CreatechildPage-input' placeholder='input address'/>
            </div>
            <div className='CreatechildPage-address'>
            <div className='CreatechildPage-Name'>Quận huyện:</div>
            <input className='CreatechildPage-input' placeholder='input address'/>
            </div>

        </div>
        <div className='CreatechildPage-content-kk'>
            <div className='CreatechildPage-address'>
            <div className='CreatechildPage-Name'>Phường xã:</div>
            <input className='CreatechildPage-input' placeholder='input address'/>
            </div>
            <div className='CreatechildPage-address'>
            <div className='CreatechildPage-Name'>Số nhà, tên đường:</div>
            <input className='CreatechildPage-input' placeholder=''/>
            </div>

        </div>
      </div>
      <div className='CreatechildPage-title'>
      <div className='SuccessRegis-title'>Chăm sóc từng mũi tiêm trọn vẹn</div>
      <Link to='/successbaby'><div className='CreatechildPage-button'>
        Tạo
      </div></Link>
      </div>
    </div>
  )
}

export default CreatechildPage
