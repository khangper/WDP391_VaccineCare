import { useEffect, useState } from "react";
import "./Injection.css";
import { Table } from "antd";
import { motion } from "framer-motion";
import Booking from "../booking/Booking";
import Confirm from "../confirm/Confirm";
import Invoice from "../invoice/Invoice";
import Inject from "../inject/Inject";
import Completed from "../completed/Completed";
import React from "react";
import axios from "axios";

const Injection = () => {
  const [activeTab, setActiveTab] = useState("today");
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [data, setData] = useState([]);
  const steps = [
    { name: "Đặt lịch", component: Booking },
    { name: "Xác nhận", component: Confirm },
    { name: "Thanh toán", component: Invoice },
    { name: "Tiêm/Chờ", component: Inject },
    { name: "Hoàn Thành", component: Completed },
  ];
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [appointmentDetails, setAppointmentDetails] = useState(null);

  useEffect(() => {
    if (activeTab === "today") {
      fetchAppointments(
        "https://vaccinecare.azurewebsites.net/api/Appointment/get-appointment-today"
      );
    } else {
      fetchAppointments(
        "https://vaccinecare.azurewebsites.net/api/Appointment/get-appointment-future"
      );
    }
  }, [activeTab]);

  const fetchAppointments = async (url) => {
    setLoading(true);
    try {
      const response = await axios.get(url);
      if (response.data.$values) {
        const formattedData = response.data.$values.map((item, index) => {
          const date = new Date(item.dateInjection);
          return {
            id: item.id,
            fullname: item.childFullName,
            date: date.toLocaleDateString("vi-VN"),
            status: item.status,
            step: item.step || 0,
          };
        });
        setData(formattedData);
      }
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAppointmentDetails = async (id) => {
    try {
      const response = await axios.get(
        `https://vaccinecare.azurewebsites.net/api/Appointment/get-by-id/${id}`
      );
      setAppointmentDetails(response.data); // Lưu dữ liệu chi tiết
    } catch (error) {
      console.error("Lỗi khi lấy chi tiết cuộc hẹn:", error);
    }
  };

  const handleDetails = (record) => {
    setSelectedRecord(record);
    fetchAppointmentDetails(record.id); // Lấy thông tin chi tiết
    setCurrentStep(record.step || 0); // Nếu record đã có step thì giữ nguyên, nếu chưa có thì đặt 0
  };

  const statusMap = {
    Pending: { label: "Chờ duyệt", className: "status_pending" },
    Processing: { label: "Đang xử lý", className: "status_processing" },
    Completed: { label: "Đã xong", className: "status_completed" },
    Canceled: { label: "Đã hủy", className: "status_canceled" },
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
      setSelectedRecord((prev) => ({ ...prev, step: (prev?.step || 0) + 1 }));
      setData((prevData) =>
        prevData.map((item) =>
          item.id === selectedRecord.id
            ? { ...item, step: (selectedRecord.step || 0) + 1 }
            : item
        )
      );
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
      setSelectedRecord((prev) => ({ ...prev, step: (prev?.step || 0) - 1 }));
      setData((prevData) =>
        prevData.map((item) =>
          item.id === selectedRecord.id
            ? { ...item, step: (selectedRecord.step || 0) - 1 }
            : item
        )
      );
    }
  };

  const handleCancel = async (id) => {
    try {
      const response = await axios.put(
        `https://vaccinecare.azurewebsites.net/api/Appointment/update-appointment-staff?id=${id}`,
        {
          status: "Cancel",
          doctorName: "",
          roomNumber: ""
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        // Cập nhật UI sau khi API thành công
        setData((prevData) =>
          prevData.map((item) =>
            item.id === id ? { ...item, status: "Canceled" } : item
          )
        );
        
      }
    } catch (error) {
      console.error("Lỗi khi hủy cuộc hẹn:", error);
      
    }
  };

  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
      total: 0,
    },
  });

  const columns = [
    {
      title: "No.",
      width: "7%",
      render: (_, __, index) =>
        (tableParams.pagination.current - 1) * tableParams.pagination.pageSize +
        index +
        1,
    },
    {
      title: "Mã số",
      dataIndex: "id",
      render: (id) => id || "N/A",
      width: "10%",
    },
    {
      title: "Tên bé",
      dataIndex: "fullname",
      sorter: (a, b) => (a.fullname || "").localeCompare(b.fullname || ""),
      width: "20%",
      render: (fullname) => fullname || "N/A",
    },
    {
      title: "Ngày tiêm",
      dataIndex: "date",
      width: "15%",
      sorter: (a, b) => (a.date || "").localeCompare(b.date || ""),
      render: (date) => date || "N/A",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      width: "15%",
      render: (status) => (
        <span className={`status_label ${statusMap[status]?.className || ""}`}>
          {statusMap[status]?.label || "Không xác định"}
        </span>
      ),
    },

    {
      title: "Chi tiết",
      width: "15%",
      render: (_, record) => (
        <div className="inject_detail">
          <button
            className={`injection_detail_button ${
              record.status === "Canceled" ? "disabled-button" : ""
            }`}
            onClick={() =>
              record.status !== "Canceled" && handleDetails(record)
            }
            disabled={record.status === "Canceled"}
          >
            Chi tiết
          </button>
          <button
            className={`injection_cancel_button ${
              record.status === "Canceled" ? "disabled-button" : ""
            }`}
            onClick={() =>
              record.status !== "Canceled" && handleCancel(record.id)
            }
            disabled={record.status === "Canceled"}
          >
            Hủy
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="injection">
      <h2 className="injection_topic">Danh sách đăng ký tiêm</h2>
      {/* Tab Header */}
      <div className="injection_tab_container">
        <button
          className={`injection_tab_button ${
            activeTab === "today" ? "active" : ""
          }`}
          onClick={() => setActiveTab("today")}
        >
          Hôm nay
        </button>
        <button
          className={`injection_tab_button ${
            activeTab === "upcoming" ? "active" : ""
          }`}
          onClick={() => setActiveTab("upcoming")}
        >
          Sắp tới
        </button>
      </div>

      <div className="injection_tab_content">
        <Table
          columns={columns}
          rowKey={(record) => record.id}
          dataSource={data}
          loading={loading}
        />
      </div>
      {selectedRecord && (
        <div className="popup_overlay" onClick={() => setSelectedRecord(null)}>
          <div className="popup_container" onClick={(e) => e.stopPropagation()}>
            <button
              className="popup_close"
              onClick={() => setSelectedRecord(null)}
            >
              ✖
            </button>
            <div className="popup_content">
              <h3>Theo dõi tiến trình</h3>
              <div className="step-container">
                {steps.map((step, index) => (
                  <div key={index} className="step-wrapper">
                    <motion.div
                      className={`step-circle ${
                        index <= currentStep ? "active" : "inactive"
                      }`}
                      animate={{ scale: index === currentStep ? 1.2 : 1 }}
                    >
                      {index < currentStep ||
                      (index === steps.length - 1 &&
                        currentStep === steps.length - 1)
                        ? "✔"
                        : index + 1}
                    </motion.div>
                    <span
                      className={`step-label ${
                        index <= currentStep ? "active-text" : "inactive-text"
                      }`}
                    >
                      {step.name}
                    </span>
                  </div>
                ))}
                <motion.div
                  className="progress-bar"
                  style={{
                    width: `${(currentStep / (steps.length - 1)) * 100}%`,
                  }}
                  initial={{ width: 0 }}
                  animate={{
                    width: `${(currentStep / (steps.length - 1)) * 100}%`,
                  }}
                />
              </div>

              <div className="step-content">
                {steps[currentStep] ? (
                  React.createElement(steps[currentStep].component, {
                    record: selectedRecord,
                    details: appointmentDetails,
                  })
                ) : (
                  <p>Đang tải...</p>
                )}
              </div>

              <div className="button-group">
                <button
                  className="prev-button"
                  onClick={prevStep}
                  disabled={currentStep === 0}
                >
                  Trở lại
                </button>
                <button
                  className="next-button"
                  onClick={nextStep}
                  disabled={currentStep >= steps.length - 1}
                >
                  Tiếp theo
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Injection;
