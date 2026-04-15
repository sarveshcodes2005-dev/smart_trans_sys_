import { motion } from 'framer-motion';
import {
  User, GraduationCap, Target, Lightbulb, BookOpen, Code, Calendar,
  Download, ExternalLink, ChevronRight, Cpu, Database, Globe, MessageSquare,
  Cloud, MapPin, ArrowRight, CheckCircle
} from 'lucide-react';
import { techStack, literatureSurvey, subjectRoles, weeklyTimeline } from '../data/statsData';
import './About.css';

const techIcons = {
  Frontend: Code, Backend: Cpu, Database: Database, Maps: MapPin,
  Communication: MessageSquare, Infrastructure: Cloud,
};

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function About() {
  return (
    <div className="page about">
      <div className="container">
        {/* Hero */}
        <motion.div
          className="about__hero"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="about__hero-badge">
            <GraduationCap size={16} />
            <span>Idea Lab 2026-27 | SLRTCE — Department of Information Technology</span>
          </div>
          <h1 className="about__hero-title">
            About <span className="gradient-text">SARV</span>
          </h1>
          <p className="about__hero-subtitle">
            Smart and Sustainable School Transportation System for Mira Bhayandar
          </p>
        </motion.div>

        {/* Student Info */}
        <motion.div
          className="glass-card about__student"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="about__student-avatar">
            <User size={32} />
          </div>
          <div className="about__student-info">
            <h3>Sarvesh Hadkar</h3>
            <p>SE Information Technology — Division A-II</p>
            <div className="about__student-meta">
              <span>Roll No. 42</span>
              <span>•</span>
              <span>SLRTCE, Mumbai</span>
              <span>•</span>
              <span>Academic Year 2026-27</span>
            </div>
          </div>
        </motion.div>

        {/* Problem & Solution Grid */}
        <div className="about__problem-grid">
          <motion.div
            className="glass-card about__problem-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="about__card-icon" style={{ background: 'rgba(239, 68, 68, 0.12)', color: '#EF4444' }}>
              <Target size={24} />
            </div>
            <h3>Problem Statement</h3>
            <p>
              Many school transportation systems in Mira Bhayandar operate without real-time
              vehicle tracking or route optimization. Parents have no live updates on bus locations,
              and inefficient bus routing increases fuel consumption, commute time, and traffic
              congestion near schools. There is a need to improve safety, reduce carbon footprint,
              and streamline school logistics.
            </p>
          </motion.div>

          <motion.div
            className="glass-card about__problem-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="about__card-icon" style={{ background: 'rgba(0, 212, 170, 0.12)', color: '#00D4AA' }}>
              <Lightbulb size={24} />
            </div>
            <h3>Our Solution</h3>
            <p>
              A software-only, AI-driven platform providing real-time bus visibility and route
              optimization using driver smartphones — no GPS hardware needed. Integrates AI
              scheduling, WhatsApp-based tracking, and safety compliance monitoring to reduce
              congestion, fuel consumption, and costs while improving safety and urban mobility.
            </p>
          </motion.div>
        </div>

        {/* Objectives */}
        <motion.div
          className="glass-card about__objectives"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h3><Target size={18} /> Project Objectives</h3>
          <div className="about__objectives-list">
            {[
              'Design a real-time school bus tracking system for instant vehicle monitoring',
              'Optimize bus routes to reduce travel time, fuel consumption, and traffic congestion',
              'Improve student safety through timely alerts and better transport coordination',
              'Lower environmental impact by promoting fuel-efficient transportation practices',
              'Support sustainable development by integrating technology into school logistics'
            ].map((obj, i) => (
              <motion.div key={i} className="about__objective" variants={itemVariants}>
                <CheckCircle size={18} style={{ color: 'var(--primary)', flexShrink: 0 }} />
                <span>{obj}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Tech Stack */}
        <section className="about__tech-section">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="section-title">Technology Stack</h2>
            <p className="section-subtitle">The architecture powering SARV's real-time platform</p>
          </motion.div>

          <motion.div
            className="grid-3"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {techStack.map((tech, i) => {
              const Icon = techIcons[tech.category] || Code;
              return (
                <motion.div key={i} className="glass-card about__tech-card" variants={itemVariants}>
                  <div className="about__tech-category">
                    <Icon size={14} />
                    <span>{tech.category}</span>
                  </div>
                  <h4>{tech.name}</h4>
                  <p>{tech.description}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </section>

        {/* Subject Roles */}
        <section className="about__subjects-section">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="section-title">Core Subject Integration</h2>
            <p className="section-subtitle">How each academic subject contributes to the project</p>
          </motion.div>

          <motion.div
            className="about__subjects-grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {subjectRoles.map((role, i) => (
              <motion.div key={i} className="glass-card about__subject-card" variants={itemVariants}>
                <h4>{role.subject}</h4>
                <p>{role.contribution}</p>
                <div className="about__subject-impact">
                  <ArrowRight size={14} />
                  <span>{role.impact}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Timeline */}
        <section className="about__timeline-section">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="section-title">12-Week Agile Timeline</h2>
            <p className="section-subtitle">Sprint-based execution plan for MVP delivery</p>
          </motion.div>

          <div className="about__timeline">
            {weeklyTimeline.map((item, i) => (
              <motion.div
                key={i}
                className="about__timeline-item"
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="about__timeline-marker">
                  <div className="about__timeline-dot" />
                  {i < weeklyTimeline.length - 1 && <div className="about__timeline-line" />}
                </div>
                <div className="glass-card about__timeline-content">
                  <span className="about__timeline-week">{item.week}</span>
                  <h4>{item.milestone}</h4>
                  <p>{item.detail}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Literature Survey */}
        <section className="about__literature-section">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="section-title">Literature Survey</h2>
            <p className="section-subtitle">Research papers and studies supporting the project</p>
          </motion.div>

          <motion.div
            className="about__literature-list"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {literatureSurvey.map((paper, i) => (
              <motion.div key={i} className="glass-card about__paper" variants={itemVariants}>
                <div className="about__paper-num">{paper.id}</div>
                <div className="about__paper-content">
                  <h4>{paper.title}</h4>
                  <span className="about__paper-author">{paper.author}</span>
                  <p>{paper.finding}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Downloads */}
        <motion.div
          className="glass-card about__downloads"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3><Download size={18} /> Project Documents</h3>
          <div className="about__download-links">
            <a href="/SARV idea lab.pdf" target="_blank" className="btn btn-primary">
              <Download size={16} />
              Idea Lab Presentation
              <ExternalLink size={14} />
            </a>
            <a href="/SARV.SOP.pdf" target="_blank" className="btn btn-accent">
              <Download size={16} />
              SOP Document
              <ExternalLink size={14} />
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
