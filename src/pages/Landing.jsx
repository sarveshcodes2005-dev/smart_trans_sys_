import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight, Route, Smartphone, Bell, ShieldCheck, LayoutDashboard, Leaf,
  Clock, TrafficCone, Eye, Users, IndianRupee, ChevronRight, Bus, Zap, Globe
} from 'lucide-react';
import StatCard from '../components/StatCard';
import { features, howItWorks, impactStats } from '../data/statsData';
import './Landing.css';

const iconMap = {
  route: Route, smartphone: Smartphone, bell: Bell, 'shield-check': ShieldCheck,
  'layout-dashboard': LayoutDashboard, leaf: Leaf, clock: Clock,
  'traffic-cone': TrafficCone, eye: Eye, users: Users,
  'indian-rupee': IndianRupee, 'piggy-bank': IndianRupee,
};

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function Landing() {
  return (
    <div className="page landing">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero__bg-effects">
          <div className="hero__orb hero__orb--1" />
          <div className="hero__orb hero__orb--2" />
          <div className="hero__grid-overlay" />
        </div>

        <div className="container hero__content">
          <motion.div
            className="hero__badge"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Zap size={14} />
            <span>Idea Lab Project 2026-27 — SLRTCE</span>
          </motion.div>

          <motion.h1
            className="hero__title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            Smarter Routes.
            <br />
            <span className="gradient-text">Safer Students.</span>
            <br />
            Greener Cities.
          </motion.h1>

          <motion.p
            className="hero__subtitle"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            AI-driven school transportation platform for Mira Bhayandar —
            real-time tracking, route optimization, and WhatsApp-based parent alerts.
            Zero hardware needed.
          </motion.p>

          <motion.div
            className="hero__actions"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <Link to="/dashboard" className="btn btn-primary">
              <LayoutDashboard size={18} />
              Open Dashboard
              <ArrowRight size={16} />
            </Link>
            <Link to="/tracking" className="btn btn-secondary">
              <Bus size={18} />
              Live Tracking
            </Link>
          </motion.div>

          <motion.div
            className="hero__mini-stats"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <div className="hero__mini-stat">
              <span className="hero__mini-value">15</span>
              <span className="hero__mini-label">Pilot Schools</span>
            </div>
            <div className="hero__mini-divider" />
            <div className="hero__mini-stat">
              <span className="hero__mini-value">8</span>
              <span className="hero__mini-label">Active Buses</span>
            </div>
            <div className="hero__mini-divider" />
            <div className="hero__mini-stat">
              <span className="hero__mini-value">237</span>
              <span className="hero__mini-label">Students Tracked</span>
            </div>
            <div className="hero__mini-divider" />
            <div className="hero__mini-stat">
              <div className="pulse-dot" style={{ marginRight: 6 }} />
              <span className="hero__mini-label" style={{ color: 'var(--success)' }}>System Online</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section features-section">
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-title">Platform Features</h2>
            <p className="section-subtitle">
              A complete software-only solution that transforms school transportation
              without any hardware installation.
            </p>
          </motion.div>

          <motion.div
            className="grid-3 features-grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {features.map((feature, i) => {
              const Icon = iconMap[feature.icon] || Globe;
              return (
                <motion.div key={i} className="glass-card feature-card" variants={itemVariants}>
                  <div className="feature-card__icon" style={{ background: `${feature.color}15`, color: feature.color }}>
                    <Icon size={24} />
                  </div>
                  <h3 className="feature-card__title">{feature.title}</h3>
                  <p className="feature-card__desc">{feature.description}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section how-section">
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-title">How It Works</h2>
            <p className="section-subtitle">
              From driver's phone to parent's WhatsApp — a seamless 4-step process.
            </p>
          </motion.div>

          <div className="how-steps">
            {howItWorks.map((item, i) => (
              <motion.div
                key={i}
                className="how-step"
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
              >
                <div className="how-step__number">
                  <span>{item.step}</span>
                </div>
                <div className="how-step__content">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
                {i < howItWorks.length - 1 && <div className="how-step__connector" />}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="section stats-section">
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-title">Expected Impact</h2>
            <p className="section-subtitle">
              Measurable outcomes designed to transform school transportation in Mira Bhayandar.
            </p>
          </motion.div>

          <div className="grid-3">
            {impactStats.map((stat, i) => {
              const Icon = iconMap[stat.icon] || Globe;
              return (
                <StatCard
                  key={i}
                  icon={Icon}
                  value={stat.value}
                  suffix={stat.suffix}
                  label={stat.label}
                  delay={i * 0.1}
                  color={i % 2 === 0 ? 'var(--primary)' : 'var(--accent)'}
                />
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <motion.div
            className="cta-card glass-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2>Ready to Explore the Platform?</h2>
            <p>Navigate through the dashboard, track buses in real-time, and see the route optimizer in action.</p>
            <div className="cta-card__actions">
              <Link to="/dashboard" className="btn btn-primary">
                School Dashboard <ChevronRight size={16} />
              </Link>
              <Link to="/parent" className="btn btn-accent">
                Parent Portal <ChevronRight size={16} />
              </Link>
              <Link to="/about" className="btn btn-secondary">
                Learn More
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
