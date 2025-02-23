import { useEffect, useState } from "react";
import "./Inject.css";
import { Card } from "antd";
import { FaRegCircleCheck } from "react-icons/fa6";

const Inject = () => {
  const [status, setStatus] = useState("waiting");

  useEffect(() => {
    // Giả lập quá trình tiêm
    setTimeout(() => setStatus("injecting"), 3000);
    setTimeout(() => setStatus("done"), 7000);
  }, []);
  return (
    <div className="inject-wait-container">
      <Card className="inject-wait-card">
        <h2>Trạng thái Tiêm Chủng</h2>
        <ul>
          <li>
            <strong>Tên bé:</strong> Nguyễn Văn A
          </li>
          <li>
            <strong>Bác sĩ:</strong> Mr. Dora
          </li>
          <li>
            <strong>Phòng:</strong> 01
          </li>
          <li>
            <strong>Thời gian dự kiến:</strong> 10:30 AM
          </li>
          <li>
            <strong>Thời gian theo dõi:</strong> 30 phút sau tiêm
          </li>
          <li>
            <strong>Ghi chú:</strong>
          </li>
        </ul>

        <div className="inject-status">
          {status === "waiting" && (
            <div className="wait-status">
              <div className="custom-loader blue"></div>
              <p>Chờ tiêm...</p>
            </div>
          )}
          {status === "injecting" && (
            <div className="injected-status">
              <div className="custom-loader yellow"></div>
              <p>Đang tiêm...</p>
            </div>
          )}
          {status === "done" && (
            <div className="completed-status">
              <FaRegCircleCheck className="completed-icon" />
              <p>Tiêm xong!</p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default Inject;
