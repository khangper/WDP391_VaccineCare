import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../../services/api';

function VaccineListPage() {
  const [vaccines, setVaccines] = useState([]);
  const [searchedVaccines, setSearchedVaccines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchVaccines = async () => {
    try {
      const response = await api.get(`/Vaccine/get-all`);
      const vaccineArray = response.data.$values ? response.data.$values : response.data;
      console.log("Tất cả vaccine:", vaccineArray);
      setVaccines(vaccineArray);
      setSearchedVaccines(vaccineArray);
      setLoading(false);
    } catch (err) {
      console.error("❌ Lỗi khi lấy dữ liệu vaccine:", err);
      setError("Lỗi khi lấy dữ liệu vaccine.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVaccines();
  }, []);

  const handleSearch = (event) => {
    if (event.key === 'Enter') {
      // Nếu không nhập gì thì hiển thị danh sách gốc
      if (searchTerm.trim() === "") {
        setSearchedVaccines(vaccines);
      } else {
        const filtered = vaccines.filter(vaccine =>
          vaccine.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setSearchedVaccines(filtered);
      }
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="VaccineListPage">
      <div className="search-bar" style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Tìm kiếm vaccine theo tên..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleSearch}
          style={{ width: "100%", padding: "10px", fontSize: "16px" }}
        />
      </div>
      <div className="row">
        {searchedVaccines.map((vaccine) => (
          <div className="col-lg-4 col-md-6 col-12 mb-4" key={vaccine.id}>
            <div className="HomePage-card card">
              <div className="HomePage-card-actions">
                <Link
                  to={`/vaccine/${vaccine.id}`}
                  className="HomePage-card-btn btn"
                  title="Xem chi tiết"
                >
                  👁️
                </Link>
                <Link to={`/vaccine/${vaccine.id}`} className="HomePage-card-image">
                  <img
                    src={vaccine.imageUrl}
                    className="card-img-top"
                    alt={vaccine.name}
                  />
                </Link>
              </div>
              <div className="HomePage-card-body card-body">
                <h3 className="HomePage-card-title">{vaccine.name}</h3>
                <Link to={`/vaccine/${vaccine.id}`} className="btn btn-primary textdetail">
                  Xem chi tiết
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default VaccineListPage;
