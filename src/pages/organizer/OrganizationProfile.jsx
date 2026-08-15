import React, { useState } from 'react';
import { useOrganizer } from '../../context/OrganizerContext';
import { Building2, Globe, Mail, Phone, MapPin, ShieldCheck, Save } from 'lucide-react';

export const OrganizationProfile = () => {
  const { organizer, updateProfile, publishedCount } = useOrganizer();

  const [formData, setFormData] = useState({
    organizationName: organizer.organizationName || '',
    organizationType: organizer.organizationType || '',
    contactPerson: organizer.contactPerson || '',
    role: organizer.role || '',
    description: organizer.description || '',
    website: organizer.website || '',
    facebook: organizer.facebook || '',
    linkedin: organizer.linkedin || '',
    instagram: organizer.instagram || '',
    twitter: organizer.twitter || '',
    email: organizer.email || '',
    phone: organizer.phone || '',
    location: organizer.location || '',
    avatar: organizer.avatar || 'P'
  });

  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => { updateProfile(formData); setIsSaving(false); }, 400);
  };

  return (
    <div className="org-profile-page-wrapper space-y-8 animate-fade-in pb-12 max-w-5xl">
      {/* Page Header Row */}
      <div className="page-top-header-row flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="page-title-description-block">
          <p className="page-section-label-tag text-xs font-semibold uppercase tracking-widest text-sand">ORGANIZATION SETTINGS</p>
          <h1 className="page-main-display-title font-display text-3xl sm:text-4xl text-text-primary font-normal tracking-tight mt-1">Organization Profile</h1>
          <p className="page-count-summary-text text-xs sm:text-sm text-text-secondary mt-1">Manage your organization identity, public credentials, and contact channels.</p>
        </div>
        <button type="button" onClick={handleSubmit} disabled={isSaving} className="page-save-action-btn inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent-hover text-text-primary px-5 py-3 rounded-xl text-xs sm:text-sm font-medium transition-all shadow-md active:scale-[0.98] cursor-pointer disabled:opacity-75">
          <Save className="w-4 h-4" />
          <span>{isSaving ? 'Saving...' : 'Save Changes'}</span>
        </button>
      </div>

      {/* Org Verification Trust Banner */}
      <div className="org-trust-verification-banner bg-surface border border-border rounded-card text-text-primary p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-card">
        <div className="org-banner-left-identity flex items-start gap-4">
          <div className="org-avatar-display-circle w-12 h-12 rounded-2xl bg-sand text-bg flex items-center justify-center font-display text-xl font-bold shrink-0 shadow-md">{formData.avatar || 'P'}</div>
          <div className="org-identity-info-block">
            <div className="org-name-verified-row flex items-center gap-2">
              <h2 className="org-display-name-heading text-lg font-semibold text-text-primary">{formData.organizationName}</h2>
              <span className="org-verified-badge-pill inline-flex items-center gap-1 bg-sand/20 text-sand text-[10px] font-semibold px-2.5 py-0.5 rounded-full border border-sand/30">
                <ShieldCheck className="w-3 h-3" />Verified Organizer
              </span>
            </div>
            <p className="org-type-member-text text-xs text-text-secondary mt-1">{formData.organizationType} · Member since {organizer.memberSince || '2024'}</p>
          </div>
        </div>
        <div className="org-banner-stats-block flex items-center gap-6 border-t md:border-t-0 md:border-l border-border pt-4 md:pt-0 md:pl-6 text-xs">
          <div className="org-stat-reach-column">
            <p className="text-text-secondary uppercase text-[10px] font-semibold">Total Reach</p>
            <p className="text-text-primary font-display text-lg">{organizer.totalReach || '180,000+'}</p>
          </div>
          <div className="org-stat-competitions-column">
            <p className="text-text-secondary uppercase text-[10px] font-semibold">Competitions</p>
            <p className="text-text-primary font-display text-lg">{publishedCount} Active</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="org-profile-edit-form space-y-6">
        {/* Identity Section Card */}
        <div className="profile-section-card-box bg-surface border border-border rounded-card p-6 sm:p-8 space-y-6">
          <div className="section-card-title-row border-b border-border pb-4">
            <h2 className="section-card-display-title font-display text-xl text-text-primary font-medium">Organization Identity</h2>
            <p className="section-card-sub-description text-xs text-text-secondary mt-0.5">Public branding shown on your competition pages.</p>
          </div>
          <div className="profile-form-fields-grid grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="form-field-input-group">
              <label className="form-field-label-text block text-[11px] font-semibold tracking-wider uppercase text-text-secondary mb-2">ORGANIZATION NAME <span className="text-sand">*</span></label>
              <input type="text" name="organizationName" value={formData.organizationName} onChange={handleChange} className="form-input w-full px-4 py-2.5 text-sm" required />
            </div>
            <div className="form-field-input-group">
              <label className="form-field-label-text block text-[11px] font-semibold tracking-wider uppercase text-text-secondary mb-2">ORGANIZATION TYPE</label>
              <select name="organizationType" value={formData.organizationType} onChange={handleChange} className="form-select w-full px-4 py-2.5 bg-bg border border-border rounded-xl text-sm text-text-primary focus:outline-none focus:border-sand cursor-pointer">
                <option value="Non-Profit Organization" className="bg-surface text-text-primary">Non-Profit Organization</option>
                <option value="Tech Community / DAO" className="bg-surface text-text-primary">Tech Community / DAO</option>
                <option value="University Club" className="bg-surface text-text-primary">University Club</option>
                <option value="Corporate / Enterprise" className="bg-surface text-text-primary">Corporate / Enterprise</option>
                <option value="Student Chapter" className="bg-surface text-text-primary">Student Chapter</option>
                <option value="Educational Institute" className="bg-surface text-text-primary">Educational Institute</option>
                <option value="Other" className="bg-surface text-text-primary">Other</option>
              </select>
            </div>
          </div>
          <div className="form-field-input-group">
            <label className="form-field-label-text block text-[11px] font-semibold tracking-wider uppercase text-text-secondary mb-2">ORGANIZATION DESCRIPTION & MISSION</label>
            <textarea name="description" rows={4} value={formData.description} onChange={handleChange} className="form-textarea w-full px-4 py-3 bg-bg border border-border rounded-xl text-sm text-text-primary focus:outline-none focus:border-sand" />
          </div>
        </div>

        {/* Online Presence Section Card */}
        <div className="profile-section-card-box bg-surface border border-border rounded-card p-6 sm:p-8 space-y-6">
          <div className="section-card-title-row border-b border-border pb-4">
            <h2 className="section-card-display-title font-display text-xl text-text-primary font-medium">Online Presence</h2>
            <p className="section-card-sub-description text-xs text-text-secondary mt-0.5">Connect your verified official websites and social channels.</p>
          </div>
          <div className="profile-form-fields-grid grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="form-field-input-group">
              <label className="form-field-label-text block text-[11px] font-semibold tracking-wider uppercase text-text-secondary mb-2">OFFICIAL WEBSITE</label>
              <div className="field-icon-input-wrapper relative">
                <input type="text" name="website" value={formData.website} onChange={handleChange} placeholder="https://innovatehub.org" className="form-input w-full pl-10 pr-4 py-2.5 text-sm" />
                <Globe className="w-4 h-4 text-text-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>
            <div className="form-field-input-group">
              <label className="form-field-label-text block text-[11px] font-semibold tracking-wider uppercase text-text-secondary mb-2">LINKEDIN PAGE</label>
              <input type="text" name="linkedin" value={formData.linkedin} onChange={handleChange} placeholder="https://linkedin.com/company/innovatehub" className="form-input w-full px-4 py-2.5 text-sm" />
            </div>
            <div className="form-field-input-group">
              <label className="form-field-label-text block text-[11px] font-semibold tracking-wider uppercase text-text-secondary mb-2">FACEBOOK PAGE</label>
              <input type="text" name="facebook" value={formData.facebook} onChange={handleChange} placeholder="https://facebook.com/innovatehub" className="form-input w-full px-4 py-2.5 text-sm" />
            </div>
            <div className="form-field-input-group">
              <label className="form-field-label-text block text-[11px] font-semibold tracking-wider uppercase text-text-secondary mb-2">INSTAGRAM PROFILE</label>
              <input type="text" name="instagram" value={formData.instagram} onChange={handleChange} placeholder="https://instagram.com/innovatehub" className="form-input w-full px-4 py-2.5 text-sm" />
            </div>
          </div>
        </div>

        {/* Contact and Location Section Card */}
        <div className="profile-section-card-box bg-surface border border-border rounded-card p-6 sm:p-8 space-y-6">
          <div className="section-card-title-row border-b border-border pb-4">
            <h2 className="section-card-display-title font-display text-xl text-text-primary font-medium">Contact & Location</h2>
            <p className="section-card-sub-description text-xs text-text-secondary mt-0.5">Primary administrative contact details for Catalyst inquiries.</p>
          </div>
          <div className="profile-form-fields-grid grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="form-field-input-group">
              <label className="form-field-label-text block text-[11px] font-semibold tracking-wider uppercase text-text-secondary mb-2">PRIMARY CONTACT PERSON</label>
              <input type="text" name="contactPerson" value={formData.contactPerson} onChange={handleChange} className="form-input w-full px-4 py-2.5 text-sm" />
            </div>
            <div className="form-field-input-group">
              <label className="form-field-label-text block text-[11px] font-semibold tracking-wider uppercase text-text-secondary mb-2">OFFICIAL EMAIL</label>
              <div className="field-icon-input-wrapper relative">
                <input type="email" name="email" value={formData.email} onChange={handleChange} className="form-input w-full pl-10 pr-4 py-2.5 text-sm" />
                <Mail className="w-4 h-4 text-text-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>
            <div className="form-field-input-group">
              <label className="form-field-label-text block text-[11px] font-semibold tracking-wider uppercase text-text-secondary mb-2">PHONE NUMBER</label>
              <div className="field-icon-input-wrapper relative">
                <input type="text" name="phone" value={formData.phone} onChange={handleChange} className="form-input w-full pl-10 pr-4 py-2.5 text-sm" />
                <Phone className="w-4 h-4 text-text-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>
            <div className="form-field-input-group">
              <label className="form-field-label-text block text-[11px] font-semibold tracking-wider uppercase text-text-secondary mb-2">HEADQUARTERS / LOCATION</label>
              <div className="field-icon-input-wrapper relative">
                <input type="text" name="location" value={formData.location} onChange={handleChange} placeholder="Dhaka, Bangladesh" className="form-input w-full pl-10 pr-4 py-2.5 text-sm" />
                <MapPin className="w-4 h-4 text-text-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>
          </div>
        </div>

        {/* Form Save Button Row */}
        <div className="form-save-actions-row flex items-center justify-end gap-3 pt-2">
          <button type="submit" disabled={isSaving} className="profile-save-changes-btn inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent-hover text-text-primary px-6 py-3 rounded-xl text-xs sm:text-sm font-medium shadow-md flex items-center gap-2 cursor-pointer disabled:opacity-75 active:scale-[0.98] transition-all">
            <Save className="w-4 h-4" />
            <span>{isSaving ? 'Saving Changes...' : 'Save Organization Profile'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default OrganizationProfile;
