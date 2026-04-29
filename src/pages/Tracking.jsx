import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapContainer, TileLayer, Marker, Popup, Polyline, Circle, useMap } from 'react-leaflet';
import L from 'leaflet';
import { Search, Bus, Clock, Users, Fuel, Phone, Navigation, X, MapPin } from 'lucide-react';
import { buses, getStatusColor, getStatusLabel } from '../data/busData';
import { schools } from '../data/schoolData';
import './Tracking.css';

const createBusIcon = (color, isSelected) => L.divIcon({
  className: 'bus-marker-tracking',
  html: `<div style="width:${isSelected ? 40 : 32}px;height:${isSelected ? 40 : 32}px;border-radius:50%;background:${color};border:${isSelected ? '4px' : '3px'} solid ${isSelected ? '#fff' : 'rgba(255,255,255,0.8)'};display:flex;align-items:center;justify-content:center;box-shadow:0 2px 12px ${color}60;transition:all 0.3s;">
    <svg width="${isSelected ? 20 : 16}" height="${isSelected ? 20 : 16}" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M8 6v6"/><path d="M15 6v6"/><path d="M2 12h19.6"/><path d="M18 18h3s.5-1.7.8-2.8c.1-.4.2-.8.2-1.2 0-.4-.1-.8-.2-1.2l-1.4-5C20.1 6.8 19.1 6 18 6H4a2 2 0 0 0-2 2v10h3"/><circle cx="7" cy="18" r="2"/><path d="M9 18h5"/><circle cx="16" cy="18" r="2"/></svg>
  </div>`,
  iconSize: [isSelected ? 40 : 32, isSelected ? 40 : 32],
  iconAnchor: [isSelected ? 20 : 16, isSelected ? 20 : 16],
});

const schoolIcon = L.divIcon({
  className: 'school-marker',
  html: `<div style="width:28px;height:28px;border-radius:50%;background:#6366F1;border:2px solid rgba(255,255,255,0.7);display:flex;align-items:center;justify-content:center;box-shadow:0 2px 8px rgba(99,102,241,0.4);">
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c0 1 2 3 6 3s6-2 6-3v-5"/></svg>
  </div>`,
  iconSize: [28, 28],
  iconAnchor: [14, 14],
});

import { supabase } from '../lib/supabaseClient';

function MapFlyTo({ center }) {
  const map = useMap();
  useEffect(() => {
    if (center) map.flyTo(center, 15, { duration: 1 });
  }, [center, map]);
  return null;
}

