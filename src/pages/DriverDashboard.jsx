import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import {
  Truck, MapPin, Users, Clock, Navigation, Phone,
  CheckCircle, AlertTriangle, Coffee, Radio, UserCheck, UserX
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabaseClient';
import { buses, getStatusColor, getStatusLabel } from '../data/busData';
import './DriverDashboard.css';

const busIcon = L.divIcon({
  className: 'driver-bus-marker',
  html: `<div style="width:40px;height:40px;border-radius:50%;background:#22C55E;border:4px solid white;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 16px rgba(34,197,94,0.5);">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M8 6v6"/><path d="M15 6v6"/><path d="M2 12h19.6"/><path d="M18 18h3s.5-1.7.8-2.8c.1-.4.2-.8.2-1.2 0-.4-.1-.8-.2-1.2l-1.4-5C20.1 6.8 19.1 6 18 6H4a2 2 0 0 0-2 2v10h3"/><circle cx="7" cy="18" r="2"/><path d="M9 18h5"/><circle cx="16" cy="18" r="2"/></svg>
  </div>`,
  iconSize: [40, 40],
  iconAnchor: [20, 20],
});

export default function DriverDashboard() {
  const { profile } = useAuth();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [driverStatus, setDriverStatus] = useState('on-route');

  // Simulated: use the first bus or match by profile.assigned_bus
  const myBus = buses.find(b => b.id === profile?.assigned_bus) || buses[0];
  const busPos = myBus.route[myBus.currentStop];

  const [currentPosition, setCurrentPosition] = useState(busPos);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    
    // Start watching HTML5 Geolocation
    let watchId;
    if ('geolocation' in navigator) {
      watchId = navigator.geolocation.watchPosition(
        async (position) => {
          const { latitude, longitude, speed, heading } = position.coords;
          setCurrentPosition({ lat: latitude, lng: longitude });

          // Broadcast to Supabase
          if (profile?.id) {
            const { error } = await supabase.from('bus_locations').upsert({
              bus_id: myBus.id,
              driver_id: profile.id,
              lat: latitude,
              lng: longitude,
              speed: speed || 0,
              heading: heading || 0,
              last_updated: new Date().toISOString()
            });
            if (error) console.error('Error broadcasting GPS:', error.message);
          }
        },
        (error) => console.error('Geolocation Error:', error),
        { enableHighAccuracy: true, maximumAge: 5000, timeout: 5000 }
      );
    }
    
    return () => {
      clearInterval(timer);
      if (watchId) navigator.geolocation.clearWatch(watchId);
    };
  }, [profile, myBus.id]);

  // Simulated student list
  const students = [
    { name: 'Aarav Sharma', stop: 'Sheetal Nagar', boarded: true },
    { name: 'Priya Patel', stop: 'Mira Road Station', boarded: true },
    { name: 'Rohan Desai', stop: 'Kashimira Junction', boarded: true },
    { name: 'Ananya Singh', stop: 'Beverly Park', boarded: false },
    { name: 'Arjun Mehta', stop: 'Golden Nest', boarded: true },
    { name: 'Kavya Joshi', stop: 'Shanti Nagar', boarded: false },
  ];

  const boardedCount = students.filter(s => s.boarded).length;

  const statusOptions = [
    { id: 'on-route', label: 'On Route', icon: Navigation, color: '#22C55E' },
    { id: 'delayed', label: 'Delayed', icon: Clock, color: '#F59E0B' },
    { id: 'break', label: 'Break', icon: Coffee, color: '#6366F1' },
    { id: 'alert', label: 'Alert', icon: AlertTriangle, color: '#EF4444' },
  ];

  return (
    <div className="page driver-dashboard">
      <div className="container">
        {/* Header */}
        <motion.div
          className="driver__header"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <div className="driver__header-badge">
              <Truck size={16} />
              <span>Driver Dashboard</span>
            </div>
            <h1 className="driver__title">
              Hello, {profile?.full_name || 'Driver'} 👋
            </h1>
            <p className="driver__subtitle">
              Bus {myBus.id} — {myBus.school}
            </p>
          </div>
          <div className="driver__time-display">
            <div className="pulse-dot" />
            <span>Live</span>
            <span className="driver__clock">{currentTime.toLocaleTimeString()}</span>
          </div>
        </motion.div>

        {/* Status Selector */}
        <motion.div
          className="driver__status-bar"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <span className="driver__status-label">Current Status:</span>
          <div className="driver__status-options">
            {statusOptions.map(opt => (
              <button
                key={opt.id}
                className={`driver__status-btn ${driverStatus === opt.id ? 'driver__status-btn--active' : ''}`}
                style={{
                  '--status-color': opt.color,
                  borderColor: driverStatus === opt.id ? opt.color : 'transparent',
                  background: driverStatus === opt.id ? `${opt.color}15` : 'transparent',
                }}
                onClick={() => setDriverStatus(opt.id)}
              >
                <opt.icon size={16} style={{ color: opt.color }} />
                {opt.label}
              </button>
            ))}
          </div>
        </motion.div>

        <div className="driver__layout">
          {/* Left Column */}
          <div className="driver__left">
            {/* Bus Info Card */}
            <motion.div
              className="glass-card driver__bus-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
            >
              <h3><Truck size={18} /> My Bus</h3>
              <div className="driver__bus-details">
                <div className="driver__detail-row">
                  <span className="driver__detail-label">Bus ID</span>
                  <span className="driver__detail-value">{myBus.id}</span>
                </div>
                <div className="driver__detail-row">
                  <span className="driver__detail-label">Number Plate</span>
                  <span className="driver__detail-value">{myBus.number}</span>
                </div>
                <div className="driver__detail-row">
                  <span className="driver__detail-label">School</span>
                  <span className="driver__detail-value">{myBus.school}</span>
                </div>
                <div className="driver__detail-row">
                  <span className="driver__detail-label">Capacity</span>
                  <span className="driver__detail-value">{myBus.students}/{myBus.capacity}</span>
                </div>
                <div className="driver__detail-row">
                  <span className="driver__detail-label">Speed</span>
                  <span className="driver__detail-value">{myBus.speed} km/h</span>
                </div>
                <div className="driver__detail-row">
                  <span className="driver__detail-label">Fuel</span>
                  <div className="driver__fuel-bar">
                    <div className="driver__fuel-fill" style={{
                      width: `${myBus.fuelLevel}%`,
                      background: myBus.fuelLevel > 50 ? '#22C55E' : myBus.fuelLevel > 25 ? '#F59E0B' : '#EF4444'
                    }} />
                  </div>
                  <span className="driver__detail-value">{myBus.fuelLevel}%</span>
                </div>
              </div>
            </motion.div>

            {/* Route Stops */}
            <motion.div
              className="glass-card driver__route-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h3><MapPin size={18} /> Route Stops</h3>
              <div className="driver__route-list">
                {myBus.route.map((stop, i) => (
                  <div
                    key={i}
                    className={`driver__stop ${i <= myBus.currentStop ? 'driver__stop--passed' : ''} ${i === myBus.currentStop ? 'driver__stop--current' : ''}`}
                  >
                    <div className="driver__stop-marker">
                      <div className="driver__stop-dot" />
                      {i < myBus.route.length - 1 && <div className="driver__stop-line" />}
                    </div>
                    <div className="driver__stop-info">
                      <span className="driver__stop-name">{stop.name}</span>
                      {i === myBus.currentStop && (
                        <span className="badge badge-success" style={{ fontSize: '0.65rem', padding: '2px 8px' }}>Current</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column */}
          <div className="driver__right">
            {/* Map */}
            <motion.div
              className="glass-card driver__map-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
            >
              <h3><Navigation size={18} /> My Route Map</h3>
              <MapContainer
                center={[currentPosition.lat, currentPosition.lng]}
                zoom={14}
                style={{ height: '280px', borderRadius: 'var(--radius-md)', marginTop: '12px' }}
                zoomControl={false}
              >
                <TileLayer url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png" />
                <Marker position={[currentPosition.lat, currentPosition.lng]} icon={busIcon}>
                  <Popup>Bus {myBus.id} — You are here</Popup>
                </Marker>
                <Polyline
                  positions={myBus.route.map(r => [r.lat, r.lng])}
                  pathOptions={{ color: '#00D4AA', weight: 3, dashArray: '8 8' }}
                />
              </MapContainer>
            </motion.div>

            {/* Student Checklist */}
            <motion.div
              className="glass-card driver__students-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
            >
              <div className="driver__students-header">
                <h3><Users size={18} /> Student Checklist</h3>
                <span className="badge badge-success">{boardedCount}/{students.length} Boarded</span>
              </div>
              <div className="driver__student-list">
                {students.map((student, i) => (
                  <div
                    key={i}
                    className={`driver__student-item ${student.boarded ? 'driver__student-item--boarded' : ''}`}
                  >
                    <div className={`driver__student-check ${student.boarded ? 'driver__student-check--yes' : ''}`}>
                      {student.boarded ? <UserCheck size={14} /> : <UserX size={14} />}
                    </div>
                    <div className="driver__student-info">
                      <span className="driver__student-name">{student.name}</span>
                      <span className="driver__student-stop">{student.stop}</span>
                    </div>
                    <span className={`badge ${student.boarded ? 'badge-success' : 'badge-warning'}`}
                      style={{ fontSize: '0.65rem', padding: '2px 8px' }}>
                      {student.boarded ? 'On Bus' : 'Waiting'}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Emergency */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <button className="btn btn-primary driver__emergency-btn">
                <Radio size={18} />
                Report Emergency
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
