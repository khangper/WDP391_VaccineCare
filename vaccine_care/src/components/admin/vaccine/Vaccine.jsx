import React, { useState } from 'react';
import './vaccine.css';

const Vaccine = () => {
    const [vaccines, setVaccines] = useState([
        { id: 1, name: 'Vaccine A', type: 'Preventive Vaccine', dosage: '2 doses', status: 'Available' },
        { id: 2, name: 'Vaccine B', type: 'Preventive Vaccine', dosage: '1 dose', status: 'Out of stock' },
        { id: 3, name: 'Vaccine C', type: 'Preventive Vaccine', dosage: '3 doses', status: 'Available' },
        { id: 4, name: 'Vaccine D', type: 'Preventive Vaccine', dosage: '2 doses', status: 'Available' },
        { id: 5, name: 'Vaccine E', type: 'Therapeutic Vaccine', dosage: '1 dose', status: 'Out of stock' },
        { id: 6, name: 'Vaccine F', type: 'Preventive Vaccine', dosage: '2 doses', status: 'Available' },
        { id: 7, name: 'Vaccine G', type: 'Preventive Vaccine', dosage: '3 doses', status: 'Available' },
        { id: 8, name: 'Vaccine H', type: 'Therapeutic Vaccine', dosage: '1 dose', status: 'Out of stock' },
        { id: 9, name: 'Vaccine I', type: 'Preventive Vaccine', dosage: '2 doses', status: 'Available' },
        { id: 10, name: 'Vaccine J', type: 'Preventive Vaccine', dosage: '2 doses', status: 'Available' }
    ]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const [sortOption, setSortOption] = useState('name');

    const handleSort = (option) => {
        const sortedVaccines = [...vaccines].sort((a, b) => {
            if (option === 'name') {
                return a.name.localeCompare(b.name);
            } else if (option === 'type') {
                return a.type.localeCompare(b.type);
            } else if (option === 'status') {
                return a.status.localeCompare(b.status);
            }
            return 0;
        });
        setVaccines(sortedVaccines);
    };

    const handleSortChange = (event) => {
        setSortOption(event.target.value);
        handleSort(event.target.value);
    };

    const handlePageChange = (direction) => {
        if (direction === 'next') {
            setCurrentPage(prev => Math.min(prev + 1, Math.ceil(vaccines.length / itemsPerPage)));
        } else {
            setCurrentPage(prev => Math.max(prev - 1, 1));
        }
    };

    const indexOfLastVaccine = currentPage * itemsPerPage;
    const indexOfFirstVaccine = indexOfLastVaccine - itemsPerPage;
    const currentVaccines = vaccines.slice(indexOfFirstVaccine, indexOfLastVaccine);

    return (
        <div className="admin">
            <div className="admin-vaccine-container">
                <h1 className="admin-vaccine-title">Vaccine List</h1>
                <div className="admin-vaccine-top-bar">
                    <select value={sortOption} onChange={handleSortChange} className="admin-vaccine-sort-dropdown">
                        <option value="name">Sort by Name</option>
                        <option value="type">Sort by Type</option>
                        <option value="status">Sort by Status</option>
                    </select>
                </div>
                <div className="admin-vaccine-table-container">
                    <table className="admin-vaccine-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Vaccine Name</th>
                                <th>Type</th>
                                <th>Dosage</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentVaccines.map(vaccine => (
                                <tr key={vaccine.id}>
                                    <td>{vaccine.id}</td>
                                    <td>{vaccine.name}</td>
                                    <td>{vaccine.type}</td>
                                    <td>{vaccine.dosage}</td>
                                    <td>
                                        <span className={`admin-vaccine-status ${vaccine.status.toLowerCase().replace(' ', '-')}`}>
                                            {vaccine.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="admin-vaccine-pagination">
                    <button 
                        onClick={() => handlePageChange('prev')} 
                        disabled={currentPage === 1} 
                        className="admin-vaccine-nav-button"
                    >
                        ◀ Previous
                    </button>
                    <button 
                        onClick={() => handlePageChange('next')} 
                        disabled={indexOfLastVaccine >= vaccines.length} 
                        className="admin-vaccine-nav-button"
                    >
                        Next ▶
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Vaccine;