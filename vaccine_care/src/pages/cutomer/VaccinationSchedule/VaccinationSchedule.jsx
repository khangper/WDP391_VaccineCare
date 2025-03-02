import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./VaccinationSchedule.css";
import api from "../../../services/api";

const VaccinationSchedule = () => {
  const { id } = useParams(); // Grab the id from the URL
  const [childData, setChildData] = useState(null);
  const [error, setError] = useState(null);
  const [gender, setGender] = useState("");
  const [updateMessage, setUpdateMessage] = useState("");
  const [diseases, setDiseases] = useState([]);
  const [selectedDisease, setSelectedDisease] = useState(null);
  const [selectedVaccineId, setSelectedVaccineId] = useState("");
  const headers = ["", "Sơ sinh", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];

  // Fetch child details
  useEffect(() => {
    const fetchChildDetail = async () => {
      try {
        const response = await api.get(`/Child/get-by-id/${id}`);
        setChildData(response.data);
        setGender(response.data.gender);
      } catch (err) {
        console.error("Error fetching child detail:", err);
        setError("Error fetching data.");
      }
    };

    fetchChildDetail();
  }, [id]);

  // Fetch diseases data from API
  useEffect(() => {
    const fetchDiseases = async () => {
      try {
        const response = await api.get("/Disease/get-all?PageSize=30", {
          params: { PageSize: 30 },
        });

        // Kiểm tra xem dữ liệu có "$values" không
        setDiseases(response.data?.$values || response.data);
      } catch (error) {
        console.error("API fetch error: ", error);
      }
    };

    fetchDiseases();
  }, []);
 // Function to calculate age (in years) from DOB
 const calculateAge = (dob) => {
  const birthDate = new Date(dob);
  const diff = Date.now() - birthDate.getTime();
  const ageDate = new Date(diff);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
};

const handleRowClick = (disease) => {
  setSelectedDisease(disease);
  // Optionally, reset selected vaccine when a new row is clicked
  setSelectedVaccineId("");
};

const handleSave = () => {
  // Insert update logic here (e.g., API call to save the selected vaccine id for the disease)
  console.log("Saving update for disease id:", selectedDisease.id, "with vaccine id:", selectedVaccineId);
  // Close the modal after saving
  setSelectedDisease(null);
};

const handleClose = () => {
  setSelectedDisease(null);
};

  if (error) return <div className="alert alert-danger">{error}</div>;
  if (!childData) return <div>Loading...</div>;
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
  return (
    <div className="HomePage-Allcontainer">
      {/* Child Profile Section */}
      <div className="HomePage-main-container">
        <div className="container">
          <div className="row">
            <div className="col-12 mt-152 BookingPage-titletitle">
              <div className="BookingPage-heading-protected-together">Hồ Sơ trẻ</div>
            </div>
          </div>
        </div>
      </div>
      {/* Vaccination Schedule Table */}
      <div className="VaccinationPage container">
        <div className="row">
          <div className="col-12">
            <div className="mt-4">
              <div className="BookingPage-tuade">Hồ sơ tiêm chủng:</div>
              <div className="VaccinationPage-des">
                Người giám hộ có thể đánh dấu X vào các Vaccin mà bé đã được tiêm trước đó:
              </div>
            </div>
            <div className="container mt-4">
              <h3 className="text-center VaccinPage-Intro text-white p-2">
                LỊCH TIÊM CHỦNG CHO TRẺ TỪ 0-8 TUỔI
              </h3>
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
                      <tr 
                        key={index} 
                        onClick={() => handleRowClick(disease)} 
                        style={{ cursor: "pointer" }}
                      >
                        <td className="align-middle VaccinPage-Name">{disease.name}</td>
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
              <div className="BookingPage-button">CẬP NHẬT MŨI TIÊM</div>
            </div>
          </div>
        </div>
        {/* Vaccinee Information Form */}
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

      {/* Modal Popup for updating vaccine info */}
      {selectedDisease && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h4>Cập nhật vaccine cho bệnh: {selectedDisease.name}</h4>
            <p><strong>Disease ID:</strong> {selectedDisease.id}</p>
            <p>
              <strong>Ngày sinh bé:</strong> {childData.dob.substring(0, 10)} (
              {calculateAge(childData.dob)} năm tuổi)
            </p>
            <div className="form-group">
              <label htmlFor="vaccineSelect"><strong>Chọn Vaccine:</strong></label>
              <select
                id="vaccineSelect"
                className="form-control"
                value={selectedVaccineId}
                onChange={(e) => setSelectedVaccineId(e.target.value)}
              >
                {/* If the disease object has vaccine options, show them here.
                    Otherwise, show a placeholder option. */}
                {selectedDisease.vaccines &&
                selectedDisease.vaccines.$values &&
                selectedDisease.vaccines.$values.length > 0 ? (
                  selectedDisease.vaccines.$values.map((vaccine) => (
                    <option key={vaccine.id} value={vaccine.id}>
                      {vaccine.name}
                    </option>
                  ))
                ) : (
                  <option value="">Không có vaccine</option>
                )}
              </select>
            </div>
            <div className="modal-buttons">
              <button className="btn btn-secondary" onClick={handleClose}>
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



// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "./VaccinationSchedule.css";
// import api from "../../../services/api";

// const VaccinationSchedule = () => {
//   const { id } = useParams();
//   const [childData, setChildData] = useState(null);
//   const [error, setError] = useState(null);
//   const [diseases, setDiseases] = useState([]);
//   const [vaccinationRecords, setVaccinationRecords] = useState([]);
//   const [selectedDisease, setSelectedDisease] = useState(null);
//   const [selectedMonth, setSelectedMonth] = useState(null);
//   const [selectedVaccine, setSelectedVaccine] = useState("");
//   const [vaccineList, setVaccineList] = useState([]);
  
//   const headers = [ "Sơ sinh", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];

//   // Fetch child details
//   useEffect(() => {
//     const fetchChildDetail = async () => {
//       try {
//         const response = await api.get(`/Child/get-by-id/${id}`);
//         setChildData(response.data);
//       } catch (err) {
//         console.error("Error fetching child detail:", err);
//         setError("Error fetching data.");
//       }
//     };

//     fetchChildDetail();
//   }, [id]);

//   // Fetch diseases data from API
// useEffect(() => {
//   const fetchDiseases = async () => {
//     try {
//       const response = await api.get("/Disease/get-all?PageSize=30", {
//         params: { PageSize: 30 },
//       });

//       // Kiểm tra xem dữ liệu có "$values" không
//       setDiseases(response.data?.$values || response.data);
//     } catch (error) {
//       console.error("API fetch error: ", error);
//     }
//   };

//   fetchDiseases();
// }, []);

//   // Fetch vaccination records from MockAPI
//   useEffect(() => {
//     fetch("https://6773bdd177a26d4701c6355f.mockapi.io/vaccineTable")
//       .then(response => response.json())
//       .then(data => setVaccinationRecords(data))
//       .catch(error => console.error("Error fetching vaccination data:", error));
//   }, []);

//   // Fetch vaccine list
//   useEffect(() => {
//     fetch("https://vaccinecare.azurewebsites.net/api/Vaccine/get-all")
//       .then(response => response.json())
//       .then(data => {
//         if (data && data.$values) {
//           setVaccineList(data.$values);
//         } else {
//           setVaccineList(data);
//         }
//       })
//       .catch(error => console.error("API fetch error: ", error));
//   }, []);

//   // Handle cell click (open modal)
//   const handleCellClick = (disease, month) => {
//     setSelectedDisease(disease);
//     setSelectedMonth(month);
//     setSelectedVaccine("");
//   };

//   // Handle saving vaccination record
//   const handleSave = async () => {
//     if (!selectedVaccine || !selectedDisease || !selectedMonth) return;

//     const newRecord = {
//       disease: selectedDisease.name,
//       vaccinations: { month: parseInt(selectedMonth), dose: selectedVaccine, status: true }
//     };

//     try {
//       const response = await fetch("https://6773bdd177a26d4701c6355f.mockapi.io/vaccineTable", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(newRecord)
//       });

//       if (response.ok) {
//         const newData = await response.json();
//         setVaccinationRecords([...vaccinationRecords, newData]);
//         setSelectedDisease(null);
//         setSelectedMonth(null);
//       }
//     } catch (error) {
//       console.error("Error updating vaccination:", error);
//     }
//   };

//   return (
//     <div className="HomePage-Allcontainer">
//       <div className="VaccinationPage container">
//         <h3 className="text-center VaccinPage-Intro text-white p-2">
//           LỊCH TIÊM CHỦNG CHO TRẺ TỪ 0-8 TUỔI
//         </h3>
//         <div className="table-responsive">
//           <table className="table table-bordered text-center">
//             <thead className="table-primary">
//               <tr>
//                 <th rowSpan={2} className="align-middle VaccinPage-Title">Vắc xin</th>
//                 {headers.map((month, index) => (
//                   <th key={index} className="align-middle VaccinPage-Title">{month}</th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody>
//               {diseases.map((disease, index) => (
//                 <tr key={index}>
//                   <td className="align-middle VaccinPage-Name">{disease.name}</td>
//                   {headers.map((monthLabel, idx) => {
//                     if (idx === 0) return <td key={idx}></td>;
//                     const month = idx;

//                     const vaccination = vaccinationRecords.find(
//                       (record) => record.disease === disease.name && record.vaccinations.month === month
//                     );

//                     return (
//                       <td 
//                         key={idx} 
//                         className="align-middle"
//                         onClick={() => handleCellClick(disease, month)}
//                         style={{ cursor: "pointer", backgroundColor: vaccination ? "#c8e6c9" : "" }}
//                       >
//                         {vaccination && vaccination.vaccinations.status ? "✔️" : ""}
//                       </td>
//                     );
//                   })}
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* Modal Popup for updating vaccine info */}
//       {selectedDisease && selectedMonth && (
//         <div className="modal-overlay">
//           <div className="modal-content">
//             <h4>Cập nhật vaccine cho bệnh: {selectedDisease.name} tại tháng {selectedMonth}</h4>
//             <div className="form-group">
//               <label><strong>Chọn Vaccine:</strong></label>
//               <select
//                 className="form-control"
//                 value={selectedVaccine}
//                 onChange={(e) => setSelectedVaccine(e.target.value)}
//               >
//                 <option value="">Chọn vaccine</option>
//                 {vaccineList.map((vaccine) => (
//                   <option key={vaccine.id} value={vaccine.name}>{vaccine.name}</option>
//                 ))}
//               </select>
//             </div>
//             <div className="modal-buttons">
//               <button className="btn btn-secondary" onClick={() => { setSelectedDisease(null); setSelectedMonth(null); }}>
//                 Đóng
//               </button>
//               <button className="btn btn-primary" onClick={handleSave}>
//                 Lưu
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default VaccinationSchedule;
