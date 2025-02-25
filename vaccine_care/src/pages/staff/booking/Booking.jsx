import "./Booking.css";
import { useState } from "react";
import { Table } from "antd";

const Booking = () => {
  const headers = [
    "",
    "2",
    "3",
    "4",
    "6",
    "7",
    "8",
    "9",
    "10-11",
    "12",
    "18",
    "2",
    "3-4",
    "5-6",
    "7-8",
  ];
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
    "Viêm màng não, nhiễm khuẩn huyết, viêm phổi do não mô cầu khuẩn A,C,W,Y",
  ];
  const [data, setData] = useState([
    {
      id: "VN123",
      fullname: "Nguyen Van A",
      date: "15/02/2025",
      vaccine: "Sextaron",
    },
  ]);

  const columns = [
    {
      title: "Mã số",
      dataIndex: "id",
      render: (id) => id || "N/A",
      width: "10%",
    },
    {
      title: "Tên bé",
      dataIndex: "fullname",
      width: "20%",
      render: (fullname) => fullname || "N/A",
    },
    {
      title: "Ngày tiêm",
      dataIndex: "date",
      width: "15%",
      render: (date) => date || "N/A",
    },
    {
      title: "Vắc xin",
      dataIndex: "vaccine",
      width: "20%",
      render: (vaccine) => vaccine || "N/A",
    },
  ];
  return (
    <div className="booking">
      <h3> Đặt Lịch Tiêm</h3>
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        rowKey={(record) => record.id}
      />

      <h3> Sổ tiêm chủng</h3>

      <div className="table-responsive">
        <table className="table table-bordered text-center">
          <thead className="table-primary">
            {/* Dòng 1: Nhóm tiêu đề Tháng và Tuổi */}
            <tr>
              <th rowSpan={2} className="align-middle VaccinPage-Title">
                Vắc xin
              </th>
              <th rowSpan={0} className="align-middle VaccinPage-Title ">
                Sơ sinh
              </th>
              <th colSpan={10} className="align-middle VaccinPage-Title">
                Tháng
              </th>
              <th colSpan={4} className="align-middle VaccinPage-Title">
                Tuổi
              </th>
            </tr>
            {/* Dòng 2: Các tháng và tuổi cụ thể */}
            <tr>
              {headers.slice(1).map((month, index) => (
                <th key={index} className="align-middle VaccinPage-Title">
                  {month}
                </th>
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
  );
};

export default Booking;
