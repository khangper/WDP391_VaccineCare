import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./VaccinationSchedule.css";
const VaccinationSchedule = () => {
  const headers = ["","2", "3", "4", "6", "7", "8", "9", "10-11", "12", "18", "2", "3-4", "5-6", "7-8"];
  const vaccines = [
    "Lao",
    "Viêm gan B",
    "Bạch hầu, ho gà, uốn ván",
    "Bại liệt",
    "Viêm phổi, viêm màng não mủ do Hib",
    "Tiêu chảy do Rota Virus",
    "Viêm phổi, viêm màng não, viêm tai giữa do phế cầu khuẩn",
    "Viêm màng não, nhiễm khuẩn huyết, viêm phổi do não mô cầu khuẩn B,C",
    "Cúm",
    "Sởi",
    "Viêm màng não, nhiễm khuẩn huyết, viêm phổi do não mô cầu khuẩn A,C,W,Y"
  ];

const [gender, setGender] = useState("Nam");

  return (


    <div className='HomePage-Allcontainer'>
    {/* Body-Vaccin Profile child */}
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
    {/* Thông tin cá nhân của trẻ */}
    <div className="VaccinationPage container">
      <div className="row">
        <div className="col-12">
          <div className="mt-4">
          <div className='BookingPage-tuade'>
                  Hồ sơ tiêm chủng:
              </div>
              <div className="VaccinationPage-des">
              Người giám hộ có thể đánh giấu X vào các Vaccin mà bé đã được tiêm trước đó:
              </div>
          </div>

             <div className="container mt-4">
    <h3 className="text-center VaccinPage-Intro text-white p-2">
      LỊCH TIÊM CHỦNG CHO TRẺ TỪ 0-8 TUỔI
    </h3>
    <div className="table-responsive">
      <table className="table table-bordered text-center">
        <thead className="table-primary">
          {/* Dòng 1: Nhóm tiêu đề Tháng và Tuổi */}
          <tr>
            <th rowSpan={2} className="align-middle VaccinPage-Title">Vắc xin</th>
            <th rowSpan={0} className="align-middle VaccinPage-Title ">Sơ sinh</th>
            <th colSpan={10} className="align-middle VaccinPage-Title">Tháng</th>
            <th colSpan={4} className="align-middle VaccinPage-Title">Tuổi</th>
          </tr>
          {/* Dòng 2: Các tháng và tuổi cụ thể */}
          <tr>
            {headers.slice(1).map((month, index) => (
              <th key={index} className="align-middle VaccinPage-Title">{month}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {vaccines.map((vaccine, index) => (
            <tr key={index}>
              <td className="align-middle VaccinPage-Name">{vaccine}</td>
              {headers.map((_, idx) => (
                <td key={idx}></td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
             </div>
             <div className="VaccinPage-flex">
                   <div className='BookingPage-button'>
                        CẬP NHẬT MŨI TIÊM
                   </div>
             </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <div className="mt-4">
          <div className='BookingPage-tuade'>
                  THÔNG TIN NGƯỜI TIÊM:
              </div>
          </div>
          <div className="VaccinPage-TTlIENHE">
          <div className='CreatechildPage-content-kk'>
            <div className='CreatechildPage-address'>
            <div className='VaccinationPage-Name'>*Họ tên người tiêm:</div>
            <input className='VaccinationPage-input' placeholder='Khangdoan'/>
            </div>
            <div className='CreatechildPage-address'>
            <div className='VaccinationPage-Name'>*Ngày sinh của bé:</div>
            <input className='VaccinationPage-input' placeholder='18/11/2003'/>
            </div>
        </div>
        <div className='CreatechildPage-content-kk'>
            <div className='CreatechildPage-address'>
            <div className='VaccinationPage-Name'>*Giới tính:</div>
            <div className="VaccinationPage-custom-select">
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
            <div className='CreatechildPage-address'>
            <div className='VaccinationPage-Name'>*Họ tên người giám hộ:</div>
            <input className='VaccinationPage-input' placeholder='Messi'/>
            </div>
        </div>
          <div className='CreatechildPage-content-kk'>
            <div className='CreatechildPage-address'>
            <div className='VaccinationPage-Name'>*Tỉnh thành:</div>
            <input className='VaccinationPage-input' placeholder='Chọn'/>
            </div>
            <div className='CreatechildPage-address'>
            <div className='VaccinationPage-Name'>*Quận huyện:</div>
            <input className='VaccinationPage-input' placeholder='Chọn tỉnh thành trước'/>
            </div>
            <div className='CreatechildPage-address'>
            <div className='VaccinationPage-Name'>*Phường xã:</div>
            <input className='VaccinationPage-input' placeholder='Chọn quận huyện trước'/>
            </div>
        </div>
        <div className='CreatechildPage-content-kk'>
            <div className='CreatechildPage-address'>
            <div className='VaccinationPage-Name'>*Số điện thoại:</div>
            <input className='VaccinationPage-inputPhone' placeholder='0374277590'/>
            </div>
        </div>
        <div className="VaccinPage-flex">
                   <div className='BookingPage-button'>
                        CẬP NHẬT THÔNG TIN
                   </div>
             </div>
          </div>
        </div>
      </div>

    </div>


  </div>
  );
};

export default VaccinationSchedule;
