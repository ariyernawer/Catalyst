import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useOrganizer } from '../../context/OrganizerContext';
import {
  Trophy, FileText, Bookmark, Calendar, TrendingUp,
  Search, MoreHorizontal, Plus, ArrowRight,
  Edit, Eye, Copy, Trash2, CheckCircle2, Clock, Archive
} from 'lucide-react';

export const OrganizerDashboard = () => {
  const navigate = useNavigate();
  const {
    organizer, competitions, publishedCount, draftCount,
    totalBookmarks, upcomingEventsCount,
    deleteCompetition, toggleCompetitionStatus, duplicateCompetition
  } = useOrganizer();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [openActionMenuId, setOpenActionMenuId] = useState(null);

  const filteredCompetitions = useMemo(() => {
    return competitions.filter((comp) => {
      const matchesSearch =
        comp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        comp.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === 'All' || comp.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [competitions, searchQuery, statusFilter]);

  const formatStat = (num) => (num < 10 ? `0${num}` : `${num}`);

  return (
    <div className="dashboard-main-page-wrapper space-y-8 animate-fade-in pb-12">
      {/* Welcome Hero Card */}
      <div className="dashboard-welcome-hero-card bg-surface border border-border rounded-card p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-card relative overflow-hidden">
        <div className="hero-greeting-text-block">
          <p className="hero-organizer-label-tag text-xs font-semibold uppercase tracking-widest text-sand">
            ORGANIZER DASHBOARD
          </p>
          <h1 className="hero-welcome-display-title font-display text-3xl sm:text-4xl text-text-primary font-normal tracking-tight mt-1">
            Welcome back, <em className="italic font-normal">{organizer.contactPerson?.split(' ')[0] || 'Priya'}.</em>
          </h1>
          <p className="hero-tagline-subtitle-text text-xs sm:text-sm text-text-secondary mt-1.5 max-w-xl">
            Create opportunities. Reach over 180,000+ ambitious student innovators worldwide.
          </p>
        </div>

        <Link
          to="/organizer/competitions/new"
          className="dashboard-create-competition-btn inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent-hover text-text-primary px-5 py-3 rounded-xl text-xs sm:text-sm font-medium transition-all shadow-lg hover:shadow-stone-950/50 active:scale-[0.98] shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Create Competition</span>
        </Link>
      </div>

      {/* Four Stats Cards Grid */}
      <div className="dashboard-stats-cards-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        <div className="stat-published-count-card bg-surface border border-border rounded-card p-5 text-text-primary shadow-xs relative overflow-hidden group">
          <div className="stat-card-header-row flex items-center justify-between">
            <span className="stat-card-label-text text-[11px] font-semibold uppercase tracking-wider text-text-secondary">PUBLISHED</span>
            <Trophy className="stat-card-label-icon w-4 h-4 text-sand" />
          </div>
          <div className="stat-card-value-block mt-3">
            <p className="stat-card-big-number font-display text-4xl text-text-primary font-normal">{formatStat(publishedCount)}</p>
            <p className="stat-card-sub-note text-xs text-sand mt-1">+2 this season</p>
          </div>
        </div>

        <div className="stat-draft-count-card bg-surface border border-border rounded-card p-5 text-text-primary shadow-xs hover:border-sand/40 transition-colors">
          <div className="stat-card-header-row flex items-center justify-between">
            <span className="stat-card-label-text text-[11px] font-semibold uppercase tracking-wider text-text-secondary">DRAFTS</span>
            <FileText className="stat-card-label-icon w-4 h-4 text-text-muted" />
          </div>
          <div className="stat-card-value-block mt-3">
            <p className="stat-card-big-number font-display text-4xl text-text-primary font-normal">{formatStat(draftCount)}</p>
            <p className="stat-card-sub-note text-xs text-text-muted mt-1">Ready to publish</p>
          </div>
        </div>

        <div className="stat-bookmarks-count-card bg-surface border border-border rounded-card p-5 text-text-primary shadow-xs hover:border-sand/40 transition-colors">
          <div className="stat-card-header-row flex items-center justify-between">
            <span className="stat-card-label-text text-[11px] font-semibold uppercase tracking-wider text-text-secondary">TOTAL BOOKMARKS</span>
            <Bookmark className="stat-card-label-icon w-4 h-4 text-text-muted" />
          </div>
          <div className="stat-card-value-block mt-3">
            <p className="stat-card-big-number font-display text-4xl text-text-primary font-normal">
              {totalBookmarks > 1000 ? `${(totalBookmarks / 1000).toFixed(1)}k` : totalBookmarks}
            </p>
            <p className="stat-card-sub-note text-xs text-text-muted mt-1">Across all competitions</p>
          </div>
        </div>

        <div className="stat-upcoming-events-card bg-surface border border-border rounded-card p-5 text-text-primary shadow-xs hover:border-sand/40 transition-colors">
          <div className="stat-card-header-row flex items-center justify-between">
            <span className="stat-card-label-text text-[11px] font-semibold uppercase tracking-wider text-text-secondary">UPCOMING EVENTS</span>
            <Calendar className="stat-card-label-icon w-4 h-4 text-text-muted" />
          </div>
          <div className="stat-card-value-block mt-3">
            <p className="stat-card-big-number font-display text-4xl text-text-primary font-normal">{formatStat(upcomingEventsCount)}</p>
            <p className="stat-card-sub-note text-xs text-text-muted mt-1">3 closing soon</p>
          </div>
        </div>
      </div>

      {/* Engagement Trending Info Banner */}
      <div className="dashboard-engagement-info-banner bg-surface border border-border rounded-card p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
        <div className="engagement-banner-left-content flex items-center gap-3.5">
          <div className="engagement-trending-icon-box w-10 h-10 rounded-xl bg-bg border border-border flex items-center justify-center text-sand shrink-0">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div className="engagement-banner-text-block">
            <p className="engagement-banner-headline-text text-sm font-medium text-text-primary">
              InnoSpark Hackathon gained <span className="font-semibold text-sand">+47 bookmarks</span> this week
            </p>
            <p className="engagement-banner-sub-description text-xs text-text-secondary">
              Your most-bookmarked active competition
            </p>
          </div>
        </div>

        <Link
          to="/organizer/competitions"
          className="engagement-view-all-btn inline-flex items-center gap-1.5 bg-accent hover:bg-accent-hover text-text-primary text-xs font-medium px-4 py-2 rounded-xl transition-all shadow-xs self-start sm:self-auto cursor-pointer"
        >
          <span>View all</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Competition List Table Section */}
      <div className="dashboard-competitions-table-section space-y-4">
        <div className="table-section-top-row flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="table-section-title-block">
            <h2 className="table-section-display-title font-display text-2xl text-text-primary font-medium">Your Competitions</h2>
            <p className="table-section-sub-description text-xs text-text-secondary mt-0.5">Manage your published opportunities and drafts.</p>
          </div>

          <div className="table-filter-controls-row flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="search-input-field-box relative">
              <Search className="w-4 h-4 text-text-muted absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search competitions..."
                className="form-input w-full sm:w-56 pl-9 pr-3.5 py-1.5 text-xs placeholder-text-muted"
              />
            </div>

            <div className="status-filter-tabs-row flex items-center bg-bg border border-border p-1 rounded-xl">
              {['All', 'Published', 'Draft', 'Closed'].map((status) => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`status-filter-tab-btn px-3 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                    statusFilter === status
                      ? 'bg-accent text-text-primary shadow-xs'
                      : 'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Competitions Data Table */}
        <div className="competitions-data-table-card bg-surface border border-border rounded-card overflow-hidden shadow-card">
          <div className="table-horizontal-scroll-wrapper overflow-x-auto">
            <table className="competitions-list-table w-full text-left text-xs">
              <thead className="table-column-headers-row bg-bg border-b border-border text-[11px] font-semibold text-text-secondary uppercase tracking-wider">
                <tr>
                  <th className="table-header-cell py-3.5 px-5">Competition</th>
                  <th className="table-header-cell py-3.5 px-4">Status</th>
                  <th className="table-header-cell py-3.5 px-4">Deadline</th>
                  <th className="table-header-cell py-3.5 px-4">Event Date</th>
                  <th className="table-header-cell py-3.5 px-4">Bookmarks</th>
                  <th className="table-header-cell py-3.5 px-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="table-data-rows-body divide-y divide-border-subtle">
                {filteredCompetitions.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="table-empty-state-cell py-12 text-center text-text-secondary">
                      <p className="font-display text-base text-text-primary">No competitions found</p>
                      <p className="text-xs mt-1 text-text-muted">Try adjusting your search or status filter.</p>
                    </td>
                  </tr>
                ) : (
                  filteredCompetitions.map((comp) => {
                    let badgeClass = 'bg-surface-raised text-text-secondary border border-border';
                    let dotColor = 'bg-text-secondary';
                    if (comp.status === 'Published') { badgeClass = 'bg-surface-raised text-sand border border-sand/40'; dotColor = 'bg-sand'; }
                    else if (comp.status === 'Closed') { badgeClass = 'bg-surface-raised text-text-muted border border-border'; dotColor = 'bg-text-muted'; }

                    return (
                      <tr key={comp.id} className="competition-table-data-row hover:bg-surface-raised/40 transition-colors group">
                        <td className="competition-title-info-cell py-4 px-5">
                          <div className="competition-thumb-title-row flex items-center gap-3.5">
                            <img
                              src={comp.thumbnail || 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=120&q=80'}
                              alt={comp.title}
                              className="competition-list-thumbnail-img w-11 h-11 rounded-xl object-cover border border-border shrink-0"
                            />
                            <div className="competition-title-meta-block min-w-0">
                              <Link
                                to={`/organizer/competitions/edit/${comp.id}`}
                                className="competition-name-link-text font-medium text-text-primary hover:text-sand text-sm truncate block transition-colors"
                              >
                                {comp.title}
                              </Link>
                              <p className="competition-category-type-text text-xs text-text-muted mt-0.5">
                                {comp.category} · {comp.eventType || 'Online'}
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="competition-status-badge-cell py-4 px-4 whitespace-nowrap">
                          <span className={`competition-status-badge-pill inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${badgeClass}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${dotColor}`} />
                            {comp.status}
                          </span>
                        </td>

                        <td className="competition-deadline-date-cell py-4 px-4 text-text-primary whitespace-nowrap">{comp.deadline}</td>
                        <td className="competition-event-date-cell py-4 px-4 text-text-primary whitespace-nowrap">{comp.eventDate}</td>

                        <td className="competition-bookmarks-count-cell py-4 px-4 text-text-primary whitespace-nowrap font-medium">
                          <span className="inline-flex items-center gap-1">
                            <Bookmark className="w-3.5 h-3.5 text-sand" />
                            {comp.bookmarks}
                          </span>
                        </td>

                        <td className="competition-row-actions-cell py-4 px-5 text-right relative whitespace-nowrap">
                          <div className="row-action-menu-wrapper relative inline-block">
                            <button
                              type="button"
                              onClick={() => setOpenActionMenuId(openActionMenuId === comp.id ? null : comp.id)}
                              className="row-action-menu-trigger-btn w-8 h-8 rounded-lg hover:bg-surface-raised flex items-center justify-center text-text-secondary hover:text-white cursor-pointer"
                            >
                              <MoreHorizontal className="w-4 h-4" />
                            </button>

                            {openActionMenuId === comp.id && (
                              <div
                                className="row-action-dropdown-panel absolute right-0 top-9 w-44 bg-surface border border-border rounded-xl shadow-2xl z-20 py-1.5 text-left text-xs animate-fade-in"
                                onMouseLeave={() => setOpenActionMenuId(null)}
                              >
                                <button type="button" onClick={() => { setOpenActionMenuId(null); navigate(`/organizer/competitions/edit/${comp.id}`); }} className="dropdown-menu-option-item w-full px-3.5 py-2 flex items-center gap-2 text-text-primary hover:bg-surface-raised cursor-pointer">
                                  <Edit className="w-3.5 h-3.5 text-sand" /><span>Edit Competition</span>
                                </button>
                                <button type="button" onClick={() => { setOpenActionMenuId(null); navigate(`/organizer/competitions/edit/${comp.id}?preview=true`); }} className="dropdown-menu-option-item w-full px-3.5 py-2 flex items-center gap-2 text-text-primary hover:bg-surface-raised cursor-pointer">
                                  <Eye className="w-3.5 h-3.5 text-text-secondary" /><span>View Preview</span>
                                </button>
                                <button type="button" onClick={() => { setOpenActionMenuId(null); duplicateCompetition(comp.id); }} className="dropdown-menu-option-item w-full px-3.5 py-2 flex items-center gap-2 text-text-primary hover:bg-surface-raised cursor-pointer">
                                  <Copy className="w-3.5 h-3.5 text-text-secondary" /><span>Duplicate</span>
                                </button>
                                <div className="dropdown-menu-divider-line border-t border-border my-1" />
                                {comp.status !== 'Published' && (
                                  <button type="button" onClick={() => { setOpenActionMenuId(null); toggleCompetitionStatus(comp.id, 'Published'); }} className="dropdown-menu-option-item w-full px-3.5 py-2 flex items-center gap-2 text-sand hover:bg-surface-raised cursor-pointer">
                                    <CheckCircle2 className="w-3.5 h-3.5" /><span>Set as Published</span>
                                  </button>
                                )}
                                {comp.status !== 'Draft' && (
                                  <button type="button" onClick={() => { setOpenActionMenuId(null); toggleCompetitionStatus(comp.id, 'Draft'); }} className="dropdown-menu-option-item w-full px-3.5 py-2 flex items-center gap-2 text-text-secondary hover:bg-surface-raised cursor-pointer">
                                    <Clock className="w-3.5 h-3.5" /><span>Move to Draft</span>
                                  </button>
                                )}
                                {comp.status !== 'Closed' && (
                                  <button type="button" onClick={() => { setOpenActionMenuId(null); toggleCompetitionStatus(comp.id, 'Closed'); }} className="dropdown-menu-option-item w-full px-3.5 py-2 flex items-center gap-2 text-text-muted hover:bg-surface-raised cursor-pointer">
                                    <Archive className="w-3.5 h-3.5" /><span>Close</span>
                                  </button>
                                )}
                                <div className="dropdown-menu-divider-line border-t border-border my-1" />
                                <button type="button" onClick={() => { setOpenActionMenuId(null); if (window.confirm(`Delete "${comp.title}"?`)) deleteCompetition(comp.id); }} className="dropdown-menu-option-item w-full px-3.5 py-2 flex items-center gap-2 text-danger hover:bg-red-950/40 cursor-pointer">
                                  <Trash2 className="w-3.5 h-3.5" /><span>Delete</span>
                                </button>
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrganizerDashboard;
