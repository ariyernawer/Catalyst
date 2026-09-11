import { useState, useEffect } from 'react';
import { useAuthContext } from './useAuthContext';
import { OrganizerContext } from './contexts';
import { INITIAL_ORGANIZER, INITIAL_COMPETITIONS } from '../data/organizerDefaults';

/**
 * Model: organizer profile + competitions state manager.
 * All orchestration (CRUD, profile flows, toasts) lives in
 * controllers/competitionController.js and controllers/organizerController.js.
 * Views read state via useOrganizer and dispatch through the controllers.
 */
export const OrganizerProvider = ({ children }) => {
  // Authentication state comes from the shared AuthContext (httpOnly cookie based)
  const { user, role } = useAuthContext();
  const isAuthenticated = role === 'organizer' && !!user;

  // Organizer Profile State (seeded from the authenticated organizer when available)
  const [organizer, setOrganizer] = useState(() => {
    const saved = localStorage.getItem('catalyst_organizer_profile');
    return saved ? JSON.parse(saved) : INITIAL_ORGANIZER;
  });

  // Competitions List State
  const [competitions, setCompetitions] = useState(() => {
    const saved = localStorage.getItem('catalyst_competitions');
    return saved ? JSON.parse(saved) : INITIAL_COMPETITIONS;
  });

  // UI Toast notification state
  const [toast, setToast] = useState(null);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('catalyst_organizer_profile', JSON.stringify(organizer));
  }, [organizer]);

  useEffect(() => {
    localStorage.setItem('catalyst_competitions', JSON.stringify(competitions));
  }, [competitions]);

  const showToast = (message, type = 'success') => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  // Calculated Stats (pure derivation from state)
  const publishedCount = competitions.filter(c => c.status === 'Published').length;
  const draftCount = competitions.filter(c => c.status === 'Draft').length;
  const totalBookmarks = competitions.reduce((acc, c) => acc + (c.bookmarks || 0), 0);
  const upcomingEventsCount = competitions.filter(c => c.status === 'Published' || c.status === 'Draft').length;

  return (
    <OrganizerContext.Provider
      value={{
        isAuthenticated,
        organizer,
        competitions,
        publishedCount,
        draftCount,
        totalBookmarks,
        upcomingEventsCount,
        toast,
        showToast,
        setOrganizer,
        setCompetitions,
        setToast
      }}
    >
      {children}
      {/* Toast Notification Container */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 animate-fade-in flex items-center gap-3 bg-[#162127] border border-[#3a3534] text-[#e8dfd0] px-4 py-3 rounded-xl shadow-2xl">
          <div className={`w-2.5 h-2.5 rounded-full ${toast.type === 'info' ? 'bg-[#cf9d7b]' : 'bg-emerald-400 animate-pulse'}`} />
          <span className="text-sm font-medium">{toast.message}</span>
        </div>
      )}
    </OrganizerContext.Provider>
  );
};