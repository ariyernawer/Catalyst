import { useOrganizer } from "../models/contexts/useOrganizer";

/**
 * Controller: competition CRUD + form helpers.
 * Pure helpers (constants, payload builders, validation) are exported for views;
 * the hook exposes state-mutating actions. Views never mutate state directly.
 */

export const CATEGORIES = ['Technology','Programming','Business','Case Competition','Innovation','Entrepreneurship','Design','Science','Olympiad','Other'];
export const EDUCATION_LEVELS = ['School','College','University','Graduate','Open to All'];
export const PRESET_BANNERS = [
  'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80'
];

/** Parse the "Date - Milestone" textarea into timeline objects. */
export function parseTimeline(timelineText, fallback) {
  const lines = (timelineText || '').split('\n').filter((l) => l.trim().length > 0);
  if (lines.length === 0) return fallback;
  return lines.map((line) => {
    const parts = line.split(/[-–—:]/);
    if (parts.length > 1) return { date: parts[0].trim(), stage: parts.slice(1).join('-').trim(), desc: 'Key Milestone' };
    return { date: 'Phase', stage: line.trim(), desc: 'Milestone' };
  });
}

/** Build the timeline from form data, falling back to the three default milestones. */
export function buildTimeline(formData) {
  return parseTimeline(formData.timelineText, [
    { stage: 'Registration Opens', date: formData.registrationOpens || 'TBA', desc: 'Call for registrations' },
    { stage: 'Submission Deadline', date: formData.registrationDeadline || 'TBA', desc: 'Submissions close' },
    { stage: 'Final Event', date: formData.eventDate || 'TBA', desc: 'Main competition day' }
  ]);
}

/** Shape the form data into a competition record for the model. */
export function buildCompetitionPayload(formData, status) {
  return {
    title: formData.title || (status === 'Draft' ? 'Untitled Competition (Draft)' : ''),
    category: formData.category,
    shortDescription: formData.shortDescription || 'Draft opportunity.',
    fullDescription: formData.fullDescription,
    banner: formData.banner,
    thumbnail: formData.thumbnail || formData.banner,
    educationLevels: formData.educationLevels,
    participationType: formData.participationType,
    minTeamSize: parseInt(formData.minTeamSize, 10) || 1,
    maxTeamSize: parseInt(formData.maxTeamSize, 10) || 1,
    eligibilityRules: formData.eligibilityRules,
    registrationOpens: formData.registrationOpens,
    deadline: formData.registrationDeadline || (status === 'Draft' ? 'Draft' : 'Open'),
    eventDate: formData.eventDate || (status === 'Draft' ? 'Draft' : 'TBA'),
    eventType: formData.eventType,
    location: formData.locationInfo || formData.eventType,
    prizes: formData.prizes,
    rules: formData.rules,
    timeline: buildTimeline(formData),
    registrationUrl: formData.registrationUrl,
    contactEmail: formData.contactEmail,
    additionalContact: formData.additionalContact
  };
}

/** Prefill the form from an existing competition (edit mode). */
export function getEditPrefill(competitions, id, organizerEmail) {
  const existing = competitions.find((c) => c.id === id);
  if (!existing) return null;
  return {
    title: existing.title || '', category: existing.category || 'Technology',
    shortDescription: existing.shortDescription || '', fullDescription: existing.fullDescription || '',
    banner: existing.banner || PRESET_BANNERS[0], thumbnail: existing.thumbnail || PRESET_BANNERS[0],
    educationLevels: existing.educationLevels || ['University'],
    participationType: existing.participationType || 'Team',
    minTeamSize: existing.minTeamSize ? String(existing.minTeamSize) : '2',
    maxTeamSize: existing.maxTeamSize ? String(existing.maxTeamSize) : '5',
    eligibilityRules: existing.eligibilityRules || '',
    registrationOpens: existing.registrationOpens || '',
    registrationDeadline: existing.deadline || '', eventDate: existing.eventDate || '',
    eventType: existing.eventType || 'Online', locationInfo: existing.location || '',
    prizes: existing.prizes || '', rules: existing.rules || '',
    timelineText: Array.isArray(existing.timeline)
      ? existing.timeline.map((t) => `${t.date} - ${t.stage}`).join('\n')
      : (existing.timelineText || ''),
    registrationUrl: existing.registrationUrl || '',
    contactEmail: existing.contactEmail || organizerEmail || '',
    additionalContact: existing.additionalContact || ''
  };
}

/** Empty form for create mode (or fallback when the edit id is unknown). */
export function getCompetitionForm(competitions, id, organizerEmail) {
  const prefill = getEditPrefill(competitions, id, organizerEmail);
  if (prefill) return prefill;
  return {
    title: '', category: 'Technology', shortDescription: '', fullDescription: '',
    banner: PRESET_BANNERS[0], thumbnail: PRESET_BANNERS[0],
    educationLevels: ['University', 'College'], participationType: 'Team',
    minTeamSize: '2', maxTeamSize: '5', eligibilityRules: '',
    registrationOpens: '', registrationDeadline: '', eventDate: '',
    eventType: 'Online', locationInfo: '',
    prizes: '1st Place: ৳1,00,000 + Incubation Support\n2nd Place: ৳50,000\n3rd Place: ৳25,000',
    rules: '1. All code and designs must be created during the competition window.\n2. Open source tooling and libraries are permitted.\n3. Respect intellectual property and event guidelines.',
    timelineText: 'August 1 - Registration Opens\nSeptember 15 - Deadline\nOctober 1 - Results',
    registrationUrl: '', contactEmail: organizerEmail || 'hello@yourorg.com', additionalContact: ''
  };
}

/** Validate one wizard step; returns an errors object (empty = valid). */
export function validateCompetitionStep(formData, step) {
  const newErrors = {};
  if (step === 1) {
    if (!formData.title.trim()) newErrors.title = 'Competition title is required';
    if (!formData.shortDescription.trim()) newErrors.shortDescription = 'Short description is required';
  } else if (step === 3) {
    if (!formData.registrationDeadline.trim()) newErrors.registrationDeadline = 'Registration deadline is required';
    if (!formData.eventDate.trim()) newErrors.eventDate = 'Event date is required';
  } else if (step === 4) {
    if (!formData.contactEmail.trim()) newErrors.contactEmail = 'Contact email is required';
  }
  return newErrors;
}

/** State-mutating competition actions (used by organizer views). */
export function useCompetitionController() {
  const { competitions, setCompetitions, showToast } = useOrganizer();

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

  return { createCompetition, updateCompetition, deleteCompetition, toggleCompetitionStatus, duplicateCompetition };
}