export default function Tracking() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBus, setSelectedBus] = useState(null);
  const [flyTo, setFlyTo] = useState(null);
  const [filter, setFilter] = useState('all');
  const [liveBuses, setLiveBuses] = useState(buses); // Store buses in state to allow live updates

  // Supabase Realtime GPS Subscription
  useEffect(() => {
    // 1. Initial fetch of known locations
    supabase.from('bus_locations').select('*').then(({ data }) => {
      if (data) {
        setLiveBuses(prev => prev.map(bus => {
          const liveData = data.find(d => d.bus_id === bus.id);
          if (liveData) {
            const newRoute = [...bus.route];
            newRoute[bus.currentStop] = { ...newRoute[bus.currentStop], lat: liveData.lat, lng: liveData.lng };
            return { ...bus, speed: Math.round(liveData.speed), route: newRoute };
          }
          return bus;
        }));
      }
    });

    // 2. Subscribe to realtime updates
    const channel = supabase
      .channel('live-tracking')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'bus_locations' }, (payload) => {
        const liveData = payload.new;
        setLiveBuses(prev => prev.map(bus => {
          if (bus.id === liveData.bus_id) {
            const newRoute = [...bus.route];
            // Update the visual marker's position
            newRoute[bus.currentStop] = { ...newRoute[bus.currentStop], lat: liveData.lat, lng: liveData.lng };
            return { ...bus, speed: Math.round(liveData.speed), route: newRoute };
          }
          return bus;
        }));
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const filteredBuses = liveBuses.filter(bus => {
    const matchesSearch = bus.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bus.school.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bus.driver.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filter === 'all' || bus.status === filter;
    return matchesSearch && matchesFilter;
  });

  const handleSelectBus = (bus) => {
    setSelectedBus(bus);
    const pos = bus.route[bus.currentStop];
    setFlyTo([pos.lat, pos.lng]);
  };

  return (
    <div className="page tracking">
      {/* Sidebar */}
      <div className="tracking__sidebar">
        <div className="tracking__sidebar-header">
          <h2><Navigation size={20} /> Live Tracking</h2>
          <div className="tracking__search">
            <Search size={16} />
            <input
              type="text"
              placeholder="Search bus, school, driver..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="tracking__filters">
            {['all', 'on-route', 'delayed', 'idle', 'alert'].map((f) => (
              <button
                key={f}
                className={`tracking__filter-btn ${filter === f ? 'tracking__filter-btn--active' : ''}`}
                onClick={() => setFilter(f)}
              >
                {f === 'all' ? 'All' : getStatusLabel(f)}
              </button>
            ))}
          </div>
        </div>

        <div className="tracking__bus-list">
          {filteredBuses.map((bus) => (
            <motion.div
              key={bus.id}
              className={`tracking__bus-item ${selectedBus?.id === bus.id ? 'tracking__bus-item--active' : ''}`}
              onClick={() => handleSelectBus(bus)}
              whileHover={{ x: 4 }}
              transition={{ duration: 0.15 }}
            >
              <div className="tracking__bus-icon" style={{ background: getStatusColor(bus.status) }}>
                <Bus size={16} color="white" />
              </div>
              <div className="tracking__bus-info">
                <div className="tracking__bus-name">
                  <strong>{bus.id}</strong>
                  <span className={`badge badge-${bus.status === 'on-route' ? 'success' : bus.status === 'delayed' ? 'warning' : bus.status === 'alert' ? 'danger' : 'info'}`}>
                    {getStatusLabel(bus.status)}
                  </span>
                </div>
                <span className="tracking__bus-school">{bus.school}</span>
                <div className="tracking__bus-meta">
                  <span><Users size={12} /> {bus.students}</span>
                  {bus.eta > 0 && <span><Clock size={12} /> {bus.eta} min</span>}
                  <span><Navigation size={12} /> {bus.speed} km/h</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Map */}
      <div className="tracking__map">
        <MapContainer
          center={[19.2900, 72.8580]}
          zoom={13}
          style={{ height: '100%', width: '100%' }}
          zoomControl={false}
        >
          <TileLayer
            attribution='&copy; CARTO'
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          />
          <MapFlyTo center={flyTo} />

          {/* School markers */}
          {schools.map((school) => (
            <Marker key={`school-${school.id}`} position={[school.lat, school.lng]} icon={schoolIcon}>
              <Popup>
                <div style={{ fontFamily: 'Inter', fontSize: '13px' }}>
                  <strong>{school.name}</strong><br />
                  {school.area}<br />
                  {school.students} students | {school.buses} buses
                </div>
              </Popup>
            </Marker>
          ))}

          {/* School zones */}
          {schools.map((school) => (
            <Circle
              key={`zone-${school.id}`}
              center={[school.lat, school.lng]}
              radius={200}
              pathOptions={{ color: school.color, fillColor: school.color, fillOpacity: 0.06, weight: 1, dashArray: '4' }}
            />
          ))}

          {/* Bus markers */}
          {filteredBuses.map((bus) => {
            const pos = bus.route[bus.currentStop];
            const isSelected = selectedBus?.id === bus.id;
            return (
              <Marker
                key={bus.id}
                position={[pos.lat, pos.lng]}
                icon={createBusIcon(getStatusColor(bus.status), isSelected)}
                eventHandlers={{ click: () => handleSelectBus(bus) }}
              >
                <Popup>
                  <div style={{ fontFamily: 'Inter', fontSize: '13px' }}>
                    <strong>{bus.id}</strong> — {bus.number}<br />
                    {bus.school}<br />
                    Driver: {bus.driver}<br />
                    Status: {getStatusLabel(bus.status)}<br />
                    Students: {bus.students}/{bus.capacity}<br />
                    Speed: {bus.speed} km/h<br />
                    {bus.eta > 0 && `ETA: ${bus.eta} min`}
                  </div>
                </Popup>
              </Marker>
            );
          })}

          {/* Selected bus route line */}
          {selectedBus && (
            <Polyline
              positions={selectedBus.route.map(r => [r.lat, r.lng])}
              pathOptions={{ color: getStatusColor(selectedBus.status), weight: 3, dashArray: '8 8', opacity: 0.7 }}
            />
          )}
        </MapContainer>

        {/* Selected Bus Detail Panel */}
        <AnimatePresence>
          {selectedBus && (
            <motion.div
              className="tracking__detail-panel glass-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              <button className="tracking__detail-close" onClick={() => setSelectedBus(null)}>
                <X size={18} />
              </button>
              <div className="tracking__detail-header">
                <div className="tracking__detail-icon" style={{ background: getStatusColor(selectedBus.status) }}>
                  <Bus size={20} color="white" />
                </div>
                <div>
                  <h3>{selectedBus.id}</h3>
                  <p>{selectedBus.number}</p>
                </div>
                <span className={`badge badge-${selectedBus.status === 'on-route' ? 'success' : selectedBus.status === 'delayed' ? 'warning' : 'danger'}`}>
                  {getStatusLabel(selectedBus.status)}
                </span>
              </div>
              <div className="tracking__detail-grid">
                <div className="tracking__detail-item">
                  <MapPin size={14} />
                  <span>{selectedBus.school}</span>
                </div>
                <div className="tracking__detail-item">
                  <Users size={14} />
                  <span>{selectedBus.students}/{selectedBus.capacity} students</span>
                </div>
                <div className="tracking__detail-item">
                  <Navigation size={14} />
                  <span>{selectedBus.speed} km/h</span>
                </div>
                <div className="tracking__detail-item">
                  <Fuel size={14} />
                  <span>Fuel: {selectedBus.fuelLevel}%</span>
                </div>
                {selectedBus.eta > 0 && (
                  <div className="tracking__detail-item">
                    <Clock size={14} />
                    <span>ETA: {selectedBus.eta} min</span>
                  </div>
                )}
                <div className="tracking__detail-item">
                  <Phone size={14} />
                  <span>{selectedBus.driver}</span>
                </div>
              </div>
              <div className="tracking__route-stops">
                <h4>Route Stops</h4>
                {selectedBus.route.map((stop, i) => (
                  <div key={i} className={`tracking__stop ${i <= selectedBus.currentStop ? 'tracking__stop--passed' : ''} ${i === selectedBus.currentStop ? 'tracking__stop--current' : ''}`}>
                    <div className="tracking__stop-dot" />
                    <span>{stop.name}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
