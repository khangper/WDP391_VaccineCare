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
    const [diseases, setDiseases] = useState([]); 
    const [relatedVaccines, setRelatedVaccines] = useState([]); 
    const [selectedChild, setSelectedChild] = useState('');
    const [selectedVaccine, setSelectedVaccine] = useState('');
    const [selectedDisease, setSelectedDisease] = useState(''); 
    const [selectedVaccinePackage, setSelectedVaccinePackage] = useState(null);
    const [vaccineType, setVaccineType] = useState('');
    const [contactName, setContactName] = useState('');
    const [contactPhone, setContactPhone] = useState('');
    const [appointmentDate, setAppointmentDate] = useState('');

    // Lấy danh sách bệnh từ API ✅ Mới
    useEffect(() => {
        api.get('/Disease/get-all?PageSize=30')
            .then(response => {
                setDiseases(response.data?.$values || []);
            })
            .catch(error => console.error('Lỗi khi lấy danh sách bệnh:', error));
    }, []);

    // Lấy danh sách trẻ em
    useEffect(() => {
        if (token) {
            let userId;
            try {
                const decoded = jwtDecode(token);
                userId = decoded.Id;
            } catch (err) {
                console.error("❌ Lỗi giải mã token:", err);
                return;
            }

            api.get(`/Child/get-all?FilterOn=userId&FilterQuery=${userId}`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            .then(response => {
                setChildren(response.data?.$values || []);
            })
            .catch(error => console.error('Lỗi khi lấy danh sách trẻ em:', error));
        }
    }, [token]);

    // Lấy danh sách vaccine lẻ
    useEffect(() => {
        api.get('/Vaccine/get-all')
            .then(response => {
                setVaccines(response.data?.$values || []);
            })
            .catch(error => console.error('Lỗi khi lấy danh sách vaccine:', error));
    }, []);

    // Lấy danh sách vaccine gói
    useEffect(() => {
        api.get('/VaccinePackage/get-all')
            .then(response => {
                setVaccinePackages(response.data?.$values || []);
            })
            .catch(error => console.error('Lỗi khi lấy danh sách vaccine package:', error));
    }, []);

    // Khi chọn bệnh, gọi API để lấy danh sách vaccine liên quan ✅ Mới
    useEffect(() => {
        if (selectedDisease) {
            api.get(`/Vaccine/get-vaccines-by-diasease-name/${selectedDisease}`)
                .then(response => {
                    setRelatedVaccines(response.data?.$values || []);
                })
                .catch(error => console.error('Lỗi khi lấy vaccine theo bệnh:', error));
        } else {
            setRelatedVaccines([]);
        }
    }, [selectedDisease]);

    // Xử lý đặt lịch
    // const handleSubmit = async () => {
    //     if (!selectedChild || !appointmentDate || !contactName || !contactPhone || (!selectedVaccine && !selectedVaccinePackage)) {
    //         alert('Vui lòng nhập đầy đủ thông tin!');
    //         return;
    //     }

    //     let vaccineTypeFormatted = vaccineType === "Vaccine lẻ" ? "Single" : vaccineType === "Vắc xin gói" ? "Package" : "";
    //     if (!vaccineTypeFormatted) {
    //         alert("Vui lòng chọn loại vắc xin hợp lệ!");
    //         return;
    //     }

    //     const requestData = {
    //         childFullName: children.find(child => child.id === parseInt(selectedChild))?.childrenFullname, 
    //         contactFullName: contactName,
    //         contactPhoneNumber: contactPhone,
    //         vaccineType: vaccineTypeFormatted, 
    //         selectedVaccineId: vaccineTypeFormatted === "Single" ? parseInt(selectedVaccine) : null,
    //         selectedVaccinePackageId: vaccineTypeFormatted === "Package" ? parseInt(selectedVaccinePackage) : null,
    //         appointmentDate: new Date(appointmentDate).toISOString(),
    //     };

    //     try {
    //         const response = await api.post('/Appointment/book-appointment', requestData, {
    //             headers: { Authorization: `Bearer ${token}` }
    //         });
    //         alert('✅ Đặt lịch thành công!');
    //     } catch (error) {
    //         alert(`Đặt lịch thất bại! Lỗi: ${error.response?.data?.message || "Không xác định"}`);
    //     }
    // };
    const handleSubmit = async () => {
        if (!selectedChild || !appointmentDate || !contactName || !contactPhone || (!selectedVaccine && !selectedVaccinePackage)) {
            alert('Vui lòng nhập đầy đủ thông tin!');
            return;
        }
    
        // Xác định loại vắc xin (Single hoặc Package)
        let vaccineTypeFormatted = vaccineType === "Vaccine lẻ" ? "Single" : vaccineType === "Vắc xin gói" ? "Package" : "";
        if (!vaccineTypeFormatted) {
            alert("Vui lòng chọn loại vắc xin hợp lệ!");
            return;
        }
    
        // Tạo request body theo API mới
        const requestData = {
            childFullName: children.find(child => child.id === parseInt(selectedChild))?.childrenFullname || "",
            contactFullName: contactName,
            contactPhoneNumber: contactPhone,
            vaccineType: vaccineTypeFormatted,
            diaseaseName: vaccineTypeFormatted === "Single" ? selectedDisease || "" : "",  // Chỉ gửi bệnh nếu chọn vắc xin lẻ
            selectedVaccineId: vaccineTypeFormatted === "Single" ? parseInt(selectedVaccine) || null : null,
            selectedVaccinePackageId: vaccineTypeFormatted === "Package" ? parseInt(selectedVaccinePackage) || null : null,
            appointmentDate: new Date(appointmentDate).toISOString(),
        };
    
        try {
            const response = await api.post('/Appointment/book-appointment', requestData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert('✅ Đặt lịch thành công!');
        } catch (error) {
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
                        <>
                            <div className='BookingPage-tuade'>Chọn bệnh</div>
                            <select className='BookingPage-input' value={selectedDisease} onChange={(e) => setSelectedDisease(e.target.value)}>
                                <option value="">Chọn bệnh</option>
                                {diseases.map(disease => (
                                    <option key={disease.id} value={disease.name}>{disease.name}</option>
                                ))}
                            </select>

                            {relatedVaccines.length > 0 && (
                                <>
                                    <div className='BookingPage-tuade'>Chọn vắc xin</div>
                                    <select className='BookingPage-input' value={selectedVaccine} onChange={(e) => setSelectedVaccine(Number(e.target.value))}>
                                        <option value="">Chọn vắc xin</option>
                                        {relatedVaccines.map(vaccine => (
                                            <option key={vaccine.id} value={vaccine.id}>{vaccine.name}</option>
                                        ))}
                                    </select>
                                </>
                            )}
                        </>
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
