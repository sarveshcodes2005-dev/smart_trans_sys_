import { Bus, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div className="footer__brand">
            <div className="footer__logo">
              <div className="footer__logo-icon">
                <Bus size={20} />
              </div>
              <span className="footer__logo-text">SARV</span>
            </div>
            <p className="footer__tagline">
              Smart and Sustainable School Transportation System for Mira Bhayandar
            </p>
            <div className="footer__location">
              <MapPin size={14} />
              <span>Mira Bhayandar, Maharashtra, India</span>
            </div>
          </div>

          <div className="footer__links-group">
            <h4 className="footer__heading">Platform</h4>
            <Link to="/dashboard" className="footer__link">Dashboard</Link>
            <Link to="/tracking" className="footer__link">Live Tracking</Link>
            <Link to="/routes" className="footer__link">Route Optimizer</Link>
            <Link to="/parent" className="footer__link">Parent Portal</Link>
          </div>

          <div className="footer__links-group">
            <h4 className="footer__heading">Project</h4>
            <Link to="/about" className="footer__link">About SARV</Link>
            <a href="/SARV idea lab.pdf" target="_blank" className="footer__link">Presentation PDF</a>
            <a href="/SARV.SOP.pdf" target="_blank" className="footer__link">SOP Document</a>
          </div>

          <div className="footer__links-group">
            <h4 className="footer__heading">Developer</h4>
            <p className="footer__dev-info">Sarvesh Hadkar</p>
            <p className="footer__dev-info">SE I.T. A-II | Roll No. 42</p>
            <p className="footer__dev-info">SLRTCE, Mumbai</p>
          </div>
        </div>

        <div className="footer__bottom">
          <p className="footer__copyright">
            © 2026 SARV — Idea Lab Project | SLRTCE Department of Information Technology
          </p>
          <p className="footer__academic">Academic Year 2026-27</p>
        </div>
      </div>
    </footer>
  );
}
