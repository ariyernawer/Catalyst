import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard } from 'lucide-react';

export const Navbar = () => {
  const location = useLocation();

  if (location.pathname.startsWith('/organizer')) return null;

  return (
    <header className="site-top-nav-header h-16 border-b border-border bg-bg/95 backdrop-blur-md sticky top-0 z-30 px-4 sm:px-6 flex items-center justify-between">
      <Link to="/" className="brand-logo-link-row flex items-center gap-2.5">
        <div className="brand-circular-logo-icon w-8 h-8 rounded-full bg-surface border border-border text-text-primary flex items-center justify-center font-display font-bold text-sm shadow-xs">
          C
        </div>
        <span className="brand-catalyst-name-text font-display text-xl font-semibold tracking-tight text-text-primary">
          Catalyst
        </span>
      </Link>

      <nav className="site-nav-links-row flex items-center gap-4">
        <Link
          to="/participant"
          className="nav-explore-link-text text-xs font-medium text-text-secondary hover:text-text-primary transition-colors"
        >
          Explore Competitions
        </Link>
        <Link
          to="/organizer"
          className="nav-portal-action-btn inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-accent hover:bg-accent-hover text-text-primary text-xs font-medium transition-all shadow-xs"
        >
          <LayoutDashboard className="w-3.5 h-3.5" />
          <span>Organizer Portal</span>
        </Link>
      </nav>
    </header>
  );
};

export default Navbar;