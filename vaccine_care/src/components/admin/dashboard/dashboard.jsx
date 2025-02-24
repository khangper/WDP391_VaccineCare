import React from 'react';
import './dashboard.css';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Users, Calendar, Bed, UserCheck } from 'lucide-react';

const Dashboard = () => {
    const stats = [
        { name: 'Total Patients', value: 1234, icon: <Users className="h-8 w-8" /> },
        { name: 'Appointments Today', value: 45, icon: <Calendar className="h-8 w-8" /> },
        { name: 'Available Beds', value: 23, icon: <Bed className="h-8 w-8" /> },
        { name: 'Staff on Duty', value: 78, icon: <UserCheck className="h-8 w-8" /> },
    ];

    const departmentData = [
        { name: 'Cardiology', patients: 150 },
        { name: 'Neurology', patients: 120 },
        { name: 'Pediatrics', patients: 200 },
        { name: 'Orthopedics', patients: 80 },
        { name: 'Oncology', patients: 100 },
    ];

    // Colors for pie chart sections
    const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#a4de6c'];

    return (
        <div className="admin">
            <div className="admin-dashboard-container">
                <h1 className="admin-dashboard-title">Hospital Dashboard</h1>
                <div className="admin-dashboard-stats-grid">
                    {stats.map((stat, index) => (
                        <div key={index} className="admin-dashboard-stat-card">
                            <div className="admin-dashboard-stat-icon">
                                {stat.icon}
                            </div>
                            <div className="admin-dashboard-stat-info">
                                <h2>{stat.value}</h2>
                                <p>{stat.name}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="admin-dashboard-charts-container">
                    <div className="admin-dashboard-pie-chart-container">
                        <h2>Patient Distribution</h2>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={departmentData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                    outerRadius={100}
                                    fill="#8884d8"
                                    dataKey="patients"
                                >
                                    {departmentData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="admin-dashboard-bar-chart-container">
                        <h2>Patients by Department</h2>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={departmentData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="patients" fill="#8884d8" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;