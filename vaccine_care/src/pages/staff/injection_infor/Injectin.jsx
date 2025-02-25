import { useState } from "react";
import "./Injection.css";
import { Table } from "antd";
import { motion } from "framer-motion";
import Booking from "../booking/Booking";
import Confirm from "../confirm/Confirm";
import Invoice from "../invoice/Invoice";
import Inject from "../inject/Inject";
import Completed from "../completed/Completed";
import React from "react";


const Injection = () => {
  const [activeTab, setActiveTab] = useState("today");
  const [selectedRecord, setSelectedRecord] = useState(null);
  const steps = [
    {name: "Đặt lịch",component: Booking},
    {name: "Xác nhận",component: Confirm},
    {name: "Thanh toán",component: Invoice},
    {name: "Tiêm/Chờ",component: Inject},
    {name: "Hoàn Thành",component: Completed},
  ];
  const [currentStep, setCurrentStep] = useState(0);
  

  const statusMap = {
    pending: { label: "Chờ duyệt", className: "status_pending" },
    processing: { label: "Đang xử lý", className: "status_processing" },
    completed: { label: "Đã xong", className: "status_completed" },
    canceled: { label: "Đã hủy", className: "status_canceled" },
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleCancel = (id) => {
    setData((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, status: "canceled" } : item
      )
    );
    setData1((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, status: "canceled" } : item
      )
    );
  };

  const [data, setData] = useState([
    {
      id: "VN123",
      fullname: "Nguyen Van A",
      date: "15/02/2025",
      status: "pending",
    },
    {
      id: "VN234",
      fullname: "Nguyen Van B",
      date: "15/02/2025",
      status: "processing",
    },
    {
      id: "VN134",
      fullname: "Nguyen Van C",
      date: "15/02/2025",
      status: "completed",
    },
  ]);

  const [data1, setData1] = useState([
    {
      id: "VN123",
      fullname: "Nguyen Van A",
      date: "16/02/2025",
      status: "pending",
    },
    {
      id: "VN234",
      fullname: "Nguyen Van B",
      date: "17/02/2025",
      status: "processing",
    },
    {
      id: "VN134",
      fullname: "Nguyen Van C",
      date: "18/02/2025",
      status: "completed",
    },
  ]);

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
        <span className={`status_label ${statusMap[status].className}`}>
          {statusMap[status].label}
        </span>
      ),
    },

    {
      title: "Chi tiết",
      width: "15%",
      render: (_, record) => (
        <div className="inject_detail">
      <button
        className={`injection_detail_button ${record.status === "canceled" ? "disabled-button" : ""}`}
        onClick={() => record.status !== "canceled" && setSelectedRecord(record)}
        disabled={record.status === "canceled"}
      >
        Chi tiết
      </button>
      <button
        className={`injection_cancel_button ${record.status === "canceled" ? "disabled-button" : ""}`}
        onClick={() => record.status !== "canceled" && handleCancel(record.id)}
        disabled={record.status === "canceled"}
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
          dataSource={activeTab === "today" ? data : data1}
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
              {React.createElement(steps[currentStep].component, { record: selectedRecord })}
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
