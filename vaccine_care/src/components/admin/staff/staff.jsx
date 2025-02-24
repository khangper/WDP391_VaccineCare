import React, { useState } from 'react';
import './staff.css';

const Staff = () => {
    const [staffMembers, setStaffMembers] = useState([
        { id: '00001', name: 'Christine Brooks', position: 'Doctor', email: 'christine@example.com', date: '04 Sep 2019', status: 'Active' },
        { id: '00002', name: 'Rosie Pearson', position: 'Nurse', email: 'rosie@example.com', date: '28 May 2019', status: 'On Leave' },
        { id: '00003', name: 'Darrell Caldwell', position: 'Pharmacist', email: 'darrell@example.com', date: '23 Nov 2019', status: 'Inactive' },
        { id: '00004', name: 'Gilbert Johnston', position: 'Technician', email: 'gilbert@example.com', date: '05 Feb 2019', status: 'Active' },
        { id: '00005', name: 'Alan Cain', position: 'Administrator', email: 'alan@example.com', date: '29 Jul 2019', status: 'Active' },
        { id: '00006', name: 'Sarah Wilson', position: 'Doctor', email: 'sarah@example.com', date: '15 Jan 2020', status: 'Active' },
        { id: '00007', name: 'Michael Chen', position: 'Nurse', email: 'michael@example.com', date: '03 Mar 2020', status: 'On Leave' },
        { id: '00008', name: 'Emma Thompson', position: 'Pharmacist', email: 'emma@example.com', date: '12 Apr 2020', status: 'Active' },
        { id: '00009', name: 'James Rodriguez', position: 'Technician', email: 'james@example.com', date: '22 Jun 2020', status: 'Inactive' },
        { id: '00010', name: 'Lisa Anderson', position: 'Administrator', email: 'lisa@example.com', date: '08 Aug 2020', status: 'Active' }
    ]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const [sortOption, setSortOption] = useState('name');

    const handleSort = (option) => {
        const sortedMembers = [...staffMembers].sort((a, b) => {
            if (option === 'name') {
                return a.name.localeCompare(b.name);
            } else if (option === 'id') {
                return a.id.localeCompare(b.id);
            } else if (option === 'date') {
                return new Date(a.date) - new Date(b.date);
            } else if (option === 'position') {
                return a.position.localeCompare(b.position);
            } else if (option === 'status') {
                return a.status.localeCompare(b.status);
            }
            return 0;
        });
        setStaffMembers(sortedMembers);
    };

    const handleSortChange = (event) => {
        setSortOption(event.target.value);
        handleSort(event.target.value);
    };

    const handlePageChange = (direction) => {
        if (direction === 'next') {
            setCurrentPage(prev => Math.min(prev + 1, Math.ceil(staffMembers.length / itemsPerPage)));
        } else {
            setCurrentPage(prev => Math.max(prev - 1, 1));
        }
    };

    const indexOfLastMember = currentPage * itemsPerPage;
    const indexOfFirstMember = indexOfLastMember - itemsPerPage;
    const currentMembers = staffMembers.slice(indexOfFirstMember, indexOfLastMember);

    return (
        <div className="admin">
            <div className="staff-container">
                <h1 className="staff-title">Staff List</h1>
                <div className="top-bar">
                    <select value={sortOption} onChange={handleSortChange} className="sort-dropdown">
                        <option value="name">Sort by Name</option>
                        <option value="id">Sort by ID</option>
                        <option value="date">Sort by Date</option>
                        <option value="position">Sort by Position</option>
                        <option value="status">Sort by Status</option>
                    </select>
                </div>
                <div className="table-container">
                    <table className="staff-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Position</th>
                                <th>Email</th>
                                <th>Date</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentMembers.map(member => (
                                <tr key={member.id}>
                                    <td>{member.id}</td>
                                    <td>{member.name}</td>
                                    <td>{member.position}</td>
                                    <td>{member.email}</td>
                                    <td>{member.date}</td>
                                    <td>
                                        <span className={`status ${member.status.toLowerCase().replace(' ', '')}`}>
                                            {member.status}
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
                        disabled={indexOfLastMember >= staffMembers.length} 
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