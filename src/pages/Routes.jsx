import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapContainer, TileLayer, Polyline, Circle, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import {
  Route, Zap, Clock, Fuel, Leaf, TrendingDown, Play, RotateCcw,
  CheckCircle, ArrowRight, BarChart3, Timer
} from 'lucide-react';
import { schools } from '../data/schoolData';
import './Routes.css';

const originalRoute = [
  [19.2720, 72.8580], [19.2740, 72.8560], [19.2760, 72.8590],
  [19.2755, 72.8610], [19.2770, 72.8630], [19.2790, 72.8620],
  [19.2800, 72.8650], [19.2780, 72.8670], [19.2813, 72.8683]
];

const optimizedRoute = [
  [19.2720, 72.8580], [19.2745, 72.8595],
  [19.2770, 72.8620], [19.2790, 72.8650], [19.2813, 72.8683]
];

const schoolIcon = L.divIcon({
  className: 'school-marker',
  html: `<div style="width:28px;height:28px;border-radius:50%;background:#6366F1;border:2px solid rgba(255,255,255,0.7);display:flex;align-items:center;justify-content:center;box-shadow:0 2px 8px rgba(99,102,241,0.4);">
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c0 1 2 3 6 3s6-2 6-3v-5"/></svg>
  </div>`,
  iconSize: [28, 28],
  iconAnchor: [14, 14],
});

const comparisons = [
  { label: 'Travel Time', before: '42 min', after: '28 min', improvement: '33%', icon: Clock },
  { label: 'Distance', before: '14.2 km', after: '10.8 km', improvement: '24%', icon: Route },
  { label: 'Fuel Usage', before: '3.8 L', after: '2.5 L', improvement: '34%', icon: Fuel },
  { label: 'CO₂ Emissions', before: '9.1 kg', after: '6.0 kg', improvement: '34%', icon: Leaf },
];

