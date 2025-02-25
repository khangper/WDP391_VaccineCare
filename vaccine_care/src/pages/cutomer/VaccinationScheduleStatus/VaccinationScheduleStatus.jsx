import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function VaccinationScheduleStatus() {
  // Dữ liệu mẫu cho lịch tiêm
  const [schedules, setSchedules] = useState([
    {
      id: "SCH20250217",
      customer: "Đoàn Anh Khang",
      phone: "037477590",
      type: "Mũi lẻ",
      vaccine: "Vắc xin Sởi - Rubella",
      date: "2025-02-20",
      status: "Chờ tiêm",
    },
    {
      id: "SCH20250218",
      customer: "Nguyễn Văn A",
      phone: "0912345678",
      type: "Trọn gói",
      package: "Gói 5 trong 1 (Bạch hầu, Ho gà, Uốn ván, Bại liệt, Hib)",
      injections: [
        { vaccine: "Mũi 1 - Vắc xin 5 trong 1", date: "2025-02-15", status: "Đã tiêm" },
        { vaccine: "Mũi 2 - Vắc xin 5 trong 1", date: "2025-03-15", status: "Chờ tiêm" },
        { vaccine: "Mũi 3 - Vắc xin 5 trong 1", date: "2025-04-15", status: "Chờ tiêm" },
      ],
    },
  ]);

  // Hàm hiển thị trạng thái với màu sắc tương ứng
  const getStatusBadge = (status) => {
    switch (status) {
      case "Đã tiêm":
        return <span className="StatusVaccineShchedule-badge bg-success">✅ {status}</span>;
      case "Chờ tiêm":
        return <span className="StatusVaccineShchedule-badge bg-warning text-dark">⏳ {status}</span>;
      case "Bỏ lỡ":
        return <span className="StatusVaccineShchedule-badge bg-danger">❌ {status}</span>;
      default:
        return <span className="StatusVaccineShchedule-badge bg-secondary">{status}</span>;
    }
  };

  return (
    <div className="StatusVaccineShchedule-container container mt-5">
      <h2 className="StatusVaccineShchedule-title text-center mb-4">📅 Lịch Tiêm Vaccine</h2>

      {schedules.map((schedule, index) => (
        <div className="StatusVaccineShchedule-card card mb-4 shadow" key={index}>
          <div className="StatusVaccineShchedule-card-body card-body">
            <h5 className="StatusVaccineShchedule-card-title">{schedule.customer}</h5>
            <p><strong>SĐT:</strong> {schedule.phone}</p>
            <p><strong>Loại:</strong> {schedule.type}</p>

            {schedule.type === "Mũi lẻ" ? (
              <>
                <p><strong>Vắc xin:</strong> {schedule.vaccine}</p>
                <p><strong>Ngày tiêm:</strong> {schedule.date}</p>
                <p><strong>Trạng thái:</strong> {getStatusBadge(schedule.status)}</p>
              </>
            ) : (
              <>
                <p><strong>Gói tiêm:</strong> {schedule.package}</p>
                <table className="StatusVaccineShchedule-table table table-bordered">
                  <thead className="StatusVaccineShchedule-table-head table-dark">
                    <tr>
                      <th>Mũi tiêm</th>
                      <th>Ngày tiêm</th>
                      <th>Trạng thái</th>
                    </tr>
                  </thead>
                  <tbody>
                    {schedule.injections.map((inj, idx) => (
                      <tr key={idx}>
                        <td>{inj.vaccine}</td>
                        <td>{inj.date}</td>
                        <td>{getStatusBadge(inj.status)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default VaccinationScheduleStatus;
