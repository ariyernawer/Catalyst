import { useState, useEffect, useCallback } from 'react';
import { useAuthContext } from './useAuthContext';
import { OrganizerContext } from './contexts';
import { INITIAL_ORGANIZER } from '../data/organizerDefaults';
import { competitionApi } from '../api/competitionApi';

/**
 * Model: organizer profile + competitions state manager.
 * Fetches real events from MongoDB backend and syncs state.
 * Views read state via useOrganizer and dispatch through the controllers.
 */
export const OrganizerProvider = ({ children }) => {
  const { user, role } = useAuthContext();
  const isAuthenticated = role === 'organizer' && !!user;

  // Organizer Profile State (synced from the authenticated user)
  const [organizer, setOrganizer] = useState(() => {
    try {
      const saved = localStorage.getItem('catalyst_organizer_profile');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.organizationName && parsed.organizationName !== 'InnovateHub Foundation') {
          return parsed;
        }
      }
    } catch {
      // ignore
    }
    return INITIAL_ORGANIZER;
  });

  // Competitions List State from MongoDB database
  const [competitions, setCompetitions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // UI Toast notification state
  const [toast, setToast] = useState(null);

  // Fetch organizer's events from MongoDB database
  const fetchCompetitions = useCallback(async () => {
    if (!isAuthenticated) return;
    setIsLoading(true);
    try {
      const res = await competitionApi.getAll();
      if (Array.isArray(res.data)) {
        setCompetitions(res.data);
      }
    } catch (err) {
      console.error('Failed to fetch organizer events:', err);
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated]);

  // Load events when organizer authenticates
  useEffect(() => {
    if (isAuthenticated) {
      fetchCompetitions();
      if (user) {
        setOrganizer({
          ...INITIAL_ORGANIZER,
          ...user,
          name: user.contactPerson || user.fullname || user.name || 'Organizer',
          contactPerson: user.contactPerson || user.fullname || user.name || 'Organizer',
          organizationName: user.organizationName || 'Organization',
          avatar: (user.contactPerson?.[0] || user.fullname?.[0] || user.organizationName?.[0] || 'O').toUpperCase()
        });
      }
    } else {
      setCompetitions([]);
    }
  }, [isAuthenticated, user, fetchCompetitions]);

  // Sync profile to local storage
  useEffect(() => {
    if (organizer) {
      localStorage.setItem('catalyst_organizer_profile', JSON.stringify(organizer));
    }
  }, [organizer]);

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
        isLoading,
        publishedCount,
        draftCount,
        totalBookmarks,
        upcomingEventsCount,
        toast,
        showToast,
        setOrganizer,
        setCompetitions,
        setToast,
        fetchCompetitions
      }}
    >
      {children}
      {/* Toast Notification Container */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 animate-fade-in flex items-center gap-3 bg-[#162127] border border-[#3a3534] text-[#e8dfd0] px-4 py-3 rounded-xl shadow-2xl">
          <div className={`w-2.5 h-2.5 rounded-full ${toast.type === 'info' ? 'bg-[#cf9d7b]' : toast.type === 'error' ? 'bg-red-400' : 'bg-emerald-400 animate-pulse'}`} />
          <span className="text-sm font-medium">{toast.message}</span>
        </div>
      )}
    </OrganizerContext.Provider>
  );
};