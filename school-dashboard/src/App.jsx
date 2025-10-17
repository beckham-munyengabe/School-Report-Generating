import React, { useState } from 'react';
import './App.css';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Bell, Settings, Users, CheckSquare, BookOpen, Sun, Moon } from 'lucide-react';


const statsData = [
{ id: 1, title: 'Students', value: '1,248', icon: 'users' },
{ id: 2, title: 'Teachers', value: '86', icon: 'book' },
{ id: 3, title: 'Attendance', value: '92%', icon: 'check' },
{ id: 4, title: 'Classes', value: '48', icon: 'classes' },
];


const chartData = [
{ name: 'Mon', attendance: 88 },
{ name: 'Tue', attendance: 90 },
{ name: 'Wed', attendance: 85 },
{ name: 'Thu', attendance: 92 },
{ name: 'Fri', attendance: 94 },
];


function StatCard({ title, value, icon }) {
return (
<div className="stat-card">
<div className="stat-left">
<div className="stat-title">{title}</div>
<div className="stat-value">{value}</div>
</div>
<div className="stat-icon">
{icon === 'users' && <Users size={24} />}
{icon === 'book' && <BookOpen size={24} />}
{icon === 'check' && <CheckSquare size={24} />}
{icon === 'classes' && <Users size={24} />}
</div>
</div>
);
}


export default function App() {
const [dark, setDark] = useState(false);
const [sidebarOpen, setSidebarOpen] = useState(true);


return (
<div className={dark ? 'dark-theme' : ''}>
<div className={`app-container ${sidebarOpen ? 'sidebar-open' : ''}`}>


{/* Sidebar */}
<aside className="sidebar">
<div className="sidebar-header">
<div className="logo">SM</div>
<button onClick={() => setSidebarOpen(!sidebarOpen)}>☰</button>
</div>
<nav className="sidebar-nav">
<a href="#"><Users /> Students</a>
<a href="#"><BookOpen /> Teachers</a>
<a href="#"><CheckSquare /> Attendance</a>
<a href="#">📚 Classes</a>
</nav>
<div className="sidebar-footer">
<div className="profile-pic">A</div>
<div className="profile-info">
<div className="profile-name">Admin Becks</div>
<div className="profile-role">Headmaster</div>
</div>
</div>
</aside>


{/* Main Content */}
<main className="main-content">
<header className="topbar">
<div className="topbar-left">
<h1>Dashboard</h1>
<span>Overview & insights</span>
</div>
<div className="topbar-right">
<button><Bell /></button>
<button><Settings /></button>
<button onClick={() => setDark(!dark)}>{dark ? <Sun /> : <Moon />}</button>
</div>
</header>


<section className="stats-grid">
{statsData.map(s => <StatCard key={s.id} {...s} />)}
</section>


<section className="chart-section">
<h2>Weekly Attendance</h2>
<ResponsiveContainer width="100%" height={250}>
<LineChart data={chartData}>
<XAxis dataKey="name" />
<YAxis />
<Tooltip />
<Line type="monotone" dataKey="attendance" stroke="#4f46e5" strokeWidth={2} />
</LineChart>
</ResponsiveContainer>
</section>
</main>
</div>
</div>
);
}