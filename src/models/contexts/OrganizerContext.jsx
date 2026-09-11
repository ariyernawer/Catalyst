import { createContext, useContext, useState, useEffect } from 'react';
import { useAuthContext } from './AuthContext';
import { INITIAL_ORGANIZER, INITIAL_COMPETITIONS } from '../data/organizerDefaults';

const OrganizerContext = createContext(null);

export const OrganizerProvider = ({ children }) => {
  // Authentication state comes from the shared AuthContext (httpOnly cookie based)
  const { user, role, logout: authLogout } = useAuthContext();
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

  // CRUD Operations
  const createCompetition = (data, status = 'Draft') => {
    const newComp = {
      ...data,
      id: `comp-${Date.now()}`,
      status,
      bookmarks: 0,
      lastUpdated: 'Just now',
      thumbnail: data.thumbnail || data.banner || 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=600&q=80',
      banner: data.banner || 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80'
    };

    setCompetitions(prev => [newComp, ...prev]);
    showToast(status === 'Published' ? 'Competition published successfully!' : 'Competition saved as draft!');
    return newComp;
  };

  const updateCompetition = (id, updatedFields) => {
    setCompetitions(prev =>
      prev.map(c => (c.id === id ? { ...c, ...updatedFields, lastUpdated: 'Just now' } : c))
    );
    showToast('Competition updated successfully!');
  };

  const deleteCompetition = (id) => {
    setCompetitions(prev => prev.filter(c => c.id !== id));
    showToast('Competition deleted.', 'info');
  };

  const toggleCompetitionStatus = (id, newStatus) => {
    setCompetitions(prev =>
      prev.map(c => (c.id === id ? { ...c, status: newStatus, lastUpdated: 'Just now' } : c))
    );
    showToast(`Status changed to ${newStatus}`);
  };

  const duplicateCompetition = (id) => {
    const source = competitions.find(c => c.id === id);
    if (!source) return;
    const duplicated = {
      ...source,
      id: `comp-${Date.now()}`,
      title: `${source.title} (Copy)`,
      status: 'Draft',
      bookmarks: 0,
      lastUpdated: 'Just now'
    };
    setCompetitions(prev => [duplicated, ...prev]);
    showToast('Competition duplicated as Draft!');
  };

  const updateProfile = (updatedProfile) => {
    setOrganizer(prev => ({ ...prev, ...updatedProfile }));
    showToast('Organization profile saved successfully!');
  };

  const registerOrganizer = (accountData) => {
    const newOrg = {
      ...organizer,
      ...accountData,
      organizationName: accountData.organizationName || organizer.organizationName || 'New Organization',
      organizationType: accountData.organizationType || organizer.organizationType || 'Organization',
      contactPerson: accountData.contactPerson || organizer.contactPerson || 'Contact Person',
      name: accountData.contactPerson || organizer.name || 'Organizer',
      phone: accountData.phone || '',
      email: accountData.email || '',
      website: accountData.website || '',
      description: accountData.description || '',
      verified: true
    };
    setOrganizer(newOrg);
    showToast('Organizer application submitted and account created!');
  };

  const login = (organizerData) => {
    if (organizerData) {
      const updatedOrg = {
        ...organizer,
        ...organizerData,
        name: organizerData.contactPerson || organizerData.name || organizer.name
      };
      setOrganizer(updatedOrg);
    }
    showToast('Signed in successfully!');
  };

  const logout = async () => {
    await authLogout();
    showToast('Signed out.', 'info');
  };

  // Calculated Stats
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
        createCompetition,
        updateCompetition,
        deleteCompetition,
        toggleCompetitionStatus,
        duplicateCompetition,
        updateProfile,
        registerOrganizer,
        login,
        logout,
        toast,
        showToast
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

export const useOrganizer = () => {
  const context = useContext(OrganizerContext);
  if (!context) {
    throw new Error('useOrganizer must be used within an OrganizerProvider');
  }
  return context;
};