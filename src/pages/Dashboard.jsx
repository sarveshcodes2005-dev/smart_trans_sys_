import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import L from 'leaflet';
import {
  Bus, Users, Clock, Fuel, AlertTriangle, CheckCircle, TrendingUp,
  Activity, BarChart3, Navigation
} from 'lucide-react';
import { buses, getStatusColor, getStatusLabel } from '../data/busData';
import { schools } from '../data/schoolData';
import NotificationCard from '../components/NotificationCard';
import './Dashboard.css';

const createBusIcon = (color) => L.divIcon({
  className: 'bus-marker',
  html: `<div style="width:32px;height:32px;border-radius:50%;background:${color};border:3px solid rgba(255,255,255,0.9);display:flex;align-items:center;justify-content:center;box-shadow:0 2px 8px rgba(0,0,0,0.4);">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M8 6v6"/><path d="M15 6v6"/><path d="M2 12h19.6"/><path d="M18 18h3s.5-1.7.8-2.8c.1-.4.2-.8.2-1.2 0-.4-.1-.8-.2-1.2l-1.4-5C20.1 6.8 19.1 6 18 6H4a2 2 0 0 0-2 2v10h3"/><circle cx="7" cy="18" r="2"/><path d="M9 18h5"/><circle cx="16" cy="18" r="2"/></svg>
  </div>`,
  iconSize: [32, 32],
  iconAnchor: [16, 16],
});

const notifications = [
  { type: 'eta', title: 'Bus MB-01 Update', message: 'Arriving at St. Xavier\'s School in 12 minutes', time: '2 min ago' },
  { type: 'alert', title: 'Delay Alert', message: 'Bus MB-03 delayed due to traffic near Kashimira junction', time: '5 min ago' },
  { type: 'safety', title: 'Compliance Check', message: 'All drivers passed morning safety check — 100% compliance', time: '15 min ago' },
  { type: 'message', title: 'Driver MB-04', message: 'Route clear, expected early arrival at Singhania School', time: '20 min ago' },
  { type: 'eta', title: 'Bus MB-07 Update', message: 'Crossed Bhayandar Flyover, ETA 5 minutes to Ryan International', time: '25 min ago' },
];

