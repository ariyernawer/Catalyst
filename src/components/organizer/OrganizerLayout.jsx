import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useOrganizer } from '../../context/OrganizerContext';
import {
  LayoutDashboard,
  Trophy,
  PlusCircle,
  Building2,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  Plus
} from 'lucide-react';

export const OrganizerLayout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { organizer, logout } = useOrganizer();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { name: 'Dashboard', path: '/organizer', icon: LayoutDashboard, exact: true },
    { name: 'My Competitions', path: '/organizer/competitions', icon: Trophy },
    { name: 'Create Competition', path: '/organizer/competitions/new', icon: PlusCircle },
    { name: 'Organization', path: '/organizer/organization', icon: Building2 }
  ];

  const isActive = (item) => {
    if (item.exact) return location.pathname === '/organizer' || location.pathname === '/organizer/dashboard';
    return location.pathname.startsWith(item.path);
  };

  const handleSignOut = () => { logout(); navigate('/'); };

  return (
    <div className="organizer-app-page-shell flex flex-col antialiased font-body min-h-screen bg-bg text-text-primary">
      {/* Top Sticky Header Bar */}
      <header className="organizer-top-header-bar sticky top-0 z-50 px-6 sm:px-8 py-4 flex items-center justify-between border-b border-border bg-[#0c1519]/95 backdrop-blur-md shadow-xs">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="mobile-sidebar-toggle-btn md:hidden p-2 rounded-lg hover:bg-surface-raised text-text-secondary hover:text-white cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <Link to="/organizer" className="brand-logo-link-row flex items-center gap-2.5">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sand font-display text-sm font-bold text-bg">
              C
            </span>
            <span className="font-display text-lg font-bold text-text-primary">
              Catalyst
            </span>
            <span className="brand-organizer-role-badge hidden sm:inline-block text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-full bg-surface text-text-secondary border border-border">
              Organizer
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/organizer/competitions/new"
            className="header-create-competition-btn inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent-hover text-text-primary px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all shadow-md active:scale-[0.98]"
          >
            <Plus className="w-4 h-4" />
            <span>Create Competition</span>
          </Link>
        </div>
      </header>

      <div className="organizer-body-layout-row flex-1 flex relative">
        {/* Mobile Overlay Backdrop */}
        {mobileOpen && (
          <div
            onClick={() => setMobileOpen(false)}
            className="mobile-overlay-backdrop-dim fixed inset-0 bg-black/60 z-30 md:hidden backdrop-blur-xs"
          />
        )}

        {/* Left Sidebar Panel */}
        <aside
          className={`organizer-left-sidebar-panel sidebar fixed md:sticky top-[65px] h-[calc(100vh-65px)] z-40 flex flex-col justify-between transition-all duration-300 ${
            collapsed ? 'w-20' : 'w-64'
          } ${mobileOpen ? 'left-0' : '-left-full md:left-0'}`}
        >
          {/* Sidebar Collapse Toggle */}
          <button
            type="button"
            onClick={() => setCollapsed(!collapsed)}
            className="sidebar-collapse-toggle-button hidden md:flex absolute -right-3 top-6 w-6 h-6 rounded-full bg-surface border border-border text-text-secondary hover:text-white shadow-md items-center justify-center z-50 cursor-pointer hover:scale-110 transition-transform"
            title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed ? <ChevronRight className="w-3.5 h-3.5" /> : <ChevronLeft className="w-3.5 h-3.5" />}
          </button>

          {/* Navigation Menu Items */}
          <nav className="sidebar-navigation-menu-list p-4 space-y-1.5 flex-1 overflow-y-auto">
            {navItems.map((item) => {
              const active = isActive(item);
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileOpen(false)}
                  className={`sidebar-navigation-menu-link nav-item ${
                    active
                      ? 'bg-surface-raised text-sand shadow-xs border border-border'
                      : 'text-text-secondary hover:text-text-primary hover:bg-surface-raised/40'
                  }`}
                  title={collapsed ? item.name : undefined}
                >
                  <Icon
                    className={`sidebar-nav-link-icon w-4 h-4 shrink-0 transition-colors ${
                      active ? 'text-sand' : 'text-text-muted'
                    }`}
                  />
                  {!collapsed && <span className="sidebar-nav-link-label truncate">{item.name}</span>}
                </Link>
              );
            })}
          </nav>

          {/* Bottom User Profile Box */}
          <div className="sidebar-bottom-profile-box p-4 border-t border-border bg-bg">
            {!collapsed ? (
              <div className="space-y-3">
                <Link to="/organizer/organization" className="organizer-profile-card-link flex items-center gap-3 group">
                  <div className="organizer-profile-avatar-circle w-9 h-9 rounded-full bg-sand text-bg flex items-center justify-center font-display text-sm font-bold shrink-0 shadow-md">
                    {organizer.avatar || organizer.name?.[0] || 'P'}
                  </div>
                  <div className="organizer-profile-info-block min-w-0 flex-1">
                    <p className="organizer-profile-display-name text-xs font-semibold text-text-primary truncate group-hover:text-sand transition-colors">
                      {organizer.name}
                    </p>
                    <p className="organizer-profile-org-name text-[11px] text-text-muted truncate">
                      {organizer.organizationName}
                    </p>
                  </div>
                </Link>

                <button
                  type="button"
                  onClick={handleSignOut}
                  className="sidebar-sign-out-button w-full flex items-center gap-2 text-xs text-text-secondary hover:text-sand transition-colors py-1 cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign out</span>
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-3">
                <Link
                  to="/organizer/organization"
                  className="organizer-profile-avatar-circle w-9 h-9 rounded-full bg-sand text-bg flex items-center justify-center font-display text-sm font-bold shadow-md"
                  title={`${organizer.name} (${organizer.organizationName})`}
                >
                  {organizer.avatar || 'P'}
                </Link>
                <button
                  type="button"
                  onClick={handleSignOut}
                  className="sidebar-sign-out-button p-1 text-text-secondary hover:text-sand cursor-pointer"
                  title="Sign out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </aside>

        {/* Main Page Content Area */}
        <main className="organizer-main-content-area flex-1 min-w-0 p-4 sm:p-6 md:p-8 lg:p-10 max-w-7xl mx-auto w-full">
          {children}
        </main>
      </div>
    </div>
  );
};

export default OrganizerLayout;
