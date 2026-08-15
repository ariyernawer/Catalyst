import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOrganizer } from '../../context/OrganizerContext';
import { Building2 } from 'lucide-react';

export const OrganizerSignup = () => {
  const navigate = useNavigate();
  const { registerOrganizer, login } = useOrganizer();

  const [mode, setMode] = useState('signup');
  const [formData, setFormData] = useState({
    organizationName: '',
    organizationType: 'Non-Profit Organization',
    contactPerson: '',
    phone: '',
    email: '',
    website: '',
    password: '',
    confirmPassword: '',
    description: ''
  });

  const [signInData, setSignInData] = useState({
    email: '',
    password: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignInChange = (e) => {
    const { name, value } = e.target;
    setSignInData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignUpSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      registerOrganizer({
        organizationName: formData.organizationName || 'InnovateHub Foundation',
        organizationType: formData.organizationType || 'Non-Profit Organization',
        contactPerson: formData.contactPerson || 'Priya Sharma',
        phone: formData.phone || '+880 1800 000000',
        email: formData.email || 'contact@innovatehub.org',
        website: formData.website || 'https://innovatehub.org',
        description: formData.description || 'Empowering student innovation and opportunities worldwide.'
      });
      navigate('/organizer');
    }, 200);
  };

  const handleSignInSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      login();
      navigate('/organizer');
    }, 200);
  };

  return (
    <div className="signup-page-full-screen page-container flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 selection:bg-sand/25 selection:text-white">
      {/* Brand Header Logo Row */}
      <div className="signup-brand-header-row flex items-center gap-2.5 mb-6">
        <div className="brand-circular-logo-icon w-8 h-8 rounded-full bg-surface border border-border text-text-primary flex items-center justify-center font-display font-bold text-sm shadow-md">C</div>
        <span className="brand-catalyst-name-text font-display text-2xl font-semibold tracking-tight text-text-primary">Catalyst</span>
      </div>

      {/* Main Auth Form Card */}
      <div className="auth-main-form-card bg-surface border border-border rounded-card w-full max-w-2xl p-6 sm:p-8 md:p-10 text-text-primary shadow-card relative">
        {mode === 'signup' ? (
          <div>
            <div className="form-card-header-block flex items-start gap-4 mb-6">
              <div className="form-card-header-icon w-12 h-12 rounded-xl bg-surface-raised border border-border flex items-center justify-center text-sand shrink-0 shadow-inner">
                <Building2 className="w-6 h-6" />
              </div>
              <div className="form-card-title-text-block">
                <h1 className="form-card-main-title font-display text-2xl sm:text-3xl text-text-primary font-medium tracking-tight">
                  Create Organizer Account
                </h1>
                <p className="form-card-sub-description text-xs sm:text-sm text-text-secondary mt-0.5">
                  Reach 180,000+ students with your competition.
                </p>
              </div>
            </div>

            <form onSubmit={handleSignUpSubmit} className="signup-form-field-list space-y-4">
              <div className="signup-form-fields-grid grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-field-input-group">
                  <label className="form-field-label-text block text-xs font-medium text-text-secondary mb-1.5">
                    Organization Name <span className="text-sand">*</span>
                  </label>
                  <input
                    type="text"
                    name="organizationName"
                    value={formData.organizationName}
                    onChange={handleChange}
                    placeholder="Tech Collective BD"
                    className="form-input w-full px-3.5 py-2.5 text-sm placeholder-text-muted"
                  />
                </div>

                <div className="form-field-input-group">
                  <label className="form-field-label-text block text-xs font-medium text-text-secondary mb-1.5">
                    Organization Type <span className="text-sand">*</span>
                  </label>
                  <div className="select-field-wrapper relative">
                    <select
                      name="organizationType"
                      value={formData.organizationType}
                      onChange={handleChange}
                      className="form-select w-full bg-bg border border-border focus:border-sand focus:outline-none rounded-xl px-3.5 py-2.5 text-sm text-text-primary transition-colors appearance-none cursor-pointer"
                    >
                      <option value="Non-Profit Organization">Non-Profit Organization</option>
                      <option value="Tech Community / DAO">Tech Community / DAO</option>
                      <option value="University Club">University Club</option>
                      <option value="Corporate / Enterprise">Corporate / Enterprise</option>
                      <option value="Student Chapter">Student Chapter</option>
                      <option value="Educational Institute">Educational Institute</option>
                      <option value="Other">Other</option>
                    </select>
                    <div className="select-dropdown-arrow-icon pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-text-secondary">
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                        <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="form-field-input-group">
                  <label className="form-field-label-text block text-xs font-medium text-text-secondary mb-1.5">
                    Contact Person <span className="text-sand">*</span>
                  </label>
                  <input
                    type="text"
                    name="contactPerson"
                    value={formData.contactPerson}
                    onChange={handleChange}
                    placeholder="Nusrat Jahan"
                    className="form-input w-full px-3.5 py-2.5 text-sm placeholder-text-muted"
                  />
                </div>

                <div className="form-field-input-group">
                  <label className="form-field-label-text block text-xs font-medium text-text-secondary mb-1.5">
                    Phone
                  </label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+880 1800 000000"
                    className="form-input w-full px-3.5 py-2.5 text-sm placeholder-text-muted"
                  />
                </div>

                <div className="form-field-input-group">
                  <label className="form-field-label-text block text-xs font-medium text-text-secondary mb-1.5">
                    Official Email <span className="text-sand">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="info@org.com"
                    className="form-input w-full px-3.5 py-2.5 text-sm placeholder-text-muted"
                  />
                </div>

                <div className="form-field-input-group">
                  <label className="form-field-label-text block text-xs font-medium text-text-secondary mb-1.5">
                    Website / Social Page
                  </label>
                  <input
                    type="text"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    placeholder="https://org.com"
                    className="form-input w-full px-3.5 py-2.5 text-sm placeholder-text-muted"
                  />
                </div>

                <div className="form-field-input-group">
                  <label className="form-field-label-text block text-xs font-medium text-text-secondary mb-1.5">
                    Password <span className="text-sand">*</span>
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Min. 8 characters"
                    className="form-input w-full px-3.5 py-2.5 text-sm placeholder-text-muted"
                  />
                </div>

                <div className="form-field-input-group">
                  <label className="form-field-label-text block text-xs font-medium text-text-secondary mb-1.5">
                    Confirm Password <span className="text-sand">*</span>
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Repeat password"
                    className="form-input w-full px-3.5 py-2.5 text-sm placeholder-text-muted"
                  />
                </div>
              </div>

              <div className="form-field-input-group">
                <label className="form-field-label-text block text-xs font-medium text-text-secondary mb-1.5">
                  Brief Description
                </label>
                <textarea
                  name="description"
                  rows={3}
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe your organization and the kinds of competitions you run..."
                  className="form-textarea w-full bg-bg border border-border focus:border-sand focus:outline-none rounded-xl px-3.5 py-2.5 text-sm text-text-primary placeholder-text-muted transition-colors resize-none"
                />
              </div>

              <div className="form-review-info-callout bg-surface-raised border border-border rounded-xl p-3.5 flex items-start gap-3">
                <span className="text-sand text-sm mt-0.5 select-none font-mono">◆</span>
                <p className="text-xs text-text-secondary leading-relaxed">
                  Organizer accounts are reviewed within <strong className="text-text-primary font-semibold">24 hours</strong>. Once approved, you can list unlimited competitions.
                </p>
              </div>

              <p className="form-terms-disclaimer-text text-[11px] text-text-muted text-center">
                By registering you agree to our <a href="#terms" className="underline hover:text-text-primary">Terms</a> and <a href="#privacy" className="underline hover:text-text-primary">Privacy Policy</a>.
              </p>

              <button
                type="submit"
                disabled={isSubmitting}
                className="signup-form-submit-button w-full py-3 px-6 bg-accent hover:bg-accent-hover text-text-primary text-sm font-medium rounded-xl shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75 active:scale-[0.99] transition-all"
              >
                {isSubmitting ? (
                  <span>Entering Dashboard...</span>
                ) : (
                  <>
                    <span>Create Account &amp; Explore &rarr;</span>
                  </>
                )}
              </button>

              <div className="auth-mode-switch-row text-center pt-2">
                <button
                  type="button"
                  onClick={() => setMode('signin')}
                  className="auth-mode-toggle-button text-xs text-text-secondary hover:text-text-primary transition-colors cursor-pointer"
                >
                  Already have an account? <span className="text-sand hover:underline font-medium">Sign in &rarr;</span>
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div>
            <div className="form-card-header-block flex items-start gap-4 mb-6">
              <div className="form-card-header-icon w-12 h-12 rounded-xl bg-surface-raised border border-border flex items-center justify-center text-sand shrink-0">
                <Building2 className="w-6 h-6" />
              </div>
              <div className="form-card-title-text-block">
                <h2 className="form-card-main-title font-display text-2xl sm:text-3xl text-text-primary font-medium tracking-tight">
                  Organizer Sign In
                </h2>
                <p className="form-card-sub-description text-xs sm:text-sm text-text-secondary mt-0.5">
                  Welcome back! Manage your competitions and live analytics.
                </p>
              </div>
            </div>

            <form onSubmit={handleSignInSubmit} className="signin-form-field-list space-y-4">
              <div className="form-field-input-group">
                <label className="form-field-label-text block text-xs font-medium text-text-secondary mb-1.5">
                  Official Email <span className="text-sand">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={signInData.email}
                  onChange={handleSignInChange}
                  placeholder="info@org.com"
                  className="form-input w-full px-3.5 py-2.5 text-sm placeholder-text-muted"
                />
              </div>

              <div className="form-field-input-group">
                <label className="form-field-label-text block text-xs font-medium text-text-secondary mb-1.5">
                  Password <span className="text-sand">*</span>
                </label>
                <input
                  type="password"
                  name="password"
                  value={signInData.password}
                  onChange={handleSignInChange}
                  placeholder="••••••••"
                  className="form-input w-full px-3.5 py-2.5 text-sm placeholder-text-muted"
                />
              </div>

              <div className="signin-form-extra-options flex items-center justify-between text-xs text-text-secondary py-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" defaultChecked className="rounded bg-bg border-border text-sand" />
                  <span>Remember this device</span>
                </label>
                <a href="#forgot" className="text-sand hover:underline">Forgot password?</a>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="signin-form-submit-button w-full py-3 px-6 bg-accent hover:bg-accent-hover text-text-primary text-sm font-medium rounded-xl shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75 transition-all"
              >
                {isSubmitting ? (
                  <span>Signing In...</span>
                ) : (
                  <>
                    <span>Sign In to Dashboard &rarr;</span>
                  </>
                )}
              </button>

              <div className="auth-mode-switch-row text-center pt-2">
                <button
                  type="button"
                  onClick={() => setMode('signup')}
                  className="auth-mode-toggle-button text-xs text-text-secondary hover:text-text-primary transition-colors cursor-pointer"
                >
                  Don&apos;t have an organizer account? <span className="text-sand hover:underline font-medium">Register now &rarr;</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrganizerSignup;
