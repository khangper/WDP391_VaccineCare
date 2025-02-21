import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext"; 
import "./LoginPage.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Phone from "../../../assets/Login/Tabpanel.png";

function LoginPage() {
  const { login } = useContext(AuthContext); // Lấy hàm login từ AuthContext
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    setError(null);
    console.log("🔹 Dữ liệu gửi lên API:", formData);
  
    // Nếu username là admin và password là 123, điều hướng luôn, không gọi API
    if (formData.username === "admin" && formData.password === "123") {
      console.log("🔹 Đăng nhập với admin cục bộ, không gọi API");
      navigate("/admin/acc_info");
      return;
    }else if(formData.username === "staff" && formData.password === "123") {
      console.log("🔹 Đăng nhập với staff cục bộ, không gọi API");
      navigate("/staff/injection-in");
      return;
    }else if(formData.username === "doctor" && formData.password === "123") {
      console.log("🔹 Đăng nhập với staff cục bộ, không gọi API");
      navigate("/doctor/injection-in");
      return;
    }
  
    try {
      const response = await fetch(
        "https://swdsapelearningapi.azurewebsites.net/api/User/login-app",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
  
      const textData = await response.text();
      console.log("🔹 API Response:", textData);
  
      if (!response.ok) {
        throw new Error("❌ Đăng nhập thất bại: " + textData);
      }
  
      if (textData.startsWith("ey")) {
        console.log("✅ Access Token:", textData);
        login(textData); // Lưu token vào state/localStorage
        navigate("/"); // Điều hướng sau khi đăng nhập thành công
      } else {
        throw new Error("Phản hồi từ API không hợp lệ.");
      }
    } catch (err) {
      console.error("❌ Lỗi đăng nhập:", err.message);
      setError(err.message);
    }
  };
  
  
  
  
  return (
    <div className="HomePage-Allcontainer">
      <div className="HomePage-main-container">
        <div className="flex-column-eb"></div>
        <div className="container mt-5">
          <div className="row mt-152">
            <div className="col-6">
              <div className="Regis-from">
                <div className="Regis-title">Mời bạn đăng nhập:</div>
                <div className="Regis-input">
                  <div className="Regis-info">Tên đăng nhập:</div>
                  <input
                    type="text"
                    name="username"
                    className="Regis-single-input"
                    placeholder="Nhập email hoặc tên đăng nhập"
                    value={formData.username}
                    onChange={handleChange}
                  />
                </div>
                <div className="Regis-input">
                  <div className="Regis-info">Mật khẩu:</div>
                  <input
                    type="password"
                    name="password"
                    className="Regis-single-input"
                    placeholder="Nhập mật khẩu"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
                <div className="Regis-input">
                  <button className="Regis-button mt-4" onClick={handleLogin}>
                    Gửi
                  </button>
                </div>
                <div className="Regis-input">
                  <div className="Login-flex">
                    <div className="Login-text">Bạn quên mật khẩu?</div>
                    <a href="/register" className="Login-text">
                      Đăng ký tài khoản
                    </a>
                  </div>
                </div>
                {error && <p className="Regis-error text-danger">{error}</p>}
              </div>
            </div>

            <div className="col-6 Regis-kkk">
              <div className="Regis-introContainer">
                <img src={Phone} className="Regis-icon" alt="intro" />
                <div className="Regis-intro">
                  "Chào mừng bạn đến với hệ thống tiêm chủng! Hãy đăng nhập để
                  theo dõi lịch tiêm chủng và bảo vệ sức khỏe của con yêu."
                </div>
                <div className="Regis-intro-khangdoan">-Khang Đoàn-</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
