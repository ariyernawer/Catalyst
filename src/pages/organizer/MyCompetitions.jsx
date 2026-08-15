import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useOrganizer } from '../../context/OrganizerContext';
import { Plus, Search, MoreHorizontal, Bookmark, Edit, Eye, Copy, Trash2, CheckCircle2, Clock, Archive } from 'lucide-react';

export const MyCompetitions = () => {
  const navigate = useNavigate();
  const { competitions, publishedCount, deleteCompetition, toggleCompetitionStatus, duplicateCompetition } = useOrganizer();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [sortBy, setSortBy] = useState('recently_updated');
  const [openActionId, setOpenActionId] = useState(null);

  const categories = ['All','Technology','Programming','Business','Case Competition','Innovation','Entrepreneurship','Design','Science','Olympiad','Other'];

  const processedCompetitions = useMemo(() => {
    let list = competitions.filter((comp) => {
      const matchesSearch = comp.title.toLowerCase().includes(searchQuery.toLowerCase()) || comp.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === 'All' || comp.status === statusFilter;
      const matchesCategory = categoryFilter === 'All' || comp.category === categoryFilter;
      return matchesSearch && matchesStatus && matchesCategory;
    });
    list = [...list].sort((a, b) => {
      if (sortBy === 'bookmarks') return (b.bookmarks || 0) - (a.bookmarks || 0);
      if (sortBy === 'title') return a.title.localeCompare(b.title);
      return b.id.localeCompare(a.id);
    });
    return list;
  }, [competitions, searchQuery, statusFilter, categoryFilter, sortBy]);

  return (
    <div className="my-competitions-page-wrapper space-y-6 animate-fade-in pb-12">
      {/* Page Header Row */}
      <div className="page-top-header-row flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="page-title-description-block">
          <p className="page-section-label-tag text-xs font-semibold uppercase tracking-widest text-sand">COMPETITIONS</p>
          <h1 className="page-main-display-title font-display text-3xl sm:text-4xl text-text-primary font-normal tracking-tight mt-1">My Competitions</h1>
          <p className="page-count-summary-text text-xs sm:text-sm text-text-secondary mt-1">{competitions.length} total · {publishedCount} published</p>
        </div>
        <Link to="/organizer/competitions/new" className="page-create-new-btn inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent-hover text-text-primary px-5 py-3 rounded-xl text-sm font-medium transition-all shadow-md active:scale-[0.98] shrink-0">
          <Plus className="w-4 h-4" />
          <span>New Competition</span>
        </Link>
      </div>

      {/* Filter and Search Bar */}
      <div className="competitions-filter-search-bar flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
        <div className="search-text-input-wrapper relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-text-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search competitions..." className="form-input w-full pl-10 pr-4 py-2 text-xs shadow-xs placeholder-text-muted" />
        </div>
        <div className="filter-group-controls-row flex flex-wrap items-center gap-2.5">
          <div className="status-filter-tabs-row flex items-center bg-bg border border-border p-1 rounded-xl">
            {['All', 'Published', 'Draft', 'Closed'].map((status) => (
              <button key={status} onClick={() => setStatusFilter(status)} className={`status-filter-tab-btn px-3 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer ${statusFilter === status ? 'bg-accent text-text-primary shadow-xs' : 'text-text-secondary hover:text-text-primary'}`}>{status}</button>
            ))}
          </div>
          <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className="category-dropdown-select-field px-3 py-2 bg-bg border border-border rounded-xl text-xs text-text-primary focus:outline-none focus:border-sand cursor-pointer shadow-xs">
            {categories.map((c) => <option key={c} value={c} className="bg-surface text-text-primary">{c === 'All' ? 'All Categories' : c}</option>)}
          </select>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="sort-order-dropdown-select px-3 py-2 bg-bg border border-border rounded-xl text-xs text-text-primary focus:outline-none focus:border-sand cursor-pointer shadow-xs font-medium">
            <option value="recently_updated" className="bg-surface text-text-primary">Recently Updated</option>
            <option value="bookmarks" className="bg-surface text-text-primary">Most Bookmarks</option>
            <option value="title" className="bg-surface text-text-primary">Alphabetical (A-Z)</option>
          </select>
        </div>
      </div>

      {/* Competitions List Table */}
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
              {processedCompetitions.length === 0 ? (
                <tr>
                  <td colSpan={6} className="table-empty-state-cell py-16 text-center text-text-secondary">
                    <p className="font-display text-lg text-text-primary">No competitions match your criteria</p>
                    <p className="text-xs text-text-muted mt-1">Try clearing search filters or create a new competition.</p>
                    <Link to="/organizer/competitions/new" className="inline-flex items-center gap-2 mt-4 bg-accent hover:bg-accent-hover text-text-primary text-xs font-medium px-4 py-2 rounded-xl transition-all">
                      <Plus className="w-3.5 h-3.5" /><span>Create New Competition</span>
                    </Link>
                  </td>
                </tr>
              ) : (
                processedCompetitions.map((comp) => {
                  let badgeClass = 'bg-surface-raised text-text-secondary border border-border';
                  let dotColor = 'bg-text-secondary';
                  if (comp.status === 'Published') { badgeClass = 'bg-surface-raised text-sand border border-sand/40'; dotColor = 'bg-sand'; }
                  else if (comp.status === 'Closed') { badgeClass = 'bg-surface-raised text-text-muted border border-border'; dotColor = 'bg-text-muted'; }

                  return (
                    <tr key={comp.id} className="competition-table-data-row hover:bg-surface-raised/40 transition-colors group">
                      <td className="competition-title-info-cell py-4 px-5">
                        <div className="competition-thumb-title-row flex items-center gap-3.5">
                          <img src={comp.thumbnail || 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=120&q=80'} alt={comp.title} className="competition-list-thumbnail-img w-12 h-12 rounded-xl object-cover border border-border shrink-0" />
                          <div className="competition-title-meta-block min-w-0">
                            <Link to={`/organizer/competitions/edit/${comp.id}`} className="competition-name-link-text font-medium text-text-primary hover:text-sand text-sm truncate block transition-colors">{comp.title}</Link>
                            <p className="competition-category-type-text text-xs text-text-muted mt-0.5">{comp.category} · {comp.eventType || 'Online'}</p>
                          </div>
                        </div>
                      </td>
                      <td className="competition-status-badge-cell py-4 px-4 whitespace-nowrap">
                        <span className={`competition-status-badge-pill inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${badgeClass}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${dotColor}`} />{comp.status}
                        </span>
                      </td>
                      <td className="competition-deadline-date-cell py-4 px-4 text-text-primary whitespace-nowrap">{comp.deadline || 'TBA'}</td>
                      <td className="competition-event-date-cell py-4 px-4 text-text-primary whitespace-nowrap">{comp.eventDate || 'TBA'}</td>
                      <td className="competition-bookmarks-count-cell py-4 px-4 text-text-primary whitespace-nowrap font-medium">
                        <span className="inline-flex items-center gap-1"><Bookmark className="w-3.5 h-3.5 text-sand" />{comp.bookmarks || 0}</span>
                      </td>
                      <td className="competition-row-actions-cell py-4 px-5 text-right relative whitespace-nowrap">
                        <div className="row-action-menu-wrapper relative inline-block">
                          <button type="button" onClick={() => setOpenActionId(openActionId === comp.id ? null : comp.id)} className="row-action-menu-trigger-btn w-8 h-8 rounded-lg hover:bg-surface-raised flex items-center justify-center text-text-secondary hover:text-white cursor-pointer">
                            <MoreHorizontal className="w-4 h-4" />
                          </button>
                          {openActionId === comp.id && (
                            <div className="row-action-dropdown-panel absolute right-0 top-9 w-44 bg-surface border border-border rounded-xl shadow-2xl z-20 py-1.5 text-left text-xs animate-fade-in" onMouseLeave={() => setOpenActionId(null)}>
                              <button type="button" onClick={() => { setOpenActionId(null); navigate(`/organizer/competitions/edit/${comp.id}`); }} className="dropdown-menu-option-item w-full px-3.5 py-2 flex items-center gap-2 text-text-primary hover:bg-surface-raised cursor-pointer"><Edit className="w-3.5 h-3.5 text-sand" /><span>Edit Details</span></button>
                              <button type="button" onClick={() => { setOpenActionId(null); navigate(`/organizer/competitions/edit/${comp.id}?preview=true`); }} className="dropdown-menu-option-item w-full px-3.5 py-2 flex items-center gap-2 text-text-primary hover:bg-surface-raised cursor-pointer"><Eye className="w-3.5 h-3.5 text-text-secondary" /><span>View Participant Preview</span></button>
                              <button type="button" onClick={() => { setOpenActionId(null); duplicateCompetition(comp.id); }} className="dropdown-menu-option-item w-full px-3.5 py-2 flex items-center gap-2 text-text-primary hover:bg-surface-raised cursor-pointer"><Copy className="w-3.5 h-3.5 text-text-secondary" /><span>Duplicate</span></button>
                              <div className="dropdown-menu-divider-line border-t border-border my-1" />
                              {comp.status !== 'Published' && <button type="button" onClick={() => { setOpenActionId(null); toggleCompetitionStatus(comp.id, 'Published'); }} className="dropdown-menu-option-item w-full px-3.5 py-2 flex items-center gap-2 text-sand hover:bg-surface-raised cursor-pointer"><CheckCircle2 className="w-3.5 h-3.5" /><span>Publish Now</span></button>}
                              {comp.status !== 'Draft' && <button type="button" onClick={() => { setOpenActionId(null); toggleCompetitionStatus(comp.id, 'Draft'); }} className="dropdown-menu-option-item w-full px-3.5 py-2 flex items-center gap-2 text-text-secondary hover:bg-surface-raised cursor-pointer"><Clock className="w-3.5 h-3.5" /><span>Revert to Draft</span></button>}
                              {comp.status !== 'Closed' && <button type="button" onClick={() => { setOpenActionId(null); toggleCompetitionStatus(comp.id, 'Closed'); }} className="dropdown-menu-option-item w-full px-3.5 py-2 flex items-center gap-2 text-text-muted hover:bg-surface-raised cursor-pointer"><Archive className="w-3.5 h-3.5" /><span>Close</span></button>}
                              <div className="dropdown-menu-divider-line border-t border-border my-1" />
                              <button type="button" onClick={() => { setOpenActionId(null); if (window.confirm(`Delete "${comp.title}"?`)) deleteCompetition(comp.id); }} className="dropdown-menu-option-item w-full px-3.5 py-2 flex items-center gap-2 text-danger hover:bg-red-950/40 cursor-pointer"><Trash2 className="w-3.5 h-3.5" /><span>Delete Competition</span></button>
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
  );
};

export default MyCompetitions;
