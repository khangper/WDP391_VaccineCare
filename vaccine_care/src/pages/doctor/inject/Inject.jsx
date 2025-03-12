import { useEffect, useState } from "react";
import "./Inject.css";
import axios from "axios";
import { div } from "framer-motion/client";
import { notification } from "antd";
import api from "../../../services/api";

const Inject = ({ record }) => {
  const [appointment, setAppointment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [confirming, setConfirming] = useState(false);
  const [childId, setChildId] = useState(null);
  const [vaccinationProfileId, setVaccinationProfileId] = useState(null);
  const [vaccinationRecords, setVaccinationRecords] = useState([]);
  const [diseases, setDiseases] = useState([]);
  const [vaccineList, setVaccineList] = useState([]);
  const [highlightedVaccines, setHighlightedVaccines] = useState({});
  const [selectedDisease, setSelectedDisease] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedVaccine, setSelectedVaccine] = useState("");
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const headers = [
    " ",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
  ];

  useEffect(() => {
    const fetchAppointment = async () => {
      try {
        const response = await axios.get(
          `https://vaccinecare.azurewebsites.net/api/Appointment/get-by-id/${record.id}`
        );
        setAppointment(response.data);
      } catch (error) {
        console.error(
          "Lỗi:",
          error.response ? error.response.data.message : error.message
        );
      } finally {
        setLoading(false);
      }
    };

    if (record.id) {
      fetchAppointment();
    }
  }, [record.id]);

  // Lấy childId từ API Child dựa vào childFullName trong appointment
  useEffect(() => {
    if (!appointment?.childFullName) return;

    const fetchChildId = async () => {
      try {
        const response = await axios.get(
          "https://vaccinecare.azurewebsites.net/api/Child/get-all?PageSize=100"
        );
        const matchedChild = response.data?.$values.find(
          (child) => child.childrenFullname === appointment.childFullName
        );

        if (matchedChild) {
          setChildId(matchedChild.id);
        } else {
          console.warn(
            "Không tìm thấy trẻ em với tên:",
            appointment.childFullName
          );
        }
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu trẻ em:", error);
      }
    };

    fetchChildId();
  }, [appointment?.childFullName]);

  // Khi đã có childId, gọi API để lấy thông tin tiêm chủng
  useEffect(() => {
    const fetchVaccinationProfile = async () => {
      if (!childId) return;

      try {
        const url = `https://vaccinecare.azurewebsites.net/api/VaccinationProfile/get-all?FilterOn=childrenId&FilterQuery=${childId}&PageSize=100`;
        const response = await fetch(url);
        const result = await response.json();

        if (result?.$values?.length > 0) {
          setVaccinationProfileId(result.$values[0].id); // Lấy ID tiêm chủng đầu tiên
        }
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu tiêm chủng:", error);
      }
    };

    fetchVaccinationProfile();
  }, [childId]);

  useEffect(() => {
    if (vaccinationProfileId) {
      api
        .get(
          `/VaccinationDetail/get-all?FilterOn=vaccinationProfileId&FilterQuery=${vaccinationProfileId}&PageSize=100`
        )
        .then((response) => {
          const records = response.data.$values || [];
          setVaccinationRecords(records);
        })
        .catch((error) =>
          console.error("Error fetching vaccination data:", error)
        );
    }
  }, [vaccinationProfileId]);

  //Disease
  useEffect(() => {
    api
      .get("/Disease/get-all?PageSize=30")
      .then((response) => setDiseases(response.data.$values || response.data))
      .catch((error) => console.error("API fetch error: ", error));
  }, []);

  //Vaccine
  useEffect(() => {
    api
      .get("/Vaccine/get-all")
      .then((response) =>
        setVaccineList(response.data.$values || response.data)
      )
      .catch((error) => console.error("API fetch error: ", error));
  }, []);

  useEffect(() => {
    if (vaccinationProfileId) {
      api
        .get(`/VaccineTemplate/get-by-profileid/${vaccinationProfileId}`)
        .then((response) => {
          const vaccineData = response.data.$values || response.data;
          const highlightMap = {};

          vaccineData.forEach((vaccine) => {
            if (!highlightMap[vaccine.month]) {
              highlightMap[vaccine.month] = [];
            }
            highlightMap[vaccine.month].push({
              diseaseId: vaccine.diseaseId,
              notes: vaccine.notes,
              expectedInjectionDate: vaccine.expectedInjectionDate, // Thêm ngày dự kiến
            });
          });

          setHighlightedVaccines(highlightMap);
        })
        .catch((error) => console.error("API fetch error: ", error));
    }
  }, [vaccinationProfileId]);

  useEffect(() => {
    api
      .get("/Disease/get-all?PageSize=100")
      .then((response) => {
        setDiseases(response.data.$values || response.data);
      })
      .catch((error) => console.error("API fetch error: ", error));
  }, []);

  const months = Array.from({ length: 36 }, (_, i) => i + 1);

  //handle cell click
  const handleCellClick = (disease, month) => {
    setSelectedDisease(disease);
    setSelectedMonth(month);
    const existingRecord = vaccinationRecords.find(
      (record) => record.diseaseId === disease.id && record.month === month
    );

    setSelectedRecord(existingRecord || null);
    setSelectedVaccine(
      existingRecord
        ? vaccineList.find((v) => v.id === existingRecord.vaccineId)?.name
        : ""
    );
    console.log("Thông tin vaccine đã tiêm:", existingRecord);
    setShowModal(true);
  };

  //handle save
  // const handleSave = async () => {
  //   if (
  //     !selectedVaccine ||
  //     !selectedDisease ||
  //     !selectedMonth ||
  //     !vaccinationProfileId
  //   )
  //     return;

  //   const vaccineId = vaccineList.find((v) => v.name === selectedVaccine)?.id;
  //   const existingRecord = vaccinationRecords.find(
  //     (record) => record.diseaseId === selectedDisease.id
  //   );

  //   if (!existingRecord) {
  //     notification.error({
  //       message: "Không tìm thấy bản ghi tiêm chủng!",
  //     });
  //     return;
  //   }

  //   const updateRecord = {
  //     vaccineId: vaccineId || null,
  //     month: selectedMonth,
  //   };

  //   console.log("Dữ liệu gửi lên API:", updateRecord);

  //   try {
  //     const response = await api.put(
  //       `/VaccinationDetail/update/${existingRecord.id}`,
  //       updateRecord
  //     );

  //     if (response.status === 200 || response.status === 204) {
  //       notification.success({
  //         message: "Cập nhật thành công",
  //       });
  //       setVaccinationRecords((prev) =>
  //         prev.map((record) =>
  //           record.id === existingRecord.id
  //             ? { ...record, vaccineId, month: selectedMonth }
  //             : record
  //         )
  //       );
  //     } else {
  //       notification.error({
  //         message: "Cập nhật thất bại!",
  //       });
  //     }
  //   } catch (error) {
  //     console.error("Error updating vaccination:", error);
  //     notification.error({
  //       message: "Có lỗi xảy ra!",
  //     });
  //   }
  // };

  const handleCreate = async () => {
    if (
      !selectedVaccine ||
      !selectedDisease ||
      !selectedMonth ||
      !vaccinationProfileId
    )
      return;

    const vaccineId = vaccineList.find((v) => v.name === selectedVaccine)?.id;

    const newRecord = {
      childrenId: childId,
      diseaseId: selectedDisease.id,
      vaccineId: vaccineId || null,
      month: selectedMonth,
    };

    try {
      const response = await api.post(`/VaccinationDetail/create`, newRecord);

      if (response.status === 200) {
        notification.success({
          message: "Cập nhật mũi tiêm thành công",
        });

        // 🔄 Cập nhật lại danh sách mà không reload trang
        const updatedRecords = [
          ...vaccinationRecords,
          { ...newRecord, id: response.data.id },
        ];
        setVaccinationRecords(updatedRecords);

        setShowModal(false); // Đóng modal sau khi thêm thành công
      } else {
        notification.error({ message: "Có lỗi xảy ra!" });
      }
    } catch (error) {
      notification.error({ message: "Có lỗi xảy ra!" });
    }
  };

  //Delete
  const handleDelete = async (recordId) => {
    try {
      const response = await api.delete(
        `/VaccinationDetail/delete/${recordId}`
      );

      if (response.status === 200 || response.status === 204) {
        notification.success({
          message: "Xóa thành công!",
        });
        const updatedRecords = vaccinationRecords.filter(
          (record) => record.id !== recordId
        );
        setVaccinationRecords(updatedRecords);
        setShowModal(false);
      } else {
        notification.error({
          message: "Xóa thất bại!",
        });
      }
    } catch (error) {
      notification.error({
        message: "Có lỗi xảy ra!",
      });
    }
  };

  //Handle Confirm
  const handleConfirmInjection = async () => {
    if (!appointment) return;

    setConfirming(true);
    try {
      await axios.put(
        `https://vaccinecare.azurewebsites.net/api/Appointment/confirm-injection-by-doctor/${appointment.id}`
      );
      notification.success({
        message: "Xác nhận thành công",
      });
      setAppointment({ ...appointment, confirmed: true }); // Cập nhật UI sau khi xác nhận
    } catch (err) {
      notification.error({
        message:
          "Lỗi xác nhận tiêm: " +
          (err.response ? err.response.data.message : err.message),
      });
    } finally {
      setConfirming(false);
    }
  };

  if (loading) return <div className="loader"></div>;

  return (
    <div className="inject">
      <div className="inject-top">
        <h3>Tiêm Vaccine</h3>
        <div className="inject-container">
          <div className="inject-content">
            <p>
              <strong>Mã số:</strong> {appointment.id}
            </p>
            <p>
              <strong>Tên bé:</strong> {appointment.childFullName}
            </p>
            <p>
              <strong>Vắc xin:</strong> {appointment.vaccineName}
            </p>
          </div>
        </div>
        <button
          className="inject-btn"
          type="submit"
          onClick={handleConfirmInjection}
          disabled={confirming}
        >
          {confirming ? "Đang xác nhận..." : "Xác nhận đã tiêm"}
        </button>
      </div>

      <div className="inject-bottom">
        <h3>Sổ tiêm chủng</h3>
        <div className="table-responsive">
          <table className="table table-bordered text-center">
            <thead className="table-primary">
              {/* Dòng 1: Nhóm tiêu đề Tháng và Tuổi */}
              <tr>
                <th rowSpan={2} className="align-middle VaccinPage-Title">
                  Vắc xin
                </th>
                {headers.map((month, index) => (
                  <th key={index} className="align-middle VaccinPage-Title">
                    {month}
                  </th>
                ))}
              </tr>
              {/* Dòng 2: Các tháng và tuổi cụ thể */}
            </thead>
            <tbody>
              {diseases.map((disease, index) => (
                <tr key={index}>
                  <td className="align-middle VaccinPage-Name">
                    {disease.name}
                  </td>
                  {headers.map((monthLabel, idx) => {
                    if (idx === 0) return <td key={idx}></td>; // Bỏ qua "Sơ sinh"

                    const month = idx;

                    // Kiểm tra dữ liệu từ VaccineTemplate
                    const templateInfo = highlightedVaccines[month]?.find(
                      (v) => v.diseaseId === disease.id
                    );
                    const hasTemplateVaccine = !!templateInfo;
                    const note = templateInfo?.notes || "";
                    const expectedDate = templateInfo?.expectedInjectionDate
                      ? new Date(
                          templateInfo.expectedInjectionDate
                        ).toLocaleDateString()
                      : "Chưa có dữ liệu";

                    // Kiểm tra lịch tiêm thực tế (chỉ khi `month` đúng với dữ liệu)
                    const vaccination = vaccinationRecords.find(
                      (record) =>
                        record.diseaseId === disease.id &&
                        record.month === month
                    );

                    // Lấy tên vaccine đã tiêm (nếu có)
                    const injectedVaccine = vaccineList.find(
                      (v) => v.id === vaccination?.vaccineId
                    )?.name;

                    return (
                      <td
                        key={idx}
                        className="align-middle position-relative"
                        onClick={() => handleCellClick(disease, month)}
                        style={{
                          cursor: "pointer",
                          backgroundColor: vaccination?.vaccineId
                            ? "#c8e6c9" // Nếu đã tiêm thì tô màu xanh nhạt
                            : hasTemplateVaccine
                            ? "var(--primary-colorVaccine)" // Nếu có kế hoạch tiêm thì tô màu chủ đạo
                            : "",
                        }}
                      >
                        {/* Hiển thị tên vaccine đã tiêm phía trên dấu tick */}
                        {vaccination?.vaccineId && (
                          <div
                            style={{
                              fontSize: "12px",
                              fontWeight: "bold",
                              color: "#000",
                            }}
                          >
                            {injectedVaccine}
                          </div>
                        )}
                        {/* Chỉ hiển thị dấu tích nếu đã có vaccineId và đúng month */}
                        {vaccination?.vaccineId && vaccination?.month === month
                          ? "✔️"
                          : ""}

                        {/* Chỉ hiển thị tooltip nếu chưa tiêm nhưng có lịch tiêm */}
                        {!vaccination?.vaccineId && hasTemplateVaccine && (
                          <div className="tooltip-box">
                            <div>
                              <strong>Ghi chú:</strong> {note}
                            </div>
                            <div>
                              <strong>Ngày dự kiến:</strong> {expectedDate}
                            </div>
                          </div>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>

          <div className="VaccinPage-flex">
            <button type="submit" className="button-update-inject">
              Điều chỉnh mũi tiêm
            </button>
          </div>
        </div>
      </div>
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h4>
              Cập nhật vaccine cho bệnh: {selectedDisease?.name} tại tháng{" "}
              {selectedMonth}
            </h4>

            {selectedRecord && (
              <div>
                <p>
                  <strong>Ngày tiêm dự kiến:</strong>{" "}
                  {new Date(
                    selectedRecord.expectedInjectionDate
                  ).toLocaleDateString()}
                </p>
                {/* <p><strong>Ngày tiêm thực tế:</strong> {new Date(selectedRecord.actualInjectionDate).toLocaleDateString()}</p> */}
              </div>
            )}

            <div className="form-group">
              <label>
                <strong>Chọn Vaccine:</strong>
              </label>
              <select
                className="form-control"
                value={selectedVaccine}
                onChange={(e) => setSelectedVaccine(e.target.value)}
              >
                <option value="">Chọn vaccine</option>
                {vaccineList.map((vaccine) => (
                  <option key={vaccine.id} value={vaccine.name}>
                    {vaccine.name}
                  </option>
                ))}
              </select>
            </div>

            {selectedRecord && (
              <button
                className="btn btn-danger mt-2"
                onClick={() => handleDelete(selectedRecord.id)}
              >
                Xóa mũi tiêm
              </button>
            )}

            <div className="VaccinPage-flex1 modal-buttons">
              <button
                className="btn btn-secondary"
                onClick={() => setShowModal(false)}
              >
                Đóng
              </button>
              <button className="btn btn-success" onClick={handleCreate}>
                Lưu
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Inject;
