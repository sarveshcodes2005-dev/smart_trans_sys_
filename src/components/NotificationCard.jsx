import { motion } from 'framer-motion';
import { MessageSquare, AlertTriangle, CheckCircle, Clock } from 'lucide-react';

const typeConfig = {
  eta: { icon: Clock, color: '#00D4AA', bg: 'rgba(0, 212, 170, 0.1)' },
  alert: { icon: AlertTriangle, color: '#F59E0B', bg: 'rgba(245, 158, 11, 0.1)' },
  safety: { icon: CheckCircle, color: '#22C55E', bg: 'rgba(34, 197, 94, 0.1)' },
  message: { icon: MessageSquare, color: '#6366F1', bg: 'rgba(99, 102, 241, 0.1)' },
};

export default function NotificationCard({ type = 'message', title, message, time, delay = 0 }) {
  const config = typeConfig[type] || typeConfig.message;
  const Icon = config.icon;

  return (
    <motion.div
      className="notification-card"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay }}
      style={{
        display: 'flex',
        gap: '12px',
        padding: '14px 16px',
        borderRadius: 'var(--radius-md)',
        background: 'var(--bg-glass)',
        border: '1px solid var(--border-color)',
        alignItems: 'flex-start',
      }}
    >
      <div style={{
        width: 36,
        height: 36,
        borderRadius: 'var(--radius-sm)',
        background: config.bg,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}>
        <Icon size={18} style={{ color: config.color }} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '4px',
        }}>
          <span style={{ fontWeight: 600, fontSize: '0.85rem' }}>{title}</span>
          <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', flexShrink: 0 }}>{time}</span>
        </div>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>{message}</p>
      </div>
    </motion.div>
  );
}
