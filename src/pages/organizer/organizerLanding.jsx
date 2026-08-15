import React from 'react';
import { Link } from 'react-router-dom';
import { Trophy, Users, ArrowRight, ShieldCheck, Sparkles, Building2 } from 'lucide-react';

export const OrganizerLanding = () => {
  return (
    <div className="organizer-landing-full-page page-container flex flex-col justify-center items-center px-4 py-16 selection:bg-sand/25 selection:text-white">
      {/* Brand Logo Header Row */}
      <div className="landing-brand-header-row flex items-center gap-2.5 mb-8">
        <div className="brand-circular-logo-icon w-9 h-9 rounded-full bg-surface border border-border text-text-primary flex items-center justify-center font-display font-bold text-base shadow-md">
          C
        </div>
        <span className="brand-catalyst-name-text font-display text-2xl font-semibold tracking-tight text-text-primary">
          Catalyst
        </span>
      </div>

      <div className="landing-hero-content-block max-w-3xl mx-auto text-center space-y-6 animate-fade-in">
        <div className="landing-gateway-label-badge inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface border border-border text-xs font-medium text-sand">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Organizer Gateway</span>
        </div>

        <h1 className="landing-main-hero-title font-display text-4xl sm:text-6xl text-text-primary font-normal tracking-tight leading-tight">
          Where Ambitious Builders Meet Opportunity.
        </h1>

        <p className="landing-hero-sub-description text-base sm:text-lg text-text-secondary max-w-2xl mx-auto leading-relaxed">
          Host high-impact hackathons, case competitions, design sprints, and scientific olympiads. Reach over 180,000+ student innovators worldwide.
        </p>

        <div className="landing-cta-buttons-group flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link
            to="/organizer"
            className="landing-go-dashboard-btn inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent-hover text-text-primary w-full sm:w-auto px-6 py-3.5 rounded-xl shadow-lg hover:shadow-stone-950/50 active:scale-[0.98] text-sm font-medium transition-all"
          >
            <Building2 className="w-4 h-4 text-sand" />
            <span>Go to Organizer Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/signup"
            className="landing-create-account-btn inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3.5 rounded-xl bg-surface border border-border hover:bg-surface-raised text-text-primary text-sm font-medium transition-all shadow-xs"
          >
            <span>Create Organizer Account</span>
          </Link>
        </div>

        {/* Feature Highlights Grid */}
        <div className="landing-features-highlight-grid grid grid-cols-1 sm:grid-cols-3 gap-4 pt-12 text-left">
          <div className="feature-highlight-card-box bg-surface border border-border rounded-card p-5 shadow-xs">
            <Trophy className="w-5 h-5 text-sand mb-2" />
            <h2 className="feature-card-title-text font-display text-base font-medium text-text-primary">Verified Opportunities</h2>
            <p className="feature-card-sub-text text-xs text-text-secondary mt-1">Direct listing and student application pipelines with zero spam.</p>
          </div>
          <div className="feature-highlight-card-box bg-surface border border-border rounded-card p-5 shadow-xs">
            <Users className="w-5 h-5 text-sand mb-2" />
            <h2 className="feature-card-title-text font-display text-base font-medium text-text-primary">180,000+ Talent Pool</h2>
            <p className="feature-card-sub-text text-xs text-text-secondary mt-1">Connect with engineers, designers, and business strategists.</p>
          </div>
          <div className="feature-highlight-card-box bg-surface border border-border rounded-card p-5 shadow-xs">
            <ShieldCheck className="w-5 h-5 text-sand mb-2" />
            <h2 className="feature-card-title-text font-display text-base font-medium text-text-primary">Instant Publishing</h2>
            <p className="feature-card-sub-text text-xs text-text-secondary mt-1">Multi-step creator with live participant previews and analytics.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrganizerLanding;