export default function Dashboard() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const activeBuses = buses.filter(b => b.status === 'on-route').length;
  const delayedBuses = buses.filter(b => b.status === 'delayed').length;
  const totalStudents = buses.reduce((sum, b) => sum + b.students, 0);
  const avgFuel = Math.round(buses.reduce((sum, b) => sum + b.fuelLevel, 0) / buses.length);
  const onTimeRate = Math.round((buses.filter(b => b.onTime).length / buses.length) * 100);

  return (
    <div className="page dashboard">
      <div className="container">
        <motion.div
          className="dashboard__header"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <h1 className="dashboard__title">School Fleet Dashboard</h1>
            <p className="dashboard__subtitle">Real-time fleet monitoring for Mira Bhayandar schools</p>
          </div>
          <div className="dashboard__time">
            <div className="pulse-dot" />
            <span>Live</span>
            <span className="dashboard__clock">{currentTime.toLocaleTimeString()}</span>
          </div>
        </motion.div>

        {/* Stat Cards */}
        <motion.div
          className="dashboard__stats"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="glass-card dash-stat">
            <div className="dash-stat__icon" style={{ background: 'rgba(34, 197, 94, 0.12)', color: '#22C55E' }}>
              <Bus size={22} />
            </div>
            <div className="dash-stat__info">
              <span className="dash-stat__value">{activeBuses}</span>
              <span className="dash-stat__label">Active Buses</span>
            </div>
          </div>
          <div className="glass-card dash-stat">
            <div className="dash-stat__icon" style={{ background: 'rgba(0, 212, 170, 0.12)', color: '#00D4AA' }}>
              <Users size={22} />
            </div>
            <div className="dash-stat__info">
              <span className="dash-stat__value">{totalStudents}</span>
              <span className="dash-stat__label">Students Onboard</span>
            </div>
          </div>
          <div className="glass-card dash-stat">
            <div className="dash-stat__icon" style={{ background: 'rgba(99, 102, 241, 0.12)', color: '#6366F1' }}>
              <TrendingUp size={22} />
            </div>
            <div className="dash-stat__info">
              <span className="dash-stat__value">{onTimeRate}%</span>
              <span className="dash-stat__label">On-Time Rate</span>
            </div>
          </div>
          <div className="glass-card dash-stat">
            <div className="dash-stat__icon" style={{ background: 'rgba(245, 158, 11, 0.12)', color: '#F59E0B' }}>
              <Fuel size={22} />
            </div>
            <div className="dash-stat__info">
              <span className="dash-stat__value">{avgFuel}%</span>
              <span className="dash-stat__label">Avg Fuel Level</span>
            </div>
          </div>
        </motion.div>

        <div className="dashboard__main">
          {/* Map */}
          <motion.div
            className="dashboard__map-container glass-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="dashboard__map-header">
              <h3><Navigation size={18} /> Fleet Map</h3>
              <span className="badge badge-success">
                <div className="pulse-dot" style={{ width: 6, height: 6 }} />
                {activeBuses} buses active
              </span>
            </div>
            <MapContainer
              center={[19.2900, 72.8580]}
              zoom={13}
              style={{ height: '400px', borderRadius: 'var(--radius-md)' }}
              zoomControl={false}
            >
              <TileLayer
                attribution='&copy; <a href="https://carto.com/">CARTO</a>'
                url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
              />
              {buses.map((bus) => {
                const pos = bus.route[bus.currentStop];
                return (
                  <Marker key={bus.id} position={[pos.lat, pos.lng]} icon={createBusIcon(getStatusColor(bus.status))}>
                    <Popup>
                      <div style={{ fontFamily: 'Inter', fontSize: '13px' }}>
                        <strong>{bus.id}</strong> — {bus.school}<br />
                        Driver: {bus.driver}<br />
                        Status: {getStatusLabel(bus.status)}<br />
                        Students: {bus.students}/{bus.capacity}<br />
                        {bus.eta > 0 && `ETA: ${bus.eta} min`}
                      </div>
                    </Popup>
                  </Marker>
                );
              })}
              {schools.map((school) => (
                <Circle
                  key={school.id}
                  center={[school.lat, school.lng]}
                  radius={150}
                  pathOptions={{ color: school.color, fillColor: school.color, fillOpacity: 0.1, weight: 1 }}
                />
              ))}
            </MapContainer>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            className="dashboard__sidebar"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {/* Notifications */}
            <div className="glass-card dashboard__notifications">
              <h3><Activity size={18} /> Live Activity</h3>
              <div className="dashboard__notif-list">
                {notifications.map((notif, i) => (
                  <NotificationCard key={i} {...notif} delay={i * 0.1} />
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bus Table */}
        <motion.div
          className="glass-card dashboard__table-container"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h3><BarChart3 size={18} /> Fleet Overview</h3>
          <div className="dashboard__table-wrapper">
            <table className="dashboard__table">
              <thead>
                <tr>
                  <th>Bus ID</th>
                  <th>School</th>
                  <th>Driver</th>
                  <th>Students</th>
                  <th>Speed</th>
                  <th>Fuel</th>
                  <th>ETA</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {buses.map((bus) => (
                  <tr key={bus.id}>
                    <td><strong>{bus.id}</strong></td>
                    <td>{bus.school.length > 25 ? bus.school.substring(0, 25) + '...' : bus.school}</td>
                    <td>{bus.driver}</td>
                    <td>{bus.students}/{bus.capacity}</td>
                    <td>{bus.speed} km/h</td>
                    <td>
                      <div className="fuel-bar">
                        <div className="fuel-bar__fill" style={{
                          width: `${bus.fuelLevel}%`,
                          background: bus.fuelLevel > 50 ? '#22C55E' : bus.fuelLevel > 25 ? '#F59E0B' : '#EF4444'
                        }} />
                      </div>
                    </td>
                    <td>{bus.eta > 0 ? `${bus.eta} min` : '—'}</td>
                    <td>
                      <span className={`badge badge-${bus.status === 'on-route' ? 'success' : bus.status === 'delayed' ? 'warning' : bus.status === 'alert' ? 'danger' : 'info'}`}>
                        {getStatusLabel(bus.status)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
