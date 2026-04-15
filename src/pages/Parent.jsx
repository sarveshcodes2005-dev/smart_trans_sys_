import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import {
  User, Bus, Clock, MapPin, Phone, Shield, Bell, MessageSquare,
  CheckCircle, AlertTriangle, Navigation, ChevronRight
} from 'lucide-react';
import { buses, getStatusColor } from '../data/busData';
import NotificationCard from '../components/NotificationCard';
import './Parent.css';

const studentBus = buses[0]; // MB-01

const busIcon = L.divIcon({
  className: 'parent-bus-marker',
  html: `<div style="width:36px;height:36px;border-radius:50%;background:#22C55E;border:3px solid white;display:flex;align-items:center;justify-content:center;box-shadow:0 2px 12px rgba(34,197,94,0.5);">
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M8 6v6"/><path d="M15 6v6"/><path d="M2 12h19.6"/><path d="M18 18h3s.5-1.7.8-2.8c.1-.4.2-.8.2-1.2 0-.4-.1-.8-.2-1.2l-1.4-5C20.1 6.8 19.1 6 18 6H4a2 2 0 0 0-2 2v10h3"/><circle cx="7" cy="18" r="2"/><path d="M9 18h5"/><circle cx="16" cy="18" r="2"/></svg>
  </div>`,
  iconSize: [36, 36],
  iconAnchor: [18, 18],
});

const schoolIcon = L.divIcon({
  className: 'parent-school-marker',
  html: `<div style="width:28px;height:28px;border-radius:50%;background:#6366F1;border:2px solid rgba(255,255,255,0.8);display:flex;align-items:center;justify-content:center;box-shadow:0 2px 8px rgba(99,102,241,0.4);">
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c0 1 2 3 6 3s6-2 6-3v-5"/></svg>
  </div>`,
  iconSize: [28, 28],
  iconAnchor: [14, 14],
});

const whatsappMessages = [
  { type: 'eta', title: '🚌 Bus MB-01 Started', message: 'Good morning! Bus MB-01 has started its route. Driver: Ramesh Kumar. Expected pickup: 7:35 AM', time: '7:15 AM' },
  { type: 'eta', title: '📍 Approaching Your Stop', message: 'Bus MB-01 is 2 stops away from Sheetal Nagar. ETA: 12 minutes.', time: '7:23 AM' },
  { type: 'safety', title: '✅ Student Boarded', message: 'Your child has boarded Bus MB-01 at Sheetal Nagar stop. Total students onboard: 28', time: '7:36 AM' },
  { type: 'eta', title: '🏫 Arriving at School', message: 'Bus MB-01 will reach St. Xavier\'s High School in approximately 8 minutes.', time: '7:42 AM' },
  { type: 'safety', title: '✅ Reached School', message: 'Bus MB-01 has arrived at St. Xavier\'s High School. All 32 students safely dropped off.', time: '7:50 AM' },
];

