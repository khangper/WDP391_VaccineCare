import { useParams, useNavigate } from "react-router-dom";
import { vaccineData } from "../../../components/data/vaccineData";
import "bootstrap/dist/css/bootstrap.min.css";
import "./DetailPage.css";

const DetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const vaccine = vaccineData.find((v) => v.id === parseInt(id, 10));

  if (!vaccine) {
    return <h2 className="DetailPage-notfound text-center text-danger mt-4">Không tìm thấy thông tin vắc xin</h2>;
  }

  return (
    <div className="DetailPage-container container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-10">
          <div className="DetailPage-card card shadow-lg">
            <div className="row g-0">
              <div className="col-md-6 d-flex align-items-center">
                <img src={vaccine.image} alt={vaccine.name} className="DetailPage-image img-fluid rounded-start" />
              </div>
              <div className="col-md-6">
                <div className="DetailPage-body card-body">
                  <h2 className="DetailPage-title text-primary">{vaccine.name}</h2>
                  <p className="DetailPage-description">{vaccine.description}</p>
                  <h4 className="DetailPage-price text-danger">Giá: {vaccine.price}</h4>
                  <p className="DetailPage-object"><strong>Đối tượng sử dụng:</strong> {vaccine.object}</p>
                  <button className="DetailPage-back btn btn-secondary mt-3" onClick={() => navigate(-1)}>
                    Quay lại
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Kiểm tra nếu có video thì hiển thị */}
          {vaccine.video && (
            <div className="DetailPage-video mt-4">
              <h3 className="text-center">Video giới thiệu về {vaccine.name}</h3>
              <div className="ratio ratio-16x9">
                <iframe
                  width="100%"
                  height="400px"
                  src={vaccine.video}
                  title={`Video về ${vaccine.name}`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
