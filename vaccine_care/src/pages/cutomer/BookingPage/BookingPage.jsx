import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import "./BookingPage.css";
import 'bootstrap/dist/css/bootstrap.min.css';
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
    const [selectedVaccinePackage, setSelectedVaccinePackage] = useState(null);
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

            api.get(`/Child/get-all?FilterOn=userId&FilterQuery=${userId}`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            .then(response => {
                console.log("Dữ liệu từ API /Child/get-all:", response.data);
                setChildren(response.data?.$values || []);
            })
            .catch(error => console.error('Lỗi khi lấy danh sách trẻ em:', error));
        }
    }, [token]);

    // Lấy danh sách vaccine lẻ
    useEffect(() => {
        api.get('/Vaccine/get-all')
            .then(response => {
                console.log("Dữ liệu từ API /Vaccine/get-all:", response.data);
                setVaccines(response.data?.$values || []);
            })
            .catch(error => console.error('Lỗi khi lấy danh sách vaccine:', error));
    }, []);

    // Lấy danh sách vaccine gói
    useEffect(() => {
        api.get('/VaccinePackage/get-all')
            .then(response => {
                console.log("Dữ liệu từ API /VaccinePackage/get-all:", response.data);
                setVaccinePackages(response.data?.$values || []);
            })
            .catch(error => console.error('Lỗi khi lấy danh sách vaccine package:', error));
    }, []);

    // Xử lý đặt lịch tiêm
    const handleSubmit = async () => {
        if (!selectedChild || !appointmentDate || !contactName || !contactPhone || (!selectedVaccine && !selectedVaccinePackage)) {
            alert('Vui lòng nhập đầy đủ thông tin!');
            return;
        }

        // Tìm thông tin trẻ em từ danh sách dựa trên ID
        const childData = children.find(child => child.id === parseInt(selectedChild));
        if (!childData) {
            alert('Không tìm thấy thông tin trẻ em!');
            return;
        }

        // Kiểm tra vaccineType hợp lệ
        let vaccineTypeFormatted = vaccineType === "Vaccine lẻ" ? "Single" : vaccineType === "Vắc xin gói" ? "Package" : "";

        if (!vaccineTypeFormatted) {
            alert("Vui lòng chọn loại vắc xin hợp lệ!");
            return;
        }

        // Lấy đúng ID của vaccine package từ danh sách
        let vaccinePackageId = null;
        if (vaccineTypeFormatted === "Package") {
            const selectedPackage = vaccinePackages.find(pkg => pkg.id === selectedVaccinePackage);
            if (!selectedPackage) {
                alert("Gói vắc xin không hợp lệ!");
                return;
            }
            vaccinePackageId = selectedPackage.id; // Gán ID đúng từ danh sách
        }

        const requestData = {
            childFullName: childData.childrenFullname, 
            contactFullName: contactName,
            contactPhoneNumber: contactPhone,
            vaccineType: vaccineTypeFormatted, 
            selectedVaccineId: vaccineTypeFormatted === "Single" ? parseInt(selectedVaccine) : null,
            selectedVaccinePackageId: vaccineTypeFormatted === "Package" ? vaccinePackageId : null,
            appointmentDate: new Date(appointmentDate).toISOString(), 
        };

        console.log("📤 Đang gửi request:", JSON.stringify(requestData, null, 2));

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
                                <select className='BookingPage-input'
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
    <select 
        className='BookingPage-input' 
        value={selectedVaccine}
        onChange={(e) => setSelectedVaccine(Number(e.target.value))} // Chuyển value về dạng số
    >
        <option value="">Chọn mũi tiêm lẻ</option>
        {vaccines.map(vaccine => (
            <option key={vaccine.id} value={vaccine.id}>{vaccine.name}</option>
        ))}
    </select>
)}

                                
                                {vaccineType === 'Vắc xin gói' && (
                                    <select className='BookingPage-input'
                                        value={selectedVaccinePackage}
                                        onChange={(e) => setSelectedVaccinePackage(Number(e.target.value))}
                                    >
                                        <option value="">Chọn gói vắc xin</option>
                                        {vaccinePackages.map(pkg => (
                                            <option key={pkg.id} value={pkg.id}>{pkg.name}</option>
                                        ))}
                                    </select>
                                )}

                                <div className='BookingPage-tuade'>Ngày mong muốn tiêm</div>
                                <input 
    type="date" 
    className='BookingPage-inputdate' 
    min={new Date().toISOString().split("T")[0]} // Chặn chọn ngày trong quá khứ
    value={appointmentDate} 
    onChange={(e) => setAppointmentDate(e.target.value)} 
/>


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
