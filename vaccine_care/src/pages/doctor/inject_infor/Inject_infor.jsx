import React, { useState } from "react";
import Inject from "../Inject/Inject";

import { Table } from "antd";
import { motion } from "framer-motion";
import "./Inject_infor.css"
import Completed from "../../staff/completed/Completed";

const Inject_infor = () => {
  const [selectedRecord, setSelectedRecord] = useState(null);
  const steps = [
    { name: "Tiêm", component: Inject },
    { name: "Hoàn Thành", component: Completed },
  ];
  const [currentStep, setCurrentStep] = useState(0);

  const statusMap = {
    pending: { label: "Chưa tiêm", className: "status_pending" },
    processing: { label: "Đang phòng chờ", className: "status_processing" },
    completed: { label: "Đã tiêm", className: "status_completed" },
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

  const [data, setData] = useState([
    {
      id: "VN123",
      fullname: "Nguyen Van A",
      date: "15/02/2025",
      vaccine: "Sextaron",
      status: "pending",
    },
    {
      id: "VN234",
      fullname: "Nguyen Van B",
      date: "15/02/2025",
      vaccine: "Sextaron",
      status: "processing",
    },
    {
      id: "VN134",
      fullname: "Nguyen Van C",
      date: "15/02/2025",
      vaccine: "Sextaron",
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
      width: "10%",
    },
    {
      title: "Tên bé",
      dataIndex: "fullname",
      sorter: (a, b) => (a.fullname || "").localeCompare(b.fullname || ""),
      width: "15%",
    },
    {
      title: "Vắc xin",
      dataIndex: "vaccine",
      width: "15%",
    },
    {
      title: "Ngày tiêm",
      dataIndex: "date",
      width: "15%",
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
            className="injection_detail_button"
            onClick={() => setSelectedRecord(record)}
          >
            Chi tiết
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="injection">
      <h2 className="injection_topic">Danh sách tiêm</h2>

      <div className="injection_tab_content">
        <Table
          columns={columns}
          rowKey={(record) => record.id}
          dataSource={data}
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
                {React.createElement(steps[currentStep].component, {
                  record: selectedRecord,
                  onConfirm: nextStep,
                })}
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

export default Inject_infor;
