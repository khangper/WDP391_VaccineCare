import "./Inject.css";

const Inject = ({ onConfirm }) => {
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
  return (
    <div className="inject">
      <div className="inject-top">
        <h3>Tiêm Vaccine</h3>
        <div className="inject-container">
          <div className="inject-content">
            <p>
              <strong>Mã số:</strong> VN123
            </p>
            <p>
              <strong>Tên bé:</strong> Nguyen Van A
            </p>
            <p>
              <strong>Vắc xin:</strong> Sextaron
            </p>
          </div>
        </div>
        <button className="inject-btn" type="submit" onClick={onConfirm}>
          Xác nhận đã tiêm
        </button>
      </div>

      <div className="inject-bottom">
        <h3>Sổ tiêm chủng</h3>
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

          <div className="VaccinPage-flex">
            <button type="submit" className="button-update-inject">
              Cập nhật mũi tiêm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inject;
