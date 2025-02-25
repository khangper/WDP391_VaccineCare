// import React, { useState } from 'react'
// import "./BookingPage.css"
// import 'bootstrap/dist/css/bootstrap.min.css';
// import Phone from '../../../assets/HomePage/phoneHome.png'
// import tiemle from '../../../assets/HomePage/tiemle.png'
// import tiemtheogoi from '../../../assets/HomePage/tiemtheogoi.png'
// import tuvanmuitiem from '../../../assets/HomePage/tuvanmuitiem.png'

// import { Link } from 'react-router-dom';




// function BookingPage() {

     

//   return (
//     <div className='HomePage-Allcontainer'>
//       {/* Body-homepage */}

//       <div className="HomePage-main-container">
//              <div className='container'>
//               <div className='row'>
//                 <div className='col-12 mt-152 BookingPage-titletitle'>
//                 <div className="BookingPage-heading-protected-together">
//           Đặt lịch tiêm
//         </div>
//                 </div>
//               </div>
//              </div>
//     </div>

//         {/* Đặt Lịch */}
//         <div className='BookingPage-container'>
//             <div className='container'>
//                 <div className='row'>
//                     <div className='col-6'>
//                         <div className='BookingPage-flex'>
//                         <div className='BookingPage-intro'>
//                         Đăng ký thông tin tiêm chủng để tiết kiệm thời gian khi đến làm thủ tục tại quầy Lễ tân cho Quý Khách hàng, việc đăng ký thông
//                         tin tiêm chủng chưa hỗ trợ đặt lịch hẹn chính xác theo giờ.
//                         </div>
//                         <div className='BookingPage-tuade'>
//                         Thông tin người tiêm
//                         </div>
//                         <div className='BookingPage-Name'>
//                         Họ tên người tiêm
//                         </div>
//                         <input className='BookingPage-input' placeholder='Tên mẹ'/>

//                         <div className='BookingPage-tuade'>
//                         Thông tin người liên hệ 
//                         </div>
//                         <div className='BookingPage-Name'>
//                         Họ tên người liên hệ
//                         </div>
//                         <input className='BookingPage-input' placeholder='Tên mẹ'/>

//                         <div className='BookingPage-flex1'>
//                             <div className='BookingPage-box'>
//                             <div className='BookingPage-Name'>
//                         Mối quan hệ người tiêm
//                         </div>
//                         <input className='BookingPage-input mt-4' placeholder='Mẹ'/>
//                             </div>
//                             <div className='BookingPage-box'>
//                             <div className='BookingPage-Name'>
//                         Số điện thoại người liên hệ
//                         </div>
//                         <input className='BookingPage-input mt-4' placeholder='0374277590'/>
//                             </div>

//                         </div>

//                         <div className='BookingPage-tuade'>
//                         Thông tin Dịch vụ
//                         </div>
//                         <div className='BookingPage-Name'>
//                         * Loại vắc xin muốn đăng ký
//                         </div>
//                         <div className='BookingPage-flex2'>
//                             <div className='Booking-goi'>
//                                 Vắc xin gói
//                             </div>
//                             <div className='Booking-goi'>
//                                 Vắc xin lẻ
//                             </div>
//                         </div>
//                         <div className='BookingPage-Name'>
//                         * Ngày mong muốn tiêm
//                         </div>
//                         <input className='BookingPage-input' placeholder='Ngày/Tháng/Năm'/>
//                         </div>
//                         <Link to='/successbooking'>
//                         <div className='BookingPage-button'>
//                         Hoàn thành đăng ký
//                         </div>
//                         </Link>
//                     </div>
//                     <div className='col-6'>

//                     </div>

//                 </div>

//             </div>

//         </div>




