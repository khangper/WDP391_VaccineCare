import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./VaccinePrice.css";
import api from "../../../services/api";

const VaccinePrice = () => {
  const [vaccines, setVaccines] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAllVaccines();
  }, []);

  const fetchAllVaccines = async () => {
    setLoading(true);
    try {
      // 🔍 Lấy danh sách bệnh
      const diseaseResponse = await api.get("/Disease/get-all?PageSize=30");
      const diseaseList = diseaseResponse.data?.["$values"] || [];

      console.log("✅ Danh sách bệnh từ API:", diseaseList);

      // 🔍 Chỉ gọi API vắc xin nếu bệnh có danh sách vaccines
      const vaccineRequests = diseaseList
        .filter((disease) => disease.vaccines?.length > 0) // Chỉ lấy bệnh có vaccine
        .map(async (disease) => {
          try {
            const encodedDiseaseName = encodeURIComponent(disease.name.trim());
            console.log(`🔍 Fetching vaccines for: ${disease.name} -> ${encodedDiseaseName}`);

            const res = await api.get(`/Vaccine/get-vaccines-by-diasease-name/${encodedDiseaseName}`);
            
            console.log(`📌 API Response for ${disease.name}:`, res.data);

            const vaccineList = res.data || [];

            if (vaccineList.length === 0) {
              console.warn(`⚠️ Không có vắc xin cho bệnh ${disease.name}, bỏ qua.`);
              return [];
            }

            return vaccineList.map((vaccine) => ({
              ...vaccine,
              diseaseName: disease.name,
            }));
          } catch (error) {
            console.error(`❌ Lỗi khi lấy vắc xin cho bệnh ${disease.name}, API có thể bị lỗi.`);
            return [];
          }
        });

      const vaccineResults = await Promise.all(vaccineRequests);
      const allVaccines = vaccineResults.flat().filter(Boolean); // Bỏ qua bệnh bị lỗi

      console.log("✅ Danh sách vắc xin sau khi xử lý:", allVaccines);

      setVaccines(allVaccines);
    } catch (error) {
      console.error("❌ Lỗi khi tải danh sách bệnh, không thể lấy dữ liệu.");
    }
    setLoading(false);
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center VaccineTitle">Danh Sách Vắc Xin</h2>

      {loading ? (
        <div className="loader"></div>
      ) : vaccines.length === 0 ? (
        <p className="text-center">Không có dữ liệu vắc xin.</p>
      ) : (
        <table className="table table-bordered table-striped vaccine-table">
          <thead>
            <tr>
              <th className="vaccine-tableTitle">STT</th>
              <th className="vaccine-tableTitle">Phòng bệnh</th>
              <th className="vaccine-tableTitle">Tên vắc xin</th>
              <th className="vaccine-tableTitle">Nước sản xuất</th>
              <th className="vaccine-tableTitle">Giá bán lẻ (VNĐ)</th>
              <th className="vaccine-tableTitle">Tình trạng</th>
            </tr>
          </thead>
          <tbody>
            {vaccines.map((vaccine, index) => (
              <tr key={vaccine.id || index}>
                <td>{index + 1}</td>
                <td>{vaccine.diseaseName}</td>
                <td>{vaccine.name}</td>
                <td>{vaccine.manufacture || "Không có thông tin"}</td>
                <td>
                  {vaccine.price
                    ? Number(vaccine.price).toLocaleString("vi-VN") + " VND"
                    : "Chưa có giá"}
                </td>
                <td className={vaccine.inStockNumber > 0 ? "text-success" : "text-danger"}>
                  {vaccine.inStockNumber > 0 ? "Còn hàng" : <span style={{ color: "red" }}>Hết hàng</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default VaccinePrice;
