import { Card } from "antd";
import "./Completed.css";
import { useState, useEffect } from "react";
import { FaRegCircleCheck } from "react-icons/fa6";

const Completed = () => {
  const [showTick, setShowTick] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTick(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="completed">
      <Card className="completed_card">
        <div className={`completed_icon_container ${showTick ? "show" : ""}`}>
          <FaRegCircleCheck className="completed_icon" />
        </div>
        <h2>Hoàn thành!</h2>
        <p>Quy trình đã được xử lý thành công.</p>
      </Card>
    </div>
  );
};

export default Completed;