//         {/* Danh mục dịch vụ */}
//         <div className='HomePage-DichVu'>
//         <div className='HomePage-tilte'>
//         <div className='HomePage-dm'>Danh mục dịch vụ</div>
//             </div>
//           <div className='container'>
//             <div className='row'>
//               <div className='col-12'>
//                 <div className='HomePage-Danhmuc-Background'>
//                   <div className='HomePage-Danhmuc-content'>
//                     <img src={tiemtheogoi} className='HomePage-Danhmuc-img'></img>
//                     <div className='HomePage-Danhmuc-title'>Tiêm theo gói</div>
//                   </div>
//                   <div className='HomePage-Danhmuc-content'>
//                     <img src={tiemle} className='HomePage-Danhmuc-img'></img>
//                     <div className='HomePage-Danhmuc-title'>Tiêm lẻ</div>
//                   </div>
//                   <div className='HomePage-Danhmuc-content'>
//                     <img src={tuvanmuitiem} className='HomePage-Danhmuc-img'></img>
//                     <div className='HomePage-Danhmuc-title'>Tư vấn mũi tiêm</div>
//                   </div>

//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Footer */}

//     </div>
//   )
// }

// export default BookingPage
import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import "./BookingPage.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import tiemle from '../../../assets/HomePage/tiemle.png';
import tiemtheogoi from '../../../assets/HomePage/tiemtheogoi.png';
import tuvanmuitiem from '../../../assets/HomePage/tuvanmuitiem.png';
import api from '../../../services/api';
import { AuthContext } from '../../../context/AuthContext';
import jwtDecode from "jwt-decode";
function BookingPage() {
    const { token } = useContext(AuthContext);
    const [children, setChildren] = useState([]);
    const [vaccines, setVaccines] = useState([]);
    const [vaccinePackages, setVaccinePackages] = useState([]);
    const [selectedChild, setSelectedChild] = useState('');
    const [selectedVaccine, setSelectedVaccine] = useState('');
    const [selectedVaccinePackage, setSelectedVaccinePackage] = useState('');
    const [vaccineType, setVaccineType] = useState('');
    const [contactName, setContactName] = useState('');
    const [contactPhone, setContactPhone] = useState('');
    const [appointmentDate, setAppointmentDate] = useState('');

    // Lấy danh sách trẻ em từ API
    useEffect(() => {
      if (token) {
          let userId;
          try {
              const decoded = jwtDecode(token);
              userId = decoded.Id; 
              console.log("User ID from token:", userId);
          } catch (err) {
              console.error("❌ Lỗi giải mã token:", err);
              return;
          }
  
          api.get(`/Child/get-all?FilterOn=userId&SortBy=3&FilterValue=${userId}`, {
              headers: { Authorization: `Bearer ${token}` }
          })
          .then(response => {
              console.log("Dữ liệu từ API /Child/get-all:", response.data);
              if (Array.isArray(response.data.$values)) {
                  setChildren(response.data.$values);
              } else {
                  setChildren([]);
              }
          })
          .catch(error => console.error('Lỗi khi lấy danh sách trẻ em:', error));
      }
  }, [token]);

    // Lấy danh sách vaccine lẻ
    useEffect(() => {
        api.get('/Vaccine/get-all')
            .then(response => {
                console.log("Dữ liệu từ API /Vaccine/get-all:", response.data);
                if (Array.isArray(response.data)) {
                    setVaccines(response.data);
                } else if (response.data?.$values) {
                    setVaccines(response.data.$values);
                } else {
                    setVaccines([]);
                }
            })
            .catch(error => console.error('Lỗi khi lấy danh sách vaccine:', error));
    }, []);

    // Lấy danh sách vaccine gói
    useEffect(() => {
        api.get('/VaccinePackage/get-all')
            .then(response => {
                console.log("Dữ liệu từ API /VaccinePackage/get-all:", response.data);
                if (Array.isArray(response.data)) {
                    setVaccinePackages(response.data);
                } else if (response.data?.$values) {
                    setVaccinePackages(response.data.$values);
                } else {
                    setVaccinePackages([]);
                }
            })
            .catch(error => console.error('Lỗi khi lấy danh sách vaccine package:', error));
    }, []);

    // Xử lý đặt lịch tiêm
    const handleSubmit = async () => {
      if (!selectedChild || !appointmentDate || !contactName || !contactPhone || (!selectedVaccine && !selectedVaccinePackage)) {
          alert('Vui lòng nhập đầy đủ thông tin!');
          return;
      }
  
      // Tìm tên trẻ em từ danh sách dựa trên ID
      const childData = children.find(child => child.id === parseInt(selectedChild));
      if (!childData) {
          alert('Không tìm thấy thông tin trẻ em!');
          return;
      }
  
      // Map vaccineType đúng theo API
      let vaccineTypeFormatted = vaccineType === "Vaccine lẻ" ? "Single" : vaccineType === "Vắc xin gói" ? "Package" : "";
  
      if (!vaccineTypeFormatted) {
          alert("Vui lòng chọn loại vắc xin hợp lệ!");
          return;
      }
  
      const requestData = {
          childFullName: childData.childrenFullname, // Gửi tên trẻ, không phải ID
          contactFullName: contactName,
          contactPhoneNumber: contactPhone,
          vaccineType: vaccineTypeFormatted, // Gửi đúng giá trị API yêu cầu
          selectedVaccineId: vaccineTypeFormatted === 'Single' ? parseInt(selectedVaccine) : 0,
          selectedVaccinePackageId: vaccineTypeFormatted === 'Package' ? parseInt(selectedVaccinePackage) : 0,
          appointmentDate: new Date(appointmentDate).toISOString(), // Chuyển đúng định dạng
      };
  
      console.log("📤 Đang gửi request:", requestData);
  
      try {
          const response = await api.post('/Appointment/book-appointment', requestData, {
              headers: { Authorization: `Bearer ${token}` }
          });
          alert('✅ Đặt lịch thành công!');
          console.log("📩 Phản hồi từ API:", response.data);
      } catch (error) {
          console.error('❌ Lỗi khi đặt lịch:', error.response?.data || error);
          alert(`Đặt lịch thất bại! Lỗi: ${error.response?.data?.message || "Không xác định"}`);
      }
  };
  
    return (
        <div className='HomePage-Allcontainer'>
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
                                <div className='BookingPage-tuade'>Thông tin người tiêm</div>
                                <select
    className='BookingPage-input'
    value={selectedChild}
    onChange={(e) => setSelectedChild(e.target.value)}
>
    <option value="">Chọn trẻ em</option>
    {children.map(child => (
        <option key={child.id} value={child.id}>{child.childrenFullname}</option>
    ))}
</select>


                                <div className='BookingPage-tuade'>Thông tin người liên hệ</div>
                                <div className='BookingPage-flex5'>
                                <input className='BookingPage-input' placeholder='Họ tên' onChange={(e) => setContactName(e.target.value)} />
                                <input className='BookingPage-input' placeholder='Số điện thoại' onChange={(e) => setContactPhone(e.target.value)} />
                                </div>
                                <div className='BookingPage-tuade'>Loại vắc xin muốn đăng ký</div>
                                <div className='BookingPage-flex5'>
                                <button className={`Booking-goi ${vaccineType === 'Vắc xin gói' ? 'selected' : ''}`} onClick={() => setVaccineType('Vắc xin gói')}>Vắc xin gói</button>
                                <button className={`Booking-goi ${vaccineType === 'Vaccine lẻ' ? 'selected' : ''}`} onClick={() => setVaccineType('Vaccine lẻ')}>Vắc xin lẻ</button>
                                </div>
                                

                                {vaccineType === 'Vaccine lẻ' && (
                                    <select className='BookingPage-input' onChange={(e) => setSelectedVaccine(e.target.value)}>
                                        <option value="">Chọn vắc xin</option>
                                        {vaccines.map(vaccine => (
                                            <option key={vaccine.id} value={vaccine.id}>{vaccine.name}</option>
                                        ))}
                                    </select>
                                )}
                                {vaccineType === 'Vắc xin gói' && (
                                    <select className='BookingPage-input' onChange={(e) => setSelectedVaccinePackage(e.target.value)}>
                                        <option value="">Chọn gói vắc xin</option>
                                        {vaccinePackages.map(pkg => (
                                            <option key={pkg.id} value={pkg.id}>{pkg.name}</option>
                                        ))}
                                    </select>
                                )}

                                <div className='BookingPage-tuade'>Ngày mong muốn tiêm</div>
                                <input type="date" className='BookingPage-inputdate' onChange={(e) => setAppointmentDate(e.target.value)} />

                                <button className='BookingPage-button' onClick={handleSubmit}>Hoàn thành đăng ký</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BookingPage;
