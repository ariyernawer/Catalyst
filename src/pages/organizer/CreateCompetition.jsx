import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useSearchParams, Link } from 'react-router-dom';
import { useOrganizer } from '../../context/OrganizerContext';
import { ArrowLeft, ArrowRight, Check, Calendar, Sparkles, Bookmark, ExternalLink, Info } from 'lucide-react';

const CATEGORIES = ['Technology','Programming','Business','Case Competition','Innovation','Entrepreneurship','Design','Science','Olympiad','Other'];
const EDUCATION_LEVELS = ['School','College','University','Graduate','Open to All'];
const PRESET_BANNERS = [
  'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80'
];

export const CreateCompetition = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const { competitions, createCompetition, updateCompetition, organizer } = useOrganizer();

  const isEditing = Boolean(id);
  const startInPreview = searchParams.get('preview') === 'true';
  const [currentStep, setCurrentStep] = useState(startInPreview ? 5 : 1);

  const [formData, setFormData] = useState({
    title: '', category: 'Technology', shortDescription: '', fullDescription: '',
    banner: PRESET_BANNERS[0], thumbnail: PRESET_BANNERS[0],
    educationLevels: ['University', 'College'], participationType: 'Team',
    minTeamSize: '2', maxTeamSize: '5', eligibilityRules: '',
    registrationOpens: '', registrationDeadline: '', eventDate: '',
    eventType: 'Online', locationInfo: '',
    prizes: '1st Place: ৳1,00,000 + Incubation Support\n2nd Place: ৳50,000\n3rd Place: ৳25,000',
    rules: '1. All code and designs must be created during the competition window.\n2. Open source tooling and libraries are permitted.\n3. Respect intellectual property and event guidelines.',
    timelineText: 'August 1 - Registration Opens\nSeptember 15 - Deadline\nOctober 1 - Results',
    registrationUrl: '', contactEmail: organizer.email || 'hello@yourorg.com', additionalContact: ''
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (id) {
      const existing = competitions.find((c) => c.id === id);
      if (existing) {
        setFormData({
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
          contactEmail: existing.contactEmail || organizer.email || '',
          additionalContact: existing.additionalContact || ''
        });
      }
    }
  }, [id, competitions, organizer.email]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const toggleEducationLevel = (level) => {
    setFormData((prev) => {
      const exists = prev.educationLevels.includes(level);
      const updated = exists ? prev.educationLevels.filter((l) => l !== level) : [...prev.educationLevels, level];
      return { ...prev, educationLevels: updated.length ? updated : ['Open to All'] };
    });
  };

  const handleParticipationTypeChange = (type) => {
    setFormData((prev) => ({
      ...prev, participationType: type,
      minTeamSize: type === 'Individual' ? '1' : prev.minTeamSize,
      maxTeamSize: type === 'Individual' ? '1' : prev.maxTeamSize
    }));
  };

  const parseTimeline = () => {
    const lines = (formData.timelineText || '').split('\n').filter((l) => l.trim().length > 0);
    if (lines.length === 0) {
      return [
        { stage: 'Registration Opens', date: formData.registrationOpens || 'TBA', desc: 'Call for registrations' },
        { stage: 'Submission Deadline', date: formData.registrationDeadline || 'TBA', desc: 'Submissions close' },
        { stage: 'Final Event', date: formData.eventDate || 'TBA', desc: 'Main competition day' }
      ];
    }
    return lines.map((line) => {
      const parts = line.split(/[-–—:]/);
      if (parts.length > 1) return { date: parts[0].trim(), stage: parts.slice(1).join('-').trim(), desc: 'Key Milestone' };
      return { date: 'Phase', stage: line.trim(), desc: 'Milestone' };
    });
  };

  const validateStep = (step) => {
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
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (validateStep(currentStep)) { setCurrentStep((prev) => Math.min(5, prev + 1)); window.scrollTo({ top: 0, behavior: 'smooth' }); }
  };
  const handlePrevStep = () => { setCurrentStep((prev) => Math.max(1, prev - 1)); window.scrollTo({ top: 0, behavior: 'smooth' }); };

  const buildPayload = (status) => ({
    title: formData.title || (status === 'Draft' ? 'Untitled Competition (Draft)' : ''),
    category: formData.category, shortDescription: formData.shortDescription || 'Draft opportunity.',
    fullDescription: formData.fullDescription, banner: formData.banner,
    thumbnail: formData.thumbnail || formData.banner,
    educationLevels: formData.educationLevels, participationType: formData.participationType,
    minTeamSize: parseInt(formData.minTeamSize, 10) || 1, maxTeamSize: parseInt(formData.maxTeamSize, 10) || 1,
    eligibilityRules: formData.eligibilityRules, registrationOpens: formData.registrationOpens,
    deadline: formData.registrationDeadline || (status === 'Draft' ? 'Draft' : 'Open'),
    eventDate: formData.eventDate || (status === 'Draft' ? 'Draft' : 'TBA'),
    eventType: formData.eventType, location: formData.locationInfo || formData.eventType,
    prizes: formData.prizes, rules: formData.rules, timeline: parseTimeline(),
    registrationUrl: formData.registrationUrl, contactEmail: formData.contactEmail,
    additionalContact: formData.additionalContact
  });

  const handleSaveDraft = () => {
    const payload = buildPayload('Draft');
    if (isEditing) updateCompetition(id, { ...payload, status: 'Draft' });
    else createCompetition(payload, 'Draft');
    navigate('/organizer/competitions');
  };

  const handlePublish = () => {
    if (!formData.title.trim()) { setCurrentStep(1); setErrors({ title: 'Competition title is required to publish' }); return; }
    const payload = buildPayload('Published');
    if (isEditing) updateCompetition(id, { ...payload, status: 'Published' });
    else createCompetition(payload, 'Published');
    navigate('/organizer/competitions');
  };

  const stepsList = [
    { num: '01', title: 'Basic Information' },
    { num: '02', title: 'Eligibility' },
    { num: '03', title: 'Event Details' },
    { num: '04', title: 'Additional Information' },
    { num: '05', title: 'Participant Preview' }
  ];

  return (
    <div className="create-competition-page-wrapper space-y-8 animate-fade-in pb-16">
      {/* Page Top Header Row */}
      <div className="page-top-header-row flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="page-breadcrumb-title-block flex items-center gap-3">
          <Link
            to="/organizer/competitions"
            className="page-back-breadcrumb-link inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-surface border border-border text-xs font-medium text-text-primary hover:bg-surface-raised shadow-xs transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Competitions</span>
          </Link>
          <div>
            <p className="page-section-label-tag text-[11px] font-semibold uppercase tracking-widest text-sand">
              {isEditing ? 'EDIT COMPETITION' : 'NEW COMPETITION'}
            </p>
            <h1 className="page-main-display-title font-display text-2xl sm:text-3xl text-text-primary font-normal tracking-tight">
              {isEditing ? `Edit: ${formData.title || 'Competition'}` : 'Create New Competition'}
            </h1>
          </div>
        </div>

        <div className="page-header-action-buttons flex items-center gap-2.5 self-start sm:self-auto">
          <button type="button" onClick={handleSaveDraft}
            className="page-save-draft-btn px-4 py-2 bg-surface border border-border text-text-primary text-xs font-medium rounded-xl hover:bg-surface-raised shadow-xs transition-colors cursor-pointer">
            Save Draft
          </button>
          {currentStep !== 5 ? (
            <button type="button" onClick={() => setCurrentStep(5)}
              className="page-preview-toggle-btn inline-flex items-center gap-1.5 bg-accent hover:bg-accent-hover text-text-primary px-4 py-2 rounded-xl text-xs font-medium shadow-md transition-all cursor-pointer">
              <span>Preview</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button type="button" onClick={handlePublish}
              className="page-publish-action-btn inline-flex items-center gap-1.5 bg-accent hover:bg-accent-hover text-text-primary px-4 py-2 rounded-xl text-xs font-medium shadow-md transition-all cursor-pointer">
              <Check className="w-4 h-4" />
              <span>Publish Competition</span>
            </button>
          )}
        </div>
      </div>

      {/* Two Column Step Layout */}
      <div className="wizard-two-column-layout grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Step Navigator Sidebar */}
        <div className="wizard-step-nav-sidebar lg:col-span-3 bg-surface border border-border rounded-card p-5 shadow-card sticky top-24">
          <div className="wizard-step-nav-list space-y-2">
            {stepsList.map((step, idx) => {
              const stepNumber = idx + 1;
              const isActive = currentStep === stepNumber;
              const isPast = currentStep > stepNumber;
              return (
                <button
                  key={step.num}
                  type="button"
                  onClick={() => setCurrentStep(stepNumber)}
                  className={`wizard-step-nav-item w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs font-medium transition-all text-left cursor-pointer ${
                    isActive ? 'bg-surface-raised text-sand shadow-xs font-semibold border border-border'
                    : isPast ? 'text-text-primary hover:bg-surface-raised'
                    : 'text-text-muted hover:bg-surface-raised hover:text-text-primary'
                  }`}
                >
                  <span className={`wizard-step-number-label font-mono text-xs ${isActive ? 'text-sand' : isPast ? 'text-sand' : 'text-text-muted'}`}>
                    {isPast ? '✓' : step.num}
                  </span>
                  <span className="wizard-step-title-text truncate">{step.title}</span>
                </button>
              );
            })}
          </div>
          <div className="wizard-sidebar-tip-box mt-6 pt-4 border-t border-border text-[11px] text-text-secondary space-y-1">
            <p className="text-sand font-semibold">Catalyst Tip:</p>
            <p className="text-text-muted">Publishing makes your opportunity instantly visible to 180,000+ students.</p>
          </div>
        </div>

        {/* Right Form / Preview Area */}
        <div className="wizard-form-content-area lg:col-span-9">

          {/* STEP 1: Basic Information */}
          {currentStep === 1 && (
            <div className="wizard-step-form-card bg-surface border border-border rounded-card p-6 sm:p-8 shadow-card space-y-6">
              <div>
                <span className="wizard-step-number-tag font-mono text-xs text-sand font-medium">01</span>
                <h2 className="wizard-step-section-title font-display text-2xl text-text-primary font-medium ml-2 inline-block">Basic Information</h2>
              </div>

              <div className="form-field-input-group">
                <label className="form-field-label-text block text-[11px] font-semibold tracking-wider uppercase text-text-secondary mb-2">
                  COMPETITION TITLE <span className="text-sand">*</span>
                </label>
                <input type="text" name="title" value={formData.title} onChange={handleChange}
                  placeholder="e.g. InnoSpark Hackathon 2025"
                  className="form-input w-full px-4 py-3 text-sm placeholder-text-muted shadow-xs" />
                {errors.title && <p className="field-validation-error-text text-xs text-danger mt-1">{errors.title}</p>}
              </div>

              <div className="form-field-input-group">
                <label className="form-field-label-text block text-[11px] font-semibold tracking-wider uppercase text-text-secondary mb-2">
                  CATEGORY <span className="text-sand">*</span>
                </label>
                <div className="category-selector-button-grid grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
                  {CATEGORIES.map((cat) => (
                    <button type="button" key={cat}
                      onClick={() => setFormData((prev) => ({ ...prev, category: cat }))}
                      className={`category-pill-select-btn px-3 py-2 rounded-xl text-xs font-medium border text-center transition-all cursor-pointer ${
                        formData.category === cat
                          ? 'bg-accent text-text-primary border-accent shadow-xs font-semibold'
                          : 'bg-bg text-text-secondary border-border hover:border-sand hover:text-text-primary'
                      }`}>
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div className="form-field-input-group">
                <label className="form-field-label-text block text-[11px] font-semibold tracking-wider uppercase text-text-secondary mb-2">
                  SHORT DESCRIPTION <span className="text-sand">*</span>
                </label>
                <textarea name="shortDescription" rows={2} value={formData.shortDescription} onChange={handleChange}
                  placeholder="One or two lines that capture the spirit of your competition."
                  className="form-textarea w-full px-4 py-3 bg-bg border border-border rounded-xl text-sm text-text-primary placeholder-text-muted focus:outline-none focus:border-sand shadow-xs resize-none" />
                {errors.shortDescription && <p className="field-validation-error-text text-xs text-danger mt-1">{errors.shortDescription}</p>}
              </div>

              <div className="form-field-input-group">
                <label className="form-field-label-text block text-[11px] font-semibold tracking-wider uppercase text-text-secondary mb-2">FULL DESCRIPTION</label>
                <textarea name="fullDescription" rows={6} value={formData.fullDescription} onChange={handleChange}
                  placeholder="Describe the competition — its purpose, themes, format, who it's for, and what makes it special."
                  className="form-textarea w-full px-4 py-3 bg-bg border border-border rounded-xl text-sm text-text-primary placeholder-text-muted focus:outline-none focus:border-sand shadow-xs" />
              </div>

              <div className="form-field-input-group">
                <label className="form-field-label-text block text-[11px] font-semibold tracking-wider uppercase text-text-secondary mb-2">
                  COMPETITION BANNER & COVER
                </label>
                <div className="banner-preset-thumbnail-grid grid grid-cols-3 sm:grid-cols-6 gap-2 mb-3">
                  {PRESET_BANNERS.map((bannerUrl, idx) => (
                    <button key={idx} type="button"
                      onClick={() => setFormData((prev) => ({ ...prev, banner: bannerUrl, thumbnail: bannerUrl }))}
                      className={`banner-preset-option-btn relative rounded-xl overflow-hidden aspect-video border-2 transition-all cursor-pointer ${
                        formData.banner === bannerUrl ? 'border-sand scale-102 shadow-lg' : 'border-transparent opacity-60 hover:opacity-100'
                      }`}>
                      <img src={bannerUrl} alt="Preset banner" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
                <input type="text" name="banner" value={formData.banner} onChange={handleChange}
                  placeholder="Or paste custom image URL (https://...)"
                  className="form-input w-full px-3.5 py-2 text-xs placeholder-text-muted" />
              </div>
            </div>
          )}

          {/* STEP 2: Eligibility */}
          {currentStep === 2 && (
            <div className="wizard-step-form-card bg-surface border border-border rounded-card p-6 sm:p-8 shadow-card space-y-6">
              <div>
                <span className="wizard-step-number-tag font-mono text-xs text-sand font-medium">02</span>
                <h2 className="wizard-step-section-title font-display text-2xl text-text-primary font-medium ml-2 inline-block">Eligibility</h2>
              </div>

              <div className="form-field-input-group">
                <label className="form-field-label-text block text-[11px] font-semibold tracking-wider uppercase text-text-secondary mb-1">EDUCATION LEVEL</label>
                <div className="education-level-toggle-row flex flex-wrap gap-2 mb-1.5">
                  {EDUCATION_LEVELS.map((level) => {
                    const selected = formData.educationLevels.includes(level);
                    return (
                      <button type="button" key={level} onClick={() => toggleEducationLevel(level)}
                        className={`education-level-pill-btn px-4 py-2 rounded-full text-xs font-medium border transition-all cursor-pointer ${
                          selected ? 'bg-accent text-text-primary border-accent shadow-xs font-semibold'
                          : 'bg-bg text-text-secondary border-border hover:border-sand hover:text-text-primary'
                        }`}>
                        {level}
                      </button>
                    );
                  })}
                </div>
                <p className="text-[11px] text-text-muted">Select all that apply.</p>
              </div>

              <div className="form-field-input-group">
                <label className="form-field-label-text block text-[11px] font-semibold tracking-wider uppercase text-text-secondary mb-2">PARTICIPATION TYPE</label>
                <div className="participation-type-toggle-row inline-flex bg-bg border border-border p-1 rounded-xl">
                  {['Individual', 'Team', 'Both'].map((type) => (
                    <button type="button" key={type} onClick={() => handleParticipationTypeChange(type)}
                      className={`participation-type-option-btn px-5 py-2 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                        formData.participationType === type ? 'bg-surface-raised text-sand shadow-xs font-semibold border border-border'
                        : 'text-text-secondary hover:text-text-primary'
                      }`}>
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {formData.participationType !== 'Individual' && (
                <div className="team-size-inputs-row grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="form-field-input-group">
                    <label className="form-field-label-text block text-[11px] font-semibold tracking-wider uppercase text-text-secondary mb-2">MIN TEAM SIZE</label>
                    <input type="number" min="1" max="20" name="minTeamSize" value={formData.minTeamSize} onChange={handleChange}
                      placeholder="2" className="form-input w-full px-4 py-3 text-sm" />
                  </div>
                  <div className="form-field-input-group">
                    <label className="form-field-label-text block text-[11px] font-semibold tracking-wider uppercase text-text-secondary mb-2">MAX TEAM SIZE</label>
                    <input type="number" min="1" max="30" name="maxTeamSize" value={formData.maxTeamSize} onChange={handleChange}
                      placeholder="5" className="form-input w-full px-4 py-3 text-sm" />
                  </div>
                </div>
              )}

              <div className="form-field-input-group">
                <label className="form-field-label-text block text-[11px] font-semibold tracking-wider uppercase text-text-secondary mb-2">ELIGIBILITY RULES</label>
                <textarea name="eligibilityRules" rows={4} value={formData.eligibilityRules} onChange={handleChange}
                  placeholder="Specify any age requirements, enrollment criteria, geographic restrictions, or other conditions."
                  className="form-textarea w-full px-4 py-3 bg-bg border border-border rounded-xl text-sm text-text-primary placeholder-text-muted focus:outline-none focus:border-sand shadow-xs" />
              </div>
            </div>
          )}

          {/* STEP 3: Event Details */}
          {currentStep === 3 && (
            <div className="wizard-step-form-card bg-surface border border-border rounded-card p-6 sm:p-8 shadow-card space-y-6">
              <div>
                <span className="wizard-step-number-tag font-mono text-xs text-sand font-medium">03</span>
                <h2 className="wizard-step-section-title font-display text-2xl text-text-primary font-medium ml-2 inline-block">Event Details</h2>
              </div>

              <div className="registration-dates-input-row grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="form-field-input-group">
                  <label className="form-field-label-text block text-[11px] font-semibold tracking-wider uppercase text-text-secondary mb-2">REGISTRATION OPENS</label>
                  <div className="field-icon-input-wrapper relative">
                    <input type="text" name="registrationOpens" value={formData.registrationOpens} onChange={handleChange}
                      placeholder="mm/dd/yyyy or 1 Aug 2025" className="form-input w-full px-4 py-3 text-sm" />
                    <Calendar className="w-4 h-4 text-text-muted absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>
                <div className="form-field-input-group">
                  <label className="form-field-label-text block text-[11px] font-semibold tracking-wider uppercase text-text-secondary mb-2">
                    REGISTRATION DEADLINE <span className="text-sand">*</span>
                  </label>
                  <div className="field-icon-input-wrapper relative">
                    <input type="text" name="registrationDeadline" value={formData.registrationDeadline} onChange={handleChange}
                      placeholder="mm/dd/yyyy or 20 Aug 2025" className="form-input w-full px-4 py-3 text-sm" />
                    <Calendar className="w-4 h-4 text-text-muted absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                  {errors.registrationDeadline && <p className="field-validation-error-text text-xs text-danger mt-1">{errors.registrationDeadline}</p>}
                </div>
              </div>

              <div className="form-field-input-group max-w-md">
                <label className="form-field-label-text block text-[11px] font-semibold tracking-wider uppercase text-text-secondary mb-2">
                  EVENT DATE <span className="text-sand">*</span>
                </label>
                <div className="field-icon-input-wrapper relative">
                  <input type="text" name="eventDate" value={formData.eventDate} onChange={handleChange}
                    placeholder="mm/dd/yyyy or 6 Sept 2025" className="form-input w-full px-4 py-3 text-sm" />
                  <Calendar className="w-4 h-4 text-text-muted absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
                {errors.eventDate && <p className="field-validation-error-text text-xs text-danger mt-1">{errors.eventDate}</p>}
              </div>

              <div className="form-field-input-group">
                <label className="form-field-label-text block text-[11px] font-semibold tracking-wider uppercase text-text-secondary mb-2">EVENT TYPE</label>
                <div className="event-type-toggle-row inline-flex bg-bg border border-border p-1 rounded-xl">
                  {['Online', 'Offline', 'Hybrid'].map((type) => (
                    <button type="button" key={type} onClick={() => setFormData((prev) => ({ ...prev, eventType: type }))}
                      className={`event-type-option-btn px-5 py-2 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                        formData.eventType === type ? 'bg-surface-raised text-sand shadow-xs font-semibold border border-border'
                        : 'text-text-secondary hover:text-text-primary'
                      }`}>
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div className="form-field-input-group">
                <label className="form-field-label-text block text-[11px] font-semibold tracking-wider uppercase text-text-secondary mb-2">
                  {formData.eventType === 'Online' ? 'ONLINE EVENT INFO' : formData.eventType === 'Offline' ? 'OFFLINE VENUE & LOCATION' : 'HYBRID VENUE & PLATFORM'}
                </label>
                <input type="text" name="locationInfo" value={formData.locationInfo} onChange={handleChange}
                  placeholder={formData.eventType === 'Online' ? 'Platform, streaming link, or instructions' : 'Venue name, building, street address, city, country'}
                  className="form-input w-full px-4 py-3 text-sm placeholder-text-muted" />
              </div>
            </div>
          )}

          {/* STEP 4: Additional Information */}
          {currentStep === 4 && (
            <div className="wizard-step-form-card bg-surface border border-border rounded-card p-6 sm:p-8 shadow-card space-y-6">
              <div>
                <span className="wizard-step-number-tag font-mono text-xs text-sand font-medium">04</span>
                <h2 className="wizard-step-section-title font-display text-2xl text-text-primary font-medium ml-2 inline-block">Additional Information</h2>
              </div>

              <div className="form-field-input-group">
                <label className="form-field-label-text block text-[11px] font-semibold tracking-wider uppercase text-text-secondary mb-2">PRIZES & AWARDS</label>
                <textarea name="prizes" rows={4} value={formData.prizes} onChange={handleChange}
                  placeholder={`1st Place: ₹1,00,000 + Incubation Support\n2nd Place: ₹50,000\n3rd Place: ₹25,000`}
                  className="form-textarea w-full px-4 py-3 bg-bg border border-border rounded-xl text-sm font-mono text-text-primary placeholder-text-muted focus:outline-none focus:border-sand shadow-xs" />
              </div>

              <div className="form-field-input-group">
                <label className="form-field-label-text block text-[11px] font-semibold tracking-wider uppercase text-text-secondary mb-2">RULES & GUIDELINES</label>
                <textarea name="rules" rows={4} value={formData.rules} onChange={handleChange}
                  placeholder="List the key rules participants must follow."
                  className="form-textarea w-full px-4 py-3 bg-bg border border-border rounded-xl text-sm text-text-primary placeholder-text-muted focus:outline-none focus:border-sand shadow-xs" />
              </div>

              <div className="form-field-input-group">
                <label className="form-field-label-text block text-[11px] font-semibold tracking-wider uppercase text-text-secondary mb-2">TIMELINE</label>
                <textarea name="timelineText" rows={4} value={formData.timelineText} onChange={handleChange}
                  placeholder={`August 1 - Registration Opens\nSeptember 15 - Deadline\nOctober 1 - Results`}
                  className="form-textarea w-full px-4 py-3 bg-bg border border-border rounded-xl text-sm font-mono text-text-primary placeholder-text-muted focus:outline-none focus:border-sand shadow-xs" />
                <p className="text-[11px] text-text-muted mt-1">Format: Date - Milestone Title (one per line)</p>
              </div>

              <div className="contact-info-input-row grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="form-field-input-group">
                  <label className="form-field-label-text block text-[11px] font-semibold tracking-wider uppercase text-text-secondary mb-2">REGISTRATION URL</label>
                  <input type="text" name="registrationUrl" value={formData.registrationUrl} onChange={handleChange}
                    placeholder="https://yoursite.com/register" className="form-input w-full px-4 py-3 text-sm placeholder-text-muted" />
                </div>
                <div className="form-field-input-group">
                  <label className="form-field-label-text block text-[11px] font-semibold tracking-wider uppercase text-text-secondary mb-2">
                    CONTACT EMAIL <span className="text-sand">*</span>
                  </label>
                  <input type="email" name="contactEmail" value={formData.contactEmail} onChange={handleChange}
                    placeholder="hello@yourorg.com" className="form-input w-full px-4 py-3 text-sm placeholder-text-muted" />
                  {errors.contactEmail && <p className="field-validation-error-text text-xs text-danger mt-1">{errors.contactEmail}</p>}
                </div>
              </div>

              <div className="form-field-input-group">
                <label className="form-field-label-text block text-[11px] font-semibold tracking-wider uppercase text-text-secondary mb-2">ADDITIONAL CONTACT INFORMATION</label>
                <textarea name="additionalContact" rows={2} value={formData.additionalContact} onChange={handleChange}
                  placeholder="Phone number, social handles, Discord server, etc."
                  className="form-textarea w-full px-4 py-3 bg-bg border border-border rounded-xl text-sm text-text-primary placeholder-text-muted focus:outline-none focus:border-sand shadow-xs resize-none" />
              </div>
            </div>
          )}

          {/* STEP 5: Live Participant Preview */}
          {currentStep === 5 && (
            <div className="participant-preview-wrapper space-y-6">
              {/* Preview Notice Bar */}
              <div className="preview-notice-info-bar bg-surface text-text-primary p-4 rounded-card flex items-center justify-between shadow-card border border-border">
                <div className="preview-notice-left-content flex items-center gap-3">
                  <div className="preview-notice-icon-box w-8 h-8 rounded-lg bg-surface-raised flex items-center justify-center text-sand">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-text-primary">Participant Live Preview</p>
                    <p className="text-[11px] text-text-secondary">This is exactly what students will see when viewing your competition.</p>
                  </div>
                </div>
                <button type="button" onClick={handlePublish}
                  className="preview-publish-action-btn inline-flex items-center gap-1.5 bg-accent hover:bg-accent-hover text-text-primary text-xs font-medium px-4 py-2 rounded-xl transition-all shrink-0 cursor-pointer shadow-md">
                  Publish Now
                </button>
              </div>

              {/* Participant Competition Details Card */}
              <div className="preview-competition-detail-card bg-surface border border-border rounded-card overflow-hidden shadow-card">
                {/* Banner Hero Area */}
                <div className="preview-banner-hero-area relative h-64 sm:h-80 w-full bg-bg">
                  <img src={formData.banner || PRESET_BANNERS[0]} alt={formData.title || 'Competition Banner'}
                    className="w-full h-full object-cover opacity-80" />
                  <div className="preview-hero-overlay-gradient absolute inset-0 bg-gradient-to-t from-surface via-black/50 to-transparent" />

                  <div className="preview-hero-badges-row absolute top-6 left-6 flex flex-wrap gap-2">
                    <span className="competition-category-badge-tag px-3 py-1 rounded-full bg-bg/85 backdrop-blur-md text-sand text-xs font-semibold border border-border">{formData.category}</span>
                    <span className="competition-type-badge-tag px-3 py-1 rounded-full bg-surface-raised backdrop-blur-md text-text-primary text-xs font-medium border border-border">{formData.eventType}</span>
                  </div>

                  <div className="preview-hero-title-block absolute bottom-6 left-6 right-6 space-y-2">
                    <h1 className="preview-competition-display-title font-display text-2xl sm:text-4xl font-normal leading-tight text-text-primary">
                      {formData.title || 'Untitled Competition'}
                    </h1>
                    <p className="preview-competition-short-desc text-xs sm:text-sm text-text-secondary line-clamp-2 max-w-3xl">
                      {formData.shortDescription || 'Short overview of the competition.'}
                    </p>
                  </div>
                </div>

                {/* Content Body */}
                <div className="preview-body-content-area p-6 sm:p-8 space-y-8">
                  {/* Stats Bar */}
                  <div className="preview-key-stats-bar grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-bg border border-border">
                    {[
                      { label: 'Organized By', value: organizer.organizationName },
                      { label: 'Registration Deadline', value: formData.registrationDeadline || 'TBA' },
                      { label: 'Event Date', value: formData.eventDate || 'TBA' },
                      { label: 'Eligibility', value: formData.educationLevels?.join(', ') || 'All' }
                    ].map(({ label, value }) => (
                      <div key={label}>
                        <p className="text-[10px] uppercase tracking-wider text-sand font-semibold">{label}</p>
                        <p className="text-xs sm:text-sm font-semibold text-text-primary mt-0.5">{value}</p>
                      </div>
                    ))}
                  </div>

                  {/* Two Column Content */}
                  <div className="preview-main-content-grid grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="preview-left-detail-column lg:col-span-2 space-y-8">
                      <div>
                        <h3 className="font-display text-xl font-medium text-text-primary mb-3">About the Competition</h3>
                        <div className="text-xs sm:text-sm text-text-secondary leading-relaxed whitespace-pre-line">
                          {formData.fullDescription || formData.shortDescription || 'No description provided.'}
                        </div>
                      </div>

                      {formData.prizes && (
                        <div>
                          <h3 className="font-display text-xl font-medium text-text-primary mb-3">Prizes & Awards</h3>
                          <div className="p-4 rounded-xl bg-bg border border-border text-xs sm:text-sm text-sand font-mono whitespace-pre-line">{formData.prizes}</div>
                        </div>
                      )}

                      <div>
                        <h3 className="font-display text-xl font-medium text-text-primary mb-4">Event Timeline</h3>
                        <div className="preview-timeline-steps-list space-y-4 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-border">
                          {parseTimeline().map((item, idx) => (
                            <div key={idx} className="preview-timeline-step-item flex items-start gap-4 relative">
                              <div className="timeline-step-dot-badge w-6 h-6 rounded-full bg-accent text-text-primary flex items-center justify-center text-[10px] font-mono shrink-0 z-10 shadow-md">{idx + 1}</div>
                              <div className="bg-bg border border-border rounded-xl p-3.5 flex-1">
                                <p className="text-xs font-semibold text-text-primary">{item.stage}</p>
                                <p className="text-[11px] text-sand font-medium mt-0.5">{item.date}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {formData.rules && (
                        <div>
                          <h3 className="font-display text-xl font-medium text-text-primary mb-3">Rules & Guidelines</h3>
                          <div className="text-xs sm:text-sm text-text-secondary leading-relaxed whitespace-pre-line bg-bg p-4 rounded-xl border border-border">{formData.rules}</div>
                        </div>
                      )}
                    </div>

                    {/* Right Sidebar Card */}
                    <div className="preview-sidebar-register-card space-y-4">
                      <div className="preview-registration-sidebar-box bg-bg border border-border rounded-2xl p-5 shadow-card space-y-4 sticky top-28">
                        <h4 className="font-display text-lg font-medium text-text-primary">Join This Opportunity</h4>
                        <div className="space-y-2 text-xs text-text-secondary">
                          <div className="flex items-center justify-between py-1 border-b border-border">
                            <span>Format</span>
                            <span className="font-semibold text-text-primary">{formData.participationType}</span>
                          </div>
                          {formData.participationType !== 'Individual' && (
                            <div className="flex items-center justify-between py-1 border-b border-border">
                              <span>Team Size</span>
                              <span className="font-semibold text-text-primary">{formData.minTeamSize} - {formData.maxTeamSize} Members</span>
                            </div>
                          )}
                          <div className="flex items-center justify-between py-1 border-b border-border">
                            <span>Location</span>
                            <span className="font-semibold text-text-primary truncate max-w-[140px]">{formData.locationInfo || formData.eventType}</span>
                          </div>
                          <div className="flex items-center justify-between py-1">
                            <span>Contact</span>
                            <span className="font-semibold text-text-primary truncate max-w-[140px]">{formData.contactEmail}</span>
                          </div>
                        </div>
                        <a href={formData.registrationUrl || '#'} target="_blank" rel="noreferrer"
                          className="preview-register-action-btn w-full inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent-hover text-text-primary py-3 rounded-xl text-xs font-medium transition-all shadow-md">
                          <span>Register for Competition</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                        <button type="button"
                          className="preview-bookmark-action-btn w-full bg-surface border border-border hover:bg-surface-raised text-text-primary py-2.5 rounded-xl text-xs font-medium transition-all flex items-center justify-center gap-2">
                          <Bookmark className="w-3.5 h-3.5 text-sand" />
                          <span>Bookmark (342)</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step Footer Navigation */}
          <div className="wizard-step-footer-nav mt-8 pt-6 border-t border-border flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            <div className="footer-nav-prev-side">
              {currentStep > 1 && (
                <button type="button" onClick={handlePrevStep}
                  className="footer-prev-step-btn px-4 py-2 bg-surface border border-border text-text-primary rounded-xl text-xs font-medium hover:bg-surface-raised shadow-xs transition-colors cursor-pointer">
                  &larr; Previous Step
                </button>
              )}
            </div>
            <div className="footer-nav-next-side flex flex-wrap items-center gap-3">
              <span className="text-[11px] text-text-muted flex items-center gap-1">
                <Info className="w-3.5 h-3.5" />
                <span>Preview before publishing.</span>
              </span>
              <button type="button" onClick={handleSaveDraft}
                className="footer-save-draft-btn px-4 py-2.5 bg-surface border border-border text-text-primary rounded-xl text-xs font-medium hover:bg-surface-raised shadow-xs transition-colors cursor-pointer">
                Save Draft
              </button>
              {currentStep < 5 ? (
                <button type="button" onClick={handleNextStep}
                  className="footer-next-step-btn inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-text-primary px-5 py-2.5 rounded-xl text-xs font-medium shadow-md cursor-pointer active:scale-[0.98] transition-all">
                  <span>{currentStep === 4 ? 'Preview Competition' : 'Next Step'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button type="button" onClick={handlePublish}
                  className="footer-publish-final-btn inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-text-primary px-6 py-2.5 rounded-xl text-xs font-medium shadow-md cursor-pointer active:scale-[0.98] transition-all">
                  <Check className="w-4 h-4" />
                  <span>Publish Competition</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCompetition;
