import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  UserPlus, Search, Trash2, Edit3, X, Users, Shield, Bus,
  School, Settings, ChevronDown, Check, AlertCircle
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabaseClient';
import './UserManagement.css';

const ROLES = [
  { value: 'school_admin', label: 'School Admin', icon: School, color: '#00D4AA' },
  { value: 'transport_coordinator', label: 'Transport Coordinator', icon: Settings, color: '#F59E0B' },
  { value: 'driver', label: 'Driver', icon: Bus, color: '#22C55E' },
  { value: 'parent', label: 'Parent', icon: Users, color: '#818CF8' },
];

export default function UserManagement() {
  const { profile } = useAuth();
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    full_name: '',
    role: 'parent',
    school_id: '',
    assigned_bus: '',
    child_name: '',
    child_bus: '',
  });
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching users:', error);
    } else {
      setUsers(data || []);
    }
  }

  async function handleCreateUser(e) {
    e.preventDefault();
    setFormError('');
    setFormSuccess('');
    setIsSubmitting(true);

    try {
      // Create auth user via Supabase signup
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      });

      if (authError) throw authError;

      // Insert profile
      const { error: profileError } = await supabase.from('profiles').insert({
        id: authData.user.id,
        email: formData.email,
        full_name: formData.full_name,
        role: formData.role,
        school_id: formData.school_id || null,
        assigned_bus: formData.assigned_bus || null,
        child_name: formData.child_name || null,
        child_bus: formData.child_bus || null,
      });

      if (profileError) throw profileError;

      setFormSuccess(`User "${formData.full_name}" created successfully!`);
      setFormData({
        email: '', password: '', full_name: '', role: 'parent',
        school_id: '', assigned_bus: '', child_name: '', child_bus: '',
      });

      // Refresh list
      fetchUsers();
      
      // Close modal after brief success display
      setTimeout(() => {
        setShowModal(false);
        setFormSuccess('');
      }, 1500);
    } catch (err) {
      setFormError(err.message || 'Failed to create user');
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleDeleteUser(userId) {
    if (!window.confirm('Are you sure you want to remove this user?')) return;

    const { error } = await supabase
      .from('profiles')
      .delete()
      .eq('id', userId);

    if (error) {
      alert('Error deleting user: ' + error.message);
    } else {
      setUsers(users.filter(u => u.id !== userId));
    }
  }

  const filteredUsers = users.filter(u => {
    const matchSearch =
      u.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchRole = roleFilter === 'all' || u.role === roleFilter;
    return matchSearch && matchRole;
  });

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

  function openCreateModal() {
    setEditingUser(null);
    setFormData({
      email: '', password: '', full_name: '', role: 'parent',
      school_id: '', assigned_bus: '', child_name: '', child_bus: '',
    });
    setFormError('');
    setFormSuccess('');
    setShowModal(true);
  }

  return (
    <div className="page users-page">
      <div className="container">
        {/* Header */}
        <motion.div
          className="users__header"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <h1 className="users__title">User Management</h1>
            <p className="users__subtitle">Create and manage users across all roles</p>
          </div>
          <button className="btn btn-primary" onClick={openCreateModal}>
            <UserPlus size={18} />
            Create User
          </button>
        </motion.div>

        {/* Filters */}
        <motion.div
          className="users__filters glass-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="users__search">
            <Search size={16} />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="users__role-filters">
            <button
              className={`users__role-btn ${roleFilter === 'all' ? 'users__role-btn--active' : ''}`}
              onClick={() => setRoleFilter('all')}
            >
              All ({users.length})
            </button>
            {ROLES.map(r => (
              <button
                key={r.value}
                className={`users__role-btn ${roleFilter === r.value ? 'users__role-btn--active' : ''}`}
                onClick={() => setRoleFilter(r.value)}
              >
                <r.icon size={14} />
                {r.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Users Table */}
        <motion.div
          className="glass-card users__table-container"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {filteredUsers.length === 0 ? (
            <div className="users__empty">
              <Users size={48} />
              <h3>No users found</h3>
              <p>Create your first user by clicking "Create User" above.</p>
            </div>
          ) : (
            <div className="users__table-wrapper">
              <table className="users__table">
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Role</th>
                    <th>School / Bus</th>
                    <th>Created</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr key={user.id}>
                      <td>
                        <div className="users__cell-user">
                          <div className="users__avatar">
                            {user.full_name?.charAt(0)?.toUpperCase() || '?'}
                          </div>
                          <div>
                            <span className="users__cell-name">{user.full_name}</span>
                            <span className="users__cell-email">{user.email}</span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className={`badge ${getRoleBadgeClass(user.role)}`}>
                          {getRoleLabel(user.role)}
                        </span>
                      </td>
                      <td className="users__cell-meta">
                        {user.school_id || user.assigned_bus || user.child_bus || '—'}
                      </td>
                      <td className="users__cell-date">
                        {user.created_at
                          ? new Date(user.created_at).toLocaleDateString()
                          : '—'}
                      </td>
                      <td>
                        <div className="users__actions">
                          {user.role !== 'super_admin' && (
                            <button
                              className="users__action-btn users__action-btn--delete"
                              onClick={() => handleDeleteUser(user.id)}
                              title="Delete user"
                            >
                              <Trash2 size={14} />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </motion.div>

        {/* Create User Modal */}
        <AnimatePresence>
          {showModal && (
            <motion.div
              className="users__modal-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
            >
              <motion.div
                className="users__modal"
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 30, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="users__modal-header">
                  <h2><UserPlus size={20} /> Create New User</h2>
                  <button className="users__modal-close" onClick={() => setShowModal(false)}>
                    <X size={20} />
                  </button>
                </div>

                {formError && (
                  <div className="users__modal-error">
                    <AlertCircle size={16} />
                    {formError}
                  </div>
                )}

                {formSuccess && (
                  <div className="users__modal-success">
                    <Check size={16} />
                    {formSuccess}
                  </div>
                )}

                <form onSubmit={handleCreateUser} className="users__modal-form">
                  <div className="users__form-row">
                    <div className="users__form-group">
                      <label>Full Name *</label>
                      <input
                        type="text"
                        value={formData.full_name}
                        onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                        required
                        placeholder="e.g. Ramesh Kumar"
                      />
                    </div>
                    <div className="users__form-group">
                      <label>Role *</label>
                      <select
                        value={formData.role}
                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      >
                        {ROLES.map(r => (
                          <option key={r.value} value={r.value}>{r.label}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="users__form-row">
                    <div className="users__form-group">
                      <label>Email *</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                        placeholder="user@example.com"
                      />
                    </div>
                    <div className="users__form-group">
                      <label>Password *</label>
                      <input
                        type="password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        required
                        minLength={6}
                        placeholder="Min 6 characters"
                      />
                    </div>
                  </div>

                  {/* Conditional fields based on role */}
                  {(formData.role === 'school_admin' || formData.role === 'transport_coordinator') && (
                    <div className="users__form-group">
                      <label>School Name</label>
                      <input
                        type="text"
                        value={formData.school_id}
                        onChange={(e) => setFormData({ ...formData, school_id: e.target.value })}
                        placeholder="e.g. St. Xavier's High School"
                      />
                    </div>
                  )}

                  {formData.role === 'driver' && (
                    <div className="users__form-row">
                      <div className="users__form-group">
                        <label>Assigned Bus ID</label>
                        <input
                          type="text"
                          value={formData.assigned_bus}
                          onChange={(e) => setFormData({ ...formData, assigned_bus: e.target.value })}
                          placeholder="e.g. MB-01"
                        />
                      </div>
                      <div className="users__form-group">
                        <label>School Name</label>
                        <input
                          type="text"
                          value={formData.school_id}
                          onChange={(e) => setFormData({ ...formData, school_id: e.target.value })}
                          placeholder="e.g. St. Xavier's High School"
                        />
                      </div>
                    </div>
                  )}

                  {formData.role === 'parent' && (
                    <div className="users__form-row">
                      <div className="users__form-group">
                        <label>Child's Name</label>
                        <input
                          type="text"
                          value={formData.child_name}
                          onChange={(e) => setFormData({ ...formData, child_name: e.target.value })}
                          placeholder="e.g. Aarav Sharma"
                        />
                      </div>
                      <div className="users__form-group">
                        <label>Child's Bus ID</label>
                        <input
                          type="text"
                          value={formData.child_bus}
                          onChange={(e) => setFormData({ ...formData, child_bus: e.target.value })}
                          placeholder="e.g. MB-01"
                        />
                      </div>
                    </div>
                  )}

                  <button
                    type="submit"
                    className="btn btn-primary users__submit-btn"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <div className="login-form__spinner" />
                    ) : (
                      <>
                        <UserPlus size={18} />
                        Create User
                      </>
                    )}
                  </button>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
