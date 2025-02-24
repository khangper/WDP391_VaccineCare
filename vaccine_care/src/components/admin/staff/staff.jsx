import React, { useState } from 'react';
import './staff.css';

const Staff = () => {
    const [activeTab, setActiveTab] = useState('staff'); // 'staff' or 'doctor'
    const [staffMembers] = useState([
        { id: '00001', name: 'Christine Brooks', position: 'Nurse', email: 'christine@example.com', date: '04 Sep 2019', status: 'Active' },
        { id: '00002', name: 'Rosie Pearson', position: 'Nurse', email: 'rosie@example.com', date: '28 May 2019', status: 'On Leave' },
        { id: '00003', name: 'Darrell Caldwell', position: 'Nurse', email: 'darrell@example.com', date: '23 Nov 2019', status: 'Inactive' },
        { id: '00004', name: 'Gilbert Johnston', position: 'Nurse', email: 'gilbert@example.com', date: '05 Feb 2019', status: 'Active' },
        { id: '00005', name: 'Alan Cain', position: 'Nurse', email: 'alan@example.com', date: '29 Jul 2019', status: 'Active' },
        { id: '00006', name: 'Emily White', position: 'Receptionist', email: 'emily@example.com', date: '15 Aug 2019', status: 'Active' },
        { id: '00007', name: 'John Smith', position: 'Technician', email: 'john@example.com', date: '10 Oct 2019', status: 'Active' },
        { id: '00008', name: 'Maria Garcia', position: 'Nurse', email: 'maria@example.com', date: '12 Dec 2019', status: 'On Leave' },
        { id: '00009', name: 'David Lee', position: 'Administrator', email: 'david@example.com', date: '20 Jan 2020', status: 'Active' },
        { id: '00010', name: 'Sophie Turner', position: 'Nurse', email: 'sophie@example.com', date: '03 Mar 2020', status: 'Active' },
        { id: '00011', name: 'Robert Johnson', position: 'Security', email: 'robert@example.com', date: '15 Apr 2020', status: 'Active' },
        { id: '00012', name: 'Linda Chen', position: 'Pharmacist', email: 'linda@example.com', date: '22 May 2020', status: 'Active' },
        { id: '00013', name: 'Michael Brown', position: 'Technician', email: 'michael@example.com', date: '30 Jun 2020', status: 'Inactive' },
        { id: '00014', name: 'Sarah Davis', position: 'Nurse', email: 'sarah.d@example.com', date: '08 Jul 2020', status: 'Active' },
        { id: '00015', name: 'Kevin Wilson', position: 'IT Support', email: 'kevin@example.com', date: '14 Aug 2020', status: 'Active' }
    ]);

    const [doctors] = useState([
        { id: 'D001', name: 'Dr. Sarah Wilson', specialization: 'Pediatrician', email: 'sarah@example.com', date: '15 Jan 2020', status: 'Active' },
        { id: 'D002', name: 'Dr. Michael Chen', specialization: 'Cardiologist', email: 'michael@example.com', date: '03 Mar 2020', status: 'On Leave' },
        { id: 'D003', name: 'Dr. Emma Thompson', specialization: 'Neurologist', email: 'emma@example.com', date: '12 Apr 2020', status: 'Active' },
        { id: 'D004', name: 'Dr. James Rodriguez', specialization: 'Surgeon', email: 'james@example.com', date: '22 Jun 2020', status: 'Inactive' },
        { id: 'D005', name: 'Dr. Lisa Anderson', specialization: 'Pediatrician', email: 'lisa@example.com', date: '08 Aug 2020', status: 'Active' },
        { id: 'D006', name: 'Dr. William Taylor', specialization: 'Orthopedist', email: 'william@example.com', date: '14 Sep 2020', status: 'Active' },
        { id: 'D007', name: 'Dr. Anna Martinez', specialization: 'Dermatologist', email: 'anna@example.com', date: '25 Oct 2020', status: 'Active' },
        { id: 'D008', name: 'Dr. Robert Kim', specialization: 'Psychiatrist', email: 'robert@example.com', date: '30 Nov 2020', status: 'On Leave' },
        { id: 'D009', name: 'Dr. Elizabeth Brown', specialization: 'Gynecologist', email: 'elizabeth@example.com', date: '05 Dec 2020', status: 'Active' },
        { id: 'D010', name: 'Dr. David Clark', specialization: 'Urologist', email: 'david@example.com', date: '10 Jan 2021', status: 'Active' },
        { id: 'D011', name: 'Dr. Maria Gonzalez', specialization: 'Oncologist', email: 'maria@example.com', date: '15 Feb 2021', status: 'Active' },
        { id: 'D012', name: 'Dr. Thomas Wright', specialization: 'Neurologist', email: 'thomas@example.com', date: '20 Mar 2021', status: 'Active' },
        { id: 'D013', name: 'Dr. Jennifer Lee', specialization: 'Pediatrician', email: 'jennifer@example.com', date: '25 Apr 2021', status: 'Inactive' },
        { id: 'D014', name: 'Dr. Christopher White', specialization: 'Cardiologist', email: 'chris@example.com', date: '30 May 2021', status: 'Active' },
        { id: 'D015', name: 'Dr. Patricia Moore', specialization: 'Endocrinologist', email: 'patricia@example.com', date: '05 Jun 2021', status: 'Active' }
    ]);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const [sortOption, setSortOption] = useState('name');

    const handleSort = (option) => {
        const dataToSort = activeTab === 'staff' ? [...staffMembers] : [...doctors];
        const sortedData = dataToSort.sort((a, b) => {
            if (option === 'name') return a.name.localeCompare(b.name);
            if (option === 'id') return a.id.localeCompare(b.id);
            if (option === 'date') return new Date(a.date) - new Date(b.date);
            if (option === 'status') return a.status.localeCompare(b.status);
            return 0;
        });
    };

    const handleSortChange = (event) => {
        setSortOption(event.target.value);
        handleSort(event.target.value);
    };

    const handlePageChange = (direction) => {
        if (direction === 'next') {
            setCurrentPage(prev => Math.min(prev + 1, Math.ceil((activeTab === 'staff' ? staffMembers.length : doctors.length) / itemsPerPage)));
        } else {
            setCurrentPage(prev => Math.max(prev - 1, 1));
        }
    };

    const currentData = activeTab === 'staff' ? staffMembers : doctors;
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = currentData.slice(indexOfFirstItem, indexOfLastItem);

    return (
        <div className="admin">
            <div className="staff-container">
                <h1 className="staff-title">Staff Management</h1>
                
                <div className="staff-tabs">
                    <button 
                        className={`tab-button ${activeTab === 'staff' ? 'active' : ''}`}
                        onClick={() => setActiveTab('staff')}
                    >
                        Staff List
                    </button>
                    <button 
                        className={`tab-button ${activeTab === 'doctor' ? 'active' : ''}`}
                        onClick={() => setActiveTab('doctor')}
                    >
                        Doctor List
                    </button>
                </div>

                <div className="top-bar">
                    <select value={sortOption} onChange={handleSortChange} className="sort-dropdown">
                        <option value="name">Sort by Name</option>
                        <option value="id">Sort by ID</option>
                        <option value="date">Sort by Date</option>
                        <option value="status">Sort by Status</option>
                    </select>
                </div>

                <div className="table-container">
                    <table className="staff-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>{activeTab === 'staff' ? 'Position' : 'Specialization'}</th>
                                <th>Email</th>
                                <th>Date</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.map(item => (
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>{activeTab === 'staff' ? item.position : item.specialization}</td>
                                    <td>{item.email}</td>
                                    <td>{item.date}</td>
                                    <td>
                                        <span className={`status ${item.status.toLowerCase().replace(' ', '')}`}>
                                            {item.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="pagination">
                    <button 
                        onClick={() => handlePageChange('prev')} 
                        disabled={currentPage === 1} 
                        className="nav-button"
                    >
                        ◀ Previous
                    </button>
                    <button 
                        onClick={() => handlePageChange('next')} 
                        disabled={indexOfLastItem >= currentData.length} 
                        className="nav-button"
                    >
                        Next ▶
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Staff;