export default function Routes() {
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [isOptimized, setIsOptimized] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleOptimize = () => {
    setIsOptimizing(true);
    setProgress(0);
    setIsOptimized(false);

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsOptimizing(false);
          setIsOptimized(true);
          return 100;
        }
        return prev + 2;
      });
    }, 60);
  };

  const handleReset = () => {
    setIsOptimized(false);
    setProgress(0);
  };

  return (
    <div className="page routes">
      <div className="container">
        <motion.div
          className="routes__header"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <h1 className="routes__title">AI Route Optimizer</h1>
            <p className="routes__subtitle">MILP-based algorithm for optimal school bus routing in Mira Bhayandar</p>
          </div>
          <div className="routes__actions">
            {!isOptimized ? (
              <button className="btn btn-primary" onClick={handleOptimize} disabled={isOptimizing}>
                {isOptimizing ? <Timer size={18} className="spin" /> : <Zap size={18} />}
                {isOptimizing ? 'Optimizing...' : 'Run Optimization'}
              </button>
            ) : (
              <button className="btn btn-secondary" onClick={handleReset}>
                <RotateCcw size={18} />
                Reset
              </button>
            )}
          </div>
        </motion.div>

        {/* Progress Bar */}
        {isOptimizing && (
          <motion.div
            className="routes__progress glass-card"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="routes__progress-header">
              <span><Zap size={16} /> AI Optimization in Progress</span>
              <span className="routes__progress-percent">{progress}%</span>
            </div>
            <div className="routes__progress-bar">
              <div className="routes__progress-fill" style={{ width: `${progress}%` }} />
            </div>
            <div className="routes__progress-steps">
              <span className={progress > 20 ? 'active' : ''}>Analyzing traffic</span>
              <span className={progress > 40 ? 'active' : ''}>Calculating stops</span>
              <span className={progress > 60 ? 'active' : ''}>MILP solving</span>
              <span className={progress > 80 ? 'active' : ''}>Validating safety</span>
              <span className={progress >= 100 ? 'active' : ''}>Complete</span>
            </div>
          </motion.div>
        )}

        {/* Map Comparison */}
        <div className="routes__maps">
          <motion.div
            className="glass-card routes__map-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="routes__map-title">
              <span className="routes__map-badge routes__map-badge--before">Before</span>
              <h3>Original Route</h3>
            </div>
            <MapContainer center={[19.2770, 72.8630]} zoom={14} style={{ height: '350px', borderRadius: 'var(--radius-md)' }} zoomControl={false}>
              <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" />
              <Polyline positions={originalRoute} pathOptions={{ color: '#EF4444', weight: 4, opacity: 0.8 }} />
              {originalRoute.map((pos, i) => (
                <Circle key={i} center={pos} radius={30} pathOptions={{ color: '#EF4444', fillColor: '#EF4444', fillOpacity: 0.3, weight: 1 }} />
              ))}
              <Marker position={[19.2813, 72.8683]} icon={schoolIcon}>
                <Popup>St. Xavier's High School</Popup>
              </Marker>
            </MapContainer>
            <div className="routes__map-stats">
              <span><Clock size={14} /> 42 min</span>
              <span><Route size={14} /> 14.2 km</span>
              <span><Fuel size={14} /> 3.8 L</span>
            </div>
          </motion.div>

          <motion.div
            className="glass-card routes__map-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="routes__map-title">
              <span className="routes__map-badge routes__map-badge--after">After</span>
              <h3>Optimized Route</h3>
            </div>
            <MapContainer center={[19.2770, 72.8630]} zoom={14} style={{ height: '350px', borderRadius: 'var(--radius-md)' }} zoomControl={false}>
              <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" />
              {isOptimized && (
                <>
                  <Polyline positions={optimizedRoute} pathOptions={{ color: '#22C55E', weight: 4, opacity: 0.8 }} />
                  {optimizedRoute.map((pos, i) => (
                    <Circle key={i} center={pos} radius={30} pathOptions={{ color: '#22C55E', fillColor: '#22C55E', fillOpacity: 0.3, weight: 1 }} />
                  ))}
                </>
              )}
              <Polyline positions={originalRoute} pathOptions={{ color: '#EF4444', weight: 2, opacity: 0.3, dashArray: '6 6' }} />
              <Marker position={[19.2813, 72.8683]} icon={schoolIcon}>
                <Popup>St. Xavier's High School</Popup>
              </Marker>
              {/* Congestion zones */}
              {schools.map((s) => (
                <Circle key={s.id} center={[s.lat, s.lng]} radius={200} pathOptions={{ color: '#F59E0B', fillColor: '#F59E0B', fillOpacity: 0.05, weight: 1, dashArray: '4' }} />
              ))}
            </MapContainer>
            <div className="routes__map-stats">
              {isOptimized ? (
                <>
                  <span style={{ color: 'var(--success)' }}><Clock size={14} /> 28 min</span>
                  <span style={{ color: 'var(--success)' }}><Route size={14} /> 10.8 km</span>
                  <span style={{ color: 'var(--success)' }}><Fuel size={14} /> 2.5 L</span>
                </>
              ) : (
                <span style={{ color: 'var(--text-muted)' }}>Run optimization to see results</span>
              )}
            </div>
          </motion.div>
        </div>

        {/* Comparison Cards */}
        {isOptimized && (
          <motion.div
            className="routes__comparisons"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h3><BarChart3 size={18} /> Optimization Results</h3>
            <div className="grid-4">
              {comparisons.map((comp, i) => {
                const Icon = comp.icon;
                return (
                  <motion.div
                    key={i}
                    className="glass-card routes__comp-card"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 + i * 0.1 }}
                  >
                    <Icon size={20} style={{ color: 'var(--primary)', marginBottom: '10px' }} />
                    <span className="routes__comp-label">{comp.label}</span>
                    <div className="routes__comp-values">
                      <span className="routes__comp-before">{comp.before}</span>
                      <ArrowRight size={14} style={{ color: 'var(--text-muted)' }} />
                      <span className="routes__comp-after">{comp.after}</span>
                    </div>
                    <span className="routes__comp-improvement">
                      <TrendingDown size={14} />
                      {comp.improvement} reduction
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* Algorithm Info */}
        <motion.div
          className="glass-card routes__algorithm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h3><Zap size={18} /> How the Algorithm Works</h3>
          <div className="routes__algo-steps">
            {[
              { title: 'Data Collection', desc: 'Gather real-time traffic, school timings, and stop locations across Mira Bhayandar.' },
              { title: 'MILP Formulation', desc: 'Mixed-Integer Linear Programming minimizes total travel time with safety constraints.' },
              { title: 'Traffic Pattern Analysis', desc: 'Historical and live traffic data identifies congestion hotspots near school zones.' },
              { title: 'Constraint Satisfaction', desc: 'Ensure max capacity, time windows, and driver compliance requirements are met.' },
              { title: 'Route Generation', desc: 'Output optimized routes with 33% less travel time and 34% fuel reduction.' },
            ].map((step, i) => (
              <div key={i} className="routes__algo-step">
                <div className="routes__algo-num">{i + 1}</div>
                <div>
                  <h4>{step.title}</h4>
                  <p>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