export default function Parent() {
  const [etaCountdown, setEtaCountdown] = useState(studentBus.eta * 60);

  useEffect(() => {
    const timer = setInterval(() => {
      setEtaCountdown(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const minutes = Math.floor(etaCountdown / 60);
  const seconds = etaCountdown % 60;
  const busPos = studentBus.route[studentBus.currentStop];
  const schoolPos = studentBus.route[studentBus.route.length - 1];

  return (
    <div className="page parent">
      <div className="container">
        <motion.div
          className="parent__header"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="parent__title">Parent Portal</h1>
          <p className="parent__subtitle">Track your child's school bus in real-time via WhatsApp notifications</p>
        </motion.div>

        <div className="parent__layout">
          {/* Left Column */}
          <div className="parent__left">
            {/* Student Card */}
            <motion.div
              className="glass-card parent__student-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="parent__student-header">
                <div className="parent__student-avatar">
                  <User size={28} />
                </div>
                <div>
                  <h3>Aarav Sharma</h3>
                  <p>Class 7-B | Roll No. 15</p>
                </div>
                <span className="badge badge-success">
                  <div className="pulse-dot" style={{ width: 6, height: 6 }} />
                  On Bus
                </span>
              </div>

              <div className="parent__student-details">
                <div className="parent__detail">
                  <Bus size={16} />
                  <div>
                    <span className="parent__detail-label">Bus</span>
                    <span className="parent__detail-value">{studentBus.id} — {studentBus.number}</span>
                  </div>
                </div>
                <div className="parent__detail">
                  <MapPin size={16} />
                  <div>
                    <span className="parent__detail-label">School</span>
                    <span className="parent__detail-value">{studentBus.school}</span>
                  </div>
                </div>
                <div className="parent__detail">
                  <User size={16} />
                  <div>
                    <span className="parent__detail-label">Driver</span>
                    <span className="parent__detail-value">{studentBus.driver}</span>
                  </div>
                </div>
                <div className="parent__detail">
                  <Phone size={16} />
                  <div>
                    <span className="parent__detail-label">Contact</span>
                    <span className="parent__detail-value">{studentBus.phone}</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* ETA Card */}
            <motion.div
              className="glass-card parent__eta-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="parent__eta-header">
                <Clock size={20} />
                <span>Estimated Time of Arrival</span>
              </div>
              <div className="parent__eta-countdown">
                <div className="parent__eta-time">
                  <span className="parent__eta-num">{String(minutes).padStart(2, '0')}</span>
                  <span className="parent__eta-label">min</span>
                </div>
                <span className="parent__eta-colon">:</span>
                <div className="parent__eta-time">
                  <span className="parent__eta-num">{String(seconds).padStart(2, '0')}</span>
                  <span className="parent__eta-label">sec</span>
                </div>
              </div>
              <div className="parent__eta-progress">
                <div className="parent__eta-progress-bar">
                  <div className="parent__eta-progress-fill" style={{ width: `${((studentBus.currentStop + 1) / studentBus.route.length) * 100}%` }} />
                </div>
                <div className="parent__eta-stops">
                  <span>{studentBus.route[0].name}</span>
                  <span>{schoolPos.name}</span>
                </div>
              </div>

              <div className="parent__safety-status">
                <Shield size={16} style={{ color: 'var(--success)' }} />
                <span>Speed: {studentBus.speed} km/h — Within safe limits</span>
              </div>
            </motion.div>

            {/* Mini Map */}
            <motion.div
              className="glass-card parent__map-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h3><Navigation size={16} /> Live Location</h3>
              <MapContainer
                center={[busPos.lat, busPos.lng]}
                zoom={14}
                style={{ height: '250px', borderRadius: 'var(--radius-md)', marginTop: '12px' }}
                zoomControl={false}
              >
                <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" />
                <Marker position={[busPos.lat, busPos.lng]} icon={busIcon}>
                  <Popup>Bus {studentBus.id} — {studentBus.driver}</Popup>
                </Marker>
                <Marker position={[schoolPos.lat, schoolPos.lng]} icon={schoolIcon}>
                  <Popup>{studentBus.school}</Popup>
                </Marker>
                <Polyline
                  positions={studentBus.route.map(r => [r.lat, r.lng])}
                  pathOptions={{ color: '#00D4AA', weight: 3, dashArray: '8 8' }}
                />
              </MapContainer>
            </motion.div>
          </div>

          {/* Right Column — WhatsApp Messages */}
          <motion.div
            className="parent__right"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="glass-card parent__messages-card">
              <div className="parent__messages-header">
                <MessageSquare size={18} />
                <h3>WhatsApp Notifications</h3>
                <span className="badge badge-success">Live</span>
              </div>
              <p className="parent__messages-desc">Real-time alerts delivered to your WhatsApp — no app download needed.</p>

              <div className="parent__messages-list">
                {whatsappMessages.map((msg, i) => (
                  <NotificationCard key={i} {...msg} delay={i * 0.1} />
                ))}
              </div>

              <div className="parent__emergency">
                <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                  <Phone size={16} />
                  Emergency Contact Driver
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
