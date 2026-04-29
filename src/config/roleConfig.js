import {
  Shield, LayoutDashboard, MapPin, Route, Users, Info, Bus, Truck, UserCog
} from 'lucide-react';

/**
 * Central role configuration — defines what each user role can see and access.
 */
export const ROLE_CONFIG = {
  super_admin: {
    label: 'Super Admin',
    color: '#6366F1',
    home: '/admin',
    routes: ['/', '/admin', '/dashboard', '/tracking', '/routes', '/parent', '/users', '/about'],
    navItems: [
      { path: '/', label: 'Home', icon: Bus },
      { path: '/admin', label: 'Admin Panel', icon: Shield },
      { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
      { path: '/tracking', label: 'Live Tracking', icon: MapPin },
      { path: '/routes', label: 'Routes', icon: Route },
      { path: '/parent', label: 'Parent Portal', icon: Users },
      { path: '/users', label: 'Manage Users', icon: UserCog },
      { path: '/about', label: 'About', icon: Info },
    ],
  },
  school_admin: {
    label: 'School Admin',
    color: '#00D4AA',
    home: '/dashboard',
    routes: ['/', '/dashboard', '/tracking', '/routes', '/about'],
    navItems: [
      { path: '/', label: 'Home', icon: Bus },
      { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
      { path: '/tracking', label: 'Live Tracking', icon: MapPin },
      { path: '/routes', label: 'Routes', icon: Route },
      { path: '/about', label: 'About', icon: Info },
    ],
  },
  transport_coordinator: {
    label: 'Transport Coordinator',
    color: '#F59E0B',
    home: '/tracking',
    routes: ['/', '/tracking', '/routes', '/dashboard', '/about'],
    navItems: [
      { path: '/', label: 'Home', icon: Bus },
      { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
      { path: '/tracking', label: 'Live Tracking', icon: MapPin },
      { path: '/routes', label: 'Routes', icon: Route },
      { path: '/about', label: 'About', icon: Info },
    ],
  },
  driver: {
    label: 'Driver',
    color: '#22C55E',
    home: '/driver',
    routes: ['/', '/driver', '/about'],
    navItems: [
      { path: '/', label: 'Home', icon: Bus },
      { path: '/driver', label: 'My Route', icon: Truck },
      { path: '/about', label: 'About', icon: Info },
    ],
  },
  parent: {
    label: 'Parent',
    color: '#818CF8',
    home: '/parent',
    routes: ['/', '/parent', '/about'],
    navItems: [
      { path: '/', label: 'Home', icon: Bus },
      { path: '/parent', label: 'Track My Child', icon: Users },
      { path: '/about', label: 'About', icon: Info },
    ],
  },
};

/** Routes accessible without login */
export const PUBLIC_ROUTES = ['/', '/login', '/about'];

/** Get config for a role, with fallback */
export function getRoleConfig(role) {
  return ROLE_CONFIG[role] || ROLE_CONFIG.parent;
}
