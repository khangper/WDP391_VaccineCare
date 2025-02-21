import React from 'react'
import { vaccineData } from '../../../components/data/vaccineData'
import { Link } from 'react-router-dom'

function VaccineListPage() {
  return (
    <div className='VaccineListPage'>
      <div className="HomePage-Danhmuc container">
      <div className="HomePage-tilte row">
        <div className="col-6">
          <h2 className="HomePage-dm">Danh mục Vaccine</h2>
        </div>
      </div>

      <div className="row">
        {vaccineData.map((vaccine) => (
          <div className="col-lg-4 col-md-6 col-12 mb-4" key={vaccine.id}>
            <div className="HomePage-card card">
              <div className="HomePage-card-actions">
                <Link to={`/vaccine/${vaccine.id}`} className="HomePage-card-btn btn" title="Xem chi tiết">
                  👁️
                </Link>
                <Link to={`/vaccine/${vaccine.id}`} className="HomePage-card-image">
                  <img src={vaccine.image} className="card-img-top" alt={vaccine.name} />
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
    </div>
  )
}

export default VaccineListPage
