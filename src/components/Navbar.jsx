import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard } from 'lucide-react';

export const Navbar = () => {
  const location = useLocation();

  if (location.pathname.startsWith('/organizer')) return null;

  return (
    <header className="site-top-nav-header sticky top-0 z-50 px-6 sm:px-8 py-4 flex items-center justify-between border-b border-border bg-[#0c1519]/95 backdrop-blur-md shadow-xs">
      <Link to="/" className="brand-logo-link-row flex items-center gap-2.5">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sand font-display text-sm font-bold text-bg">
          C
        </span>
        <span className="font-display text-lg font-bold text-text-primary">
          Catalyst
        </span>
      </Link>

      <nav className="site-nav-links-row flex items-center gap-4">
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