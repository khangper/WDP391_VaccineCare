import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./VaccinationSchedule.css";
import api from "../../../services/api";
const VaccinationSchedule = () => {
  const { id } = useParams();
  const [diseases, setDiseases] = useState([]);
  const [vaccinationRecords, setVaccinationRecords] = useState([]);
  const [vaccinationProfileId, setVaccinationProfileId] = useState(null);
  const [selectedDisease, setSelectedDisease] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedVaccine, setSelectedVaccine] = useState("");
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [vaccineList, setVaccineList] = useState([]);
  const [showModal, setShowModal] = useState(false);


  const [childData, setChildData] = useState(null);
  const [gender, setGender] = useState("");
  const [updateMessage, setUpdateMessage] = useState("");
  
  const headers = ["Sơ sinh", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];



  useEffect(() => {
    api.get(`/VaccinationProfile/get-all?FilterOn=childrenId&FilterQuery=${id}`)
      .then(response => {
        const profiles = response.data.$values || [];
        console.log("Vaccination Records Response:", response.data);
        if (profiles.length > 0) {
          setVaccinationProfileId(profiles[0].id);
          api.get("/VaccinationDetail/get-all?PageSize=30")
            .then(response => {
              const records = response.data.$values || [];
              setVaccinationRecords(records.filter(record => record.vaccinationProfileId === profiles[0].id));
            })
            .catch(error => console.error("Error fetching vaccination data:", error));
        }
      })
      .catch(error => console.error("Error fetching vaccination profile:", error));
  }, [id]);

  useEffect(() => {
    api.get("/Disease/get-all?PageSize=30")
      .then(response => setDiseases(response.data.$values || response.data))
      .catch(error => console.error("API fetch error: ", error));
  }, []);

  useEffect(() => {
    api.get("/Vaccine/get-all")
      .then(response => setVaccineList(response.data.$values || response.data))
      .catch(error => console.error("API fetch error: ", error));
  }, []);
  
  const handleCellClick = (disease, month) => {
    setSelectedDisease(disease);
    setSelectedMonth(month);
    const existingRecord = vaccinationRecords.find(
      record => record.diseaseId === disease.id && record.expectedInjectionDate.includes(`2025-${month.toString().padStart(2, "0")}`)
    );
    setSelectedRecord(existingRecord || null);
    setSelectedVaccine(existingRecord ? vaccineList.find(v => v.id === existingRecord.vaccineId)?.name : "");
    console.log("Thông tin vaccine đã tiêm:", existingRecord);
    setShowModal(true);
  };


  
  const handleSave = async () => {
    if (!selectedVaccine || !selectedDisease || !selectedMonth || !vaccinationProfileId) return;
  
    const newRecord = {
      childrenId: id,
      diseaseId: selectedDisease.id,
      vaccineId: vaccineList.find(v => v.name === selectedVaccine)?.id || 0,
      month: selectedMonth.toString(),
    };
  
    console.log("Dữ liệu gửi lên API:", newRecord); // Log dữ liệu trước khi gửi request
  
    try {
      const response = await api.post("/VaccinationDetail/create", newRecord);
  
      console.log("Phản hồi từ API:", response); // Log phản hồi từ API
      window.location.reload();
      if (response.status === 200 || response.status === 201) {
        alert("Lưu thành công!");
        
      } else {
        alert("Lưu thất bại!");
      }
    } catch (error) {
      console.error("Error updating vaccination:", error);
    }
  };
  

  const handleDelete = async (recordId) => {
    try {
      const response = await api.delete(`/VaccinationDetail/delete/${recordId}`);
  
      if (response.status === 200 || response.status === 204) {
        alert("Xóa thành công!");
        window.location.reload(); // Reload lại trang sau khi xóa thành công
      } else {
        alert("Xóa thất bại!");
      }
    } catch (error) {
      console.error("Error deleting vaccination record:", error);
    }
  };
  
  // Vaccinetemplate
  const [highlightedVaccines, setHighlightedVaccines] = useState({});
  
  useEffect(() => {
    api.get("/VaccineTemplate/get-all?PageSize=100")
      .then(response => {
        const vaccineData = response.data.$values || response.data;
        const highlightMap = {};

        vaccineData.forEach(vaccine => {
          if (!highlightMap[vaccine.month]) {
            highlightMap[vaccine.month] = [];
          }
          highlightMap[vaccine.month].push({
            diseaseId: vaccine.diseaseId,
            notes: vaccine.notes
          });
        });

        setHighlightedVaccines(highlightMap);
      })
      .catch(error => console.error("API fetch error: ", error));
  }, []);

  useEffect(() => {
    api.get("/Disease/get-all?PageSize=100")
      .then(response => {
        setDiseases(response.data.$values || response.data);
      })
      .catch(error => console.error("API fetch error: ", error));
  }, []);

  const months = Array.from({ length: 36 }, (_, i) => i + 1);

  // Hồ sơ trẻ emem
 


  useEffect(() => {
    const fetchChildDetail = async () => {
      try {
        const response = await api.get(`/Child/get-by-id/${id}`);
        setChildData(response.data);
        setGender(response.data.gender);
      } catch (err) {
        console.error("Error fetching child detail:", err);
      }
    };
    fetchChildDetail();
  }, [id]);

  const handleUpdate = async () => {
    try {
      const payload = {
        childrenFullname: childData.childrenFullname,
        dob: new Date(childData.dob).toISOString(),
        gender: childData.gender,
        fatherFullName: childData.fatherFullName,
        motherFullName: childData.motherFullName,
        fatherPhoneNumber: childData.fatherPhoneNumber,
        motherPhoneNumber: childData.motherPhoneNumber,
        address: childData.address,
      };
      await api.put(`/Child/update/${id}`, payload);
      setUpdateMessage("Cập nhật thành công!");
    } catch (err) {
      console.error("Error updating child detail:", err);
      setUpdateMessage("Cập nhật thất bại.");
    }
  };

  if (!childData) return <div className="loader"></div>;

  return (
    <div className="HomePage-Allcontainer">
      <div className="VaccinationPage container">
        <h3 className="text-center VaccinPage-Intro text-white p-2">LỊCH TIÊM CHỦNG CHO TRẺ TỪ 0-8 TUỔI</h3>
        <div className="table-responsive">
<table className="table table-bordered text-center">
  <thead className="table-primary">
    <tr>
      <th rowSpan={2} className="align-middle VaccinPage-Title">Vắc xin</th>
      {headers.map((month, index) => (
        <th key={index} className="align-middle VaccinPage-Title">{month}</th>
      ))}
    </tr>
  </thead>
  <tbody>
    {diseases.map((disease, index) => (
    <tr key={index}>
      <td className="align-middle VaccinPage-Name">{disease.name}</td>
      {headers.map((monthLabel, idx) => {
        if (idx === 0) return <td key={idx}></td>; // Bỏ qua "Sơ sinh"

        const month = idx; 
        const formattedMonth = `2025-${month.toString().padStart(2, "0")}`;

        // Kiểm tra dữ liệu từ VaccineTemplate
        const templateInfo = highlightedVaccines[month]?.find(v => v.diseaseId === disease.id);
        const hasTemplateVaccine = !!templateInfo;
        const note = templateInfo?.notes || "";

        // Kiểm tra lịch tiêm thực tế
        const vaccination = vaccinationRecords.find(
          
          record => record.diseaseId === disease.id && record.expectedInjectionDate.includes(formattedMonth)
        );

        return (
          <td
            key={idx}
            className="align-middle position-relative"
            onClick={() => handleCellClick(disease, month)}
            style={{
              cursor: "pointer",
              backgroundColor: vaccination ? "#c8e6c9" : hasTemplateVaccine ? "#ffeb3b" : "",
              position: "relative",
            }}
          >
            {vaccination ? "✔️" : hasTemplateVaccine ? "" : ""}
            
            
            {hasTemplateVaccine && (
              <div className="tooltip-box">
                {note}
              </div>
            )}
          </td>
        );
      })}
    </tr>
  ))}
  </tbody>


  
</table>

{/* <table className="table table-bordered text-center">
  <thead className="table-primary">
    <tr>
      <th rowSpan={2} className="align-middle VaccinPage-Title">Vắc xin</th>
      {headers.map((month, index) => (
        <th key={index} className="align-middle VaccinPage-Title">{month}</th>
      ))}
    </tr>
  </thead>
  <tbody>
    {diseases.map((disease, index) => (
      <tr key={index}>
        <td className="align-middle VaccinPage-Name">{disease.name}</td>
        {headers.map((monthLabel, idx) => {
          if (idx === 0) return <td key={idx}></td>; // Bỏ qua "Sơ sinh"

          const month = idx; 
          const formattedMonth = `2025-${month.toString().padStart(2, "0")}`;

          // Kiểm tra dữ liệu từ VaccineTemplate
          const templateInfo = highlightedVaccines[month]?.find(v => v.diseaseId === disease.id);
          const hasTemplateVaccine = !!templateInfo;
          const note = templateInfo?.notes || "";

          // Kiểm tra lịch tiêm thực tế
          const vaccination = vaccinationRecords.find(record => record.diseaseId === disease.id);

          // Tính số tháng lệch giữa actualInjectionDate và expectedInjectionDate
          let actualMonthDifference = null;
          let displayMonth = null;
          if (vaccination && vaccination.expectedInjectionDate && vaccination.actualInjectionDate) {
            const expectedDate = new Date(vaccination.expectedInjectionDate);
            const actualDate = new Date(vaccination.actualInjectionDate);

            actualMonthDifference =
              (actualDate.getFullYear() - expectedDate.getFullYear()) * 12 +
              (actualDate.getMonth() - expectedDate.getMonth());

            // Tìm tháng hiển thị đúng vị trí lệch
            displayMonth = (expectedDate.getMonth() + 1) - actualMonthDifference; 
          }

          return (
            <td
              key={idx}
              className="align-middle position-relative"
              onClick={() => handleCellClick(disease, month)}
              style={{
                cursor: "pointer",
                backgroundColor: (vaccination && displayMonth === month) 
                  ? "#c8e6c9" // Màu xanh nếu có lịch tiêm
                  : hasTemplateVaccine ? "#ffeb3b" : "",
                position: "relative",
              }}
            >
             
              {vaccination && displayMonth === month ? `✔️  ` : ""}
              
              
              {hasTemplateVaccine && (
                <div className="tooltip-box">
                  {note}
                </div>
              )}
            </td>
          );
        })}
      </tr>
    ))}
  </tbody>
</table> */}


        </div>
      </div>
      
               {/* Vaccinee Information Form */}
               <div className="container">
               <div className="row">
           <div className="col-12">
             <div className="mt-4">
               <div className="BookingPage-tuade">THÔNG TIN NGƯỜI TIÊM:</div>
             </div>
             <div className="VaccinPage-TTlIENHE">
               <div className="CreatechildPage-content-kk">
                 <div className="CreatechildPage-address">
                   <div className="VaccinationPage-Name">*Họ tên người tiêm:</div>
                  <input
                    className="VaccinationPage-input"
                    placeholder="Họ tên"
                    value={childData.childrenFullname}
                    onChange={(e) =>
                      setChildData({ ...childData, childrenFullname: e.target.value })
                    }
                  />
                </div>
                <div className="CreatechildPage-address">
                  <div className="VaccinationPage-Name">*Ngày sinh của bé:</div>
                  <input
                    className="VaccinationPage-input"
                    placeholder="dd/mm/yyyy"
                    value={childData.dob ? childData.dob.substring(0, 10) : ""}
                    onChange={(e) =>
                      setChildData({ ...childData, dob: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="CreatechildPage-content-kk">
                <div className="CreatechildPage-address">
                  <div className="VaccinationPage-Name">*Giới tính:</div>
                  <div className="VaccinationPage-custom-select">
                    <span
                      className={`CreatechildPage-custom-option ${gender === "Nam" ? "selected" : ""}`}
                      onClick={() => {
                        setGender("Nam");
                        setChildData({ ...childData, gender: "Nam" });
                      }}
                    >
                      Nam
                    </span>
                    <span
                      className={`CreatechildPage-custom-option ${gender === "Nữ" ? "selected" : ""}`}
                      onClick={() => {
                        setGender("Nữ");
                        setChildData({ ...childData, gender: "Nữ" });
                      }}
                    >
                      Nữ
                    </span>
                  </div>
                </div>
                <div className="CreatechildPage-address">
                  <div className="VaccinationPage-Name">*Họ tên cha:</div>
                  <input
                    className="VaccinationPage-input"
                    placeholder="Họ tên cha"
                    value={childData.fatherFullName}
                    onChange={(e) =>
                      setChildData({ ...childData, fatherFullName: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="CreatechildPage-content-kk">
                <div className="CreatechildPage-address">
                  <div className="VaccinationPage-Name">*Địa chỉ:</div>
                  <input
                    className="VaccinationPage-input"
                    placeholder="Địa chỉ"
                    value={childData.address}
                    onChange={(e) =>
                      setChildData({ ...childData, address: e.target.value })
                    }
                  />
                </div>
                <div className="CreatechildPage-address">
                  <div className="VaccinationPage-Name">*Họ tên mẹ:</div>
                  <input
                    className="VaccinationPage-input"
                    placeholder="Họ tên mẹ"
                    value={childData.motherFullName}
                    onChange={(e) =>
                      setChildData({ ...childData, motherFullName: e.target.value })
                    }
                  />
                </div>
                <div className="CreatechildPage-address">
                  <div className="VaccinationPage-Name">*Số điện thoại mẹ:</div>
                  <input
                    className="VaccinationPage-input"
                    placeholder="Số điện thoại mẹ"
                    value={childData.motherPhoneNumber}
                    onChange={(e) =>
                      setChildData({ ...childData, motherPhoneNumber: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="CreatechildPage-content-kk">
                <div className="CreatechildPage-address">
                  <div className="VaccinationPage-Name">*Số điện thoại ba:</div>
                  <input
                    className="VaccinationPage-inputPhone"
                    placeholder="Số điện thoại cha"
                    value={childData.fatherPhoneNumber}
                    onChange={(e) =>
                      setChildData({ ...childData, fatherPhoneNumber: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="VaccinPage-flex">
                <div className="BookingPage-button" onClick={handleUpdate}>
                  CẬP NHẬT THÔNG TIN
                </div>
              </div>
              <div className="VaccinPage-flex">
                {updateMessage && <p>{updateMessage}</p>}
              </div>
            </div>
          </div>
        </div>
               </div>

      {showModal && (
  <div className="modal-overlay">
    <div className="modal-content">
      <h4>Cập nhật vaccine cho bệnh: {selectedDisease?.name} tại tháng {selectedMonth}</h4>
      <div className="form-group">
        <label><strong>Chọn Vaccine:</strong></label>
        <select
          className="form-control"
          value={selectedVaccine}
          onChange={(e) => setSelectedVaccine(e.target.value)}
        >
          <option value="">Chọn vaccine</option>
          {vaccineList.map((vaccine) => (
            <option key={vaccine.id} value={vaccine.name}>{vaccine.name}</option>
          ))}
        </select>
      </div>
      {selectedRecord && (
        <button className="btn btn-danger mt-2" onClick={() => handleDelete(selectedRecord.id)}>
          Xóa mũi tiêm
        </button>
      )}
      <div className="modal-buttons">
        <button className="btn btn-secondary" onClick={() => setShowModal(false)}>
          Đóng
        </button>
        <button className="btn btn-primary" onClick={handleSave}>
          Lưu
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default VaccinationSchedule;


