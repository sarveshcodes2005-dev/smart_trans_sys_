import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Shield, Users, Bus, School, TrendingUp, Activity,
  UserPlus, Settings, ChevronRight, BarChart3, Globe, Zap
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabaseClient';
import { buses } from '../data/busData';
import { schools } from '../data/schoolData';
import './AdminPanel.css';

export default function AdminPanel() {
  const { profile } = useAuth();
  const [userCounts, setUserCounts] = useState({
    total: 0,
    school_admin: 0,
    transport_coordinator: 0,
    driver: 0,
    parent: 0,
  });
  const [recentUsers, setRecentUsers] = useState([]);

  useEffect(() => {
    fetchUserStats();
  }, []);

  async function fetchUserStats() {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching users:', error);
        return;
      }

      if (data) {
        const counts = {
          total: data.length,
          school_admin: data.filter(u => u.role === 'school_admin').length,
          transport_coordinator: data.filter(u => u.role === 'transport_coordinator').length,
          driver: data.filter(u => u.role === 'driver').length,
          parent: data.filter(u => u.role === 'parent').length,
        };
        setUserCounts(counts);
        setRecentUsers(data.slice(0, 5));
      }
    } catch (err) {
      console.error('Failed to fetch stats:', err);
    }
  }

  const systemStats = [
    { label: 'Total Users', value: userCounts.total, icon: Users, color: '#6366F1', bg: 'rgba(99, 102, 241, 0.12)' },
    { label: 'Active Buses', value: buses.filter(b => b.status === 'on-route').length, icon: Bus, color: '#22C55E', bg: 'rgba(34, 197, 94, 0.12)' },
    { label: 'Schools', value: schools.length, icon: School, color: '#00D4AA', bg: 'rgba(0, 212, 170, 0.12)' },
    { label: 'Uptime', value: '99.9%', icon: Zap, color: '#F59E0B', bg: 'rgba(245, 158, 11, 0.12)' },
  ];

  const roleCards = [
    { role: 'School Admins', count: userCounts.school_admin, color: '#00D4AA', icon: School },
    { role: 'Coordinators', count: userCounts.transport_coordinator, color: '#F59E0B', icon: Settings },
    { role: 'Drivers', count: userCounts.driver, color: '#22C55E', icon: Bus },
    { role: 'Parents', count: userCounts.parent, color: '#818CF8', icon: Users },
  ];

  const getRoleBadgeClass = (role) => {
    const map = {
      super_admin: 'badge-info',
      school_admin: 'badge-success',
      transport_coordinator: 'badge-warning',
      driver: 'badge-success',
      parent: 'badge-info',
    };
    return map[role] || 'badge-info';
  };

  const getRoleLabel = (role) => {
    const map = {
      super_admin: 'Super Admin',
      school_admin: 'School Admin',
      transport_coordinator: 'Coordinator',
      driver: 'Driver',
      parent: 'Parent',
    };
    return map[role] || role;
  };

  return (
    <div className="page admin-panel">
      <div className="container">
        {/* Header */}
        <motion.div
          className="admin__header"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="admin__header-left">
            <div className="admin__header-badge">
              <Shield size={20} />
              <span>Super Admin</span>
            </div>
            <h1 className="admin__title">Command Center</h1>
            <p className="admin__subtitle">
              Welcome back, <strong>{profile?.full_name || 'Admin'}</strong> — Full system overview & control
            </p>
          </div>
          <Link to="/users" className="btn btn-primary">
            <UserPlus size={18} />
            Manage Users
          </Link>
        </motion.div>

        {/* System Stats */}
        <motion.div
          className="admin__stats"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {systemStats.map((stat, i) => (
            <div className="glass-card admin__stat" key={i}>
              <div className="admin__stat-icon" style={{ background: stat.bg, color: stat.color }}>
                <stat.icon size={22} />
              </div>
              <div className="admin__stat-info">
                <span className="admin__stat-value">{stat.value}</span>
                <span className="admin__stat-label">{stat.label}</span>
              </div>
            </div>
          ))}
        </motion.div>

        <div className="admin__grid">
          {/* Role Distribution */}
          <motion.div
            className="glass-card admin__role-distribution"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3><BarChart3 size={18} /> User Distribution by Role</h3>
            <div className="admin__role-cards">
              {roleCards.map((item, i) => (
                <div className="admin__role-card" key={i}>
                  <div className="admin__role-card-icon" style={{ color: item.color, background: `${item.color}15` }}>
                    <item.icon size={20} />
                  </div>
                  <span className="admin__role-card-count" style={{ color: item.color }}>{item.count}</span>
                  <span className="admin__role-card-label">{item.role}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Recent Users */}
          <motion.div
            className="glass-card admin__recent-users"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="admin__recent-header">
              <h3><Activity size={18} /> Recent Users</h3>
              <Link to="/users" className="admin__view-all">
                View All <ChevronRight size={14} />
              </Link>
            </div>
            <div className="admin__recent-list">
              {recentUsers.length === 0 ? (
                <p className="admin__empty">No users found. Create users from the Manage Users page.</p>
              ) : (
                recentUsers.map((user) => (
                  <div className="admin__recent-item" key={user.id}>
                    <div className="admin__recent-avatar">
                      {user.full_name?.charAt(0)?.toUpperCase() || '?'}
                    </div>
                    <div className="admin__recent-info">
                      <span className="admin__recent-name">{user.full_name}</span>
                      <span className="admin__recent-email">{user.email}</span>
                    </div>
                    <span className={`badge ${getRoleBadgeClass(user.role)}`}>
                      {getRoleLabel(user.role)}
                    </span>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <motion.div
          className="admin__quick-actions"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h3><Globe size={18} /> Quick Actions</h3>
          <div className="admin__actions-grid">
            <Link to="/dashboard" className="glass-card admin__action-card">
              <BarChart3 size={24} />
              <span>Fleet Dashboard</span>
              <ChevronRight size={16} />
            </Link>
            <Link to="/tracking" className="glass-card admin__action-card">
              <Activity size={24} />
              <span>Live Tracking</span>
              <ChevronRight size={16} />
            </Link>
            <Link to="/routes" className="glass-card admin__action-card">
              <TrendingUp size={24} />
              <span>Route Optimizer</span>
              <ChevronRight size={16} />
            </Link>
            <Link to="/users" className="glass-card admin__action-card">
              <UserPlus size={24} />
              <span>Add New User</span>
              <ChevronRight size={16} />
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
