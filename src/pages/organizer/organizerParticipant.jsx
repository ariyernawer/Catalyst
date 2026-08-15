import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Trophy } from 'lucide-react';

export const OrganizerParticipant = () => {
  return (
    <div className="participant-portal-page-shell page-container p-6 sm:p-10 flex flex-col items-center justify-center text-center">
      <div className="participant-info-card-box bg-surface border border-border rounded-card p-8 max-w-md w-full space-y-4 shadow-card">
        <Trophy className="participant-trophy-display-icon w-12 h-12 text-sand mx-auto" />
        <h1 className="participant-main-portal-title font-display text-2xl text-text-primary">
          Participant Portal
        </h1>
        <p className="participant-portal-sub-description text-xs text-text-secondary">
          Student competition exploration view.
        </p>
        <Link
          to="/organizer"
          className="participant-back-organizer-btn inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent-hover text-text-primary w-full py-2.5 rounded-xl text-xs font-medium transition-all shadow-md active:scale-[0.98]"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Organizer Portal</span>
        </Link>
      </div>
    </div>
  );
};

export default OrganizerParticipant;
