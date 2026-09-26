import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCompetitionController } from "../../../controllers/competitionController";
import {
  Search, MoreHorizontal, Bookmark, Edit, Eye, Copy,
  Trash2, CheckCircle2, Clock, Archive, Plus,
} from "lucide-react";

const STATUS_FILTERS = ["All", "Published", "Draft", "Closed"];
const CATEGORY_OPTIONS = [
  "All", "Technology", "Programming", "Business", "Case Competition",
  "Innovation", "Entrepreneurship", "Design", "Science", "Olympiad", "Other",
];

const DEFAULT_THUMBNAIL =
  "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=120&q=80";

// Shared competitions table with search, status/category filters, sorting and
// the per-row action menu. Used by the organizer Dashboard and My Competitions.
export function CompetitionsTable({
  competitions,
  showCategoryFilter = false,
  showSort = false,
  emptyTitle = "No competitions found",
  emptyText = "Try adjusting your search or status filter.",
  emptyAction = null,
}) {
  const navigate = useNavigate();
  const { deleteCompetition, toggleCompetitionStatus, duplicateCompetition } = useCompetitionController();

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [sortBy, setSortBy] = useState("recently_updated");
  const [openActionId, setOpenActionId] = useState(null);

  const filteredCompetitions = useMemo(() => {
    let list = competitions.filter((comp) => {
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        comp.title.toLowerCase().includes(q) ||
        comp.category.toLowerCase().includes(q);
      const matchesStatus = statusFilter === "All" || comp.status === statusFilter;
      const matchesCategory = categoryFilter === "All" || comp.category === categoryFilter;
      return matchesSearch && matchesStatus && matchesCategory;
    });

    if (sortBy === "bookmarks") {
      list = [...list].sort((a, b) => (b.bookmarks || 0) - (a.bookmarks || 0));
    } else if (sortBy === "title") {
      list = [...list].sort((a, b) => a.title.localeCompare(b.title));
    } else {
      list = [...list].sort((a, b) => (b.id || b._id || '').localeCompare(a.id || a._id || ''));
    }
    return list;
  }, [competitions, searchQuery, statusFilter, categoryFilter, sortBy]);

  const statusBadge = (status) => {
    if (status === "Published") return "bg-surface-raised text-sand border border-sand/40";
    if (status === "Closed") return "bg-surface-raised text-text-muted border border-border";
    return "bg-surface-raised text-text-secondary border border-border";
  };

  const statusDot = (status) => {
    if (status === "Published") return "bg-sand";
    if (status === "Closed") return "bg-text-muted";
    return "bg-text-secondary";
  };

  return (
    <div className="space-y-4">
      {/* Filter and Search Bar */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-text-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search competitions..."
            className="form-input w-full pl-10 pr-4 py-2 text-xs shadow-xs placeholder-text-muted"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <div className="flex items-center bg-bg border border-border p-1 rounded-xl">
            {STATUS_FILTERS.map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  statusFilter === status
                    ? "bg-accent text-text-primary shadow-xs"
                    : "text-text-secondary hover:text-text-primary"
                }`}
              >
                {status}
              </button>
            ))}
          </div>

          {showCategoryFilter && (
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-3 py-2 bg-bg border border-border rounded-xl text-xs text-text-primary focus:outline-none focus:border-sand cursor-pointer shadow-xs"
            >
              {CATEGORY_OPTIONS.map((c) => (
                <option key={c} value={c} className="bg-surface text-text-primary">
                  {c === "All" ? "All Categories" : c}
                </option>
              ))}
            </select>
          )}

          {showSort && (
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 bg-bg border border-border rounded-xl text-xs text-text-primary focus:outline-none focus:border-sand cursor-pointer shadow-xs font-medium"
            >
              <option value="recently_updated" className="bg-surface text-text-primary">Recently Updated</option>
              <option value="bookmarks" className="bg-surface text-text-primary">Most Bookmarks</option>
              <option value="title" className="bg-surface text-text-primary">Alphabetical (A-Z)</option>
            </select>
          )}
        </div>
      </div>

      {/* Competitions Table */}
      <div className="bg-surface border border-border rounded-card shadow-card relative">
        {openActionId && (
          <div
            className="fixed inset-0 z-30 bg-transparent"
            onClick={() => setOpenActionId(null)}
          />
        )}
        <div className="overflow-x-auto min-h-[380px] rounded-card pb-36">
          <table className="w-full text-left text-xs">
            <thead className="bg-bg border-b border-border text-[11px] font-semibold text-text-secondary uppercase tracking-wider">
              <tr>
                <th className="py-3.5 px-5">Competition</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Deadline</th>
                <th className="py-3.5 px-4">Event Date</th>
                <th className="py-3.5 px-4">Bookmarks</th>
                <th className="py-3.5 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle">
              {filteredCompetitions.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-16 text-center text-text-secondary">
                    <p className="font-display text-lg text-text-primary">{emptyTitle}</p>
                    <p className="text-xs text-text-muted mt-1">{emptyText}</p>
                    {emptyAction && <div className="mt-4">{emptyAction}</div>}
                  </td>
                </tr>
              ) : (
                filteredCompetitions.map((comp, idx) => {
                  const compId = comp.id || comp._id;
                  // Only open upward if it's the last item in a list with more than 2 items
                  const openUpward = filteredCompetitions.length > 2 && idx === filteredCompetitions.length - 1;
                  return (
                    <tr key={compId} className="hover:bg-surface-raised/40 transition-colors group">
                      <td className="py-4 px-5">
                        <div className="flex items-center gap-3.5">
                          <img
                            src={comp.thumbnail || DEFAULT_THUMBNAIL}
                            alt={comp.title}
                            className="w-11 h-11 rounded-xl object-cover border border-border shrink-0"
                          />
                          <div className="min-w-0">
                            <Link
                              to={`/organizer/competitions/edit/${compId}`}
                              className="font-medium text-text-primary hover:text-sand text-sm truncate block transition-colors"
                            >
                              {comp.title}
                            </Link>
                            <p className="text-xs text-text-muted mt-0.5">
                              {comp.category} · {comp.eventType || "Online"}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="py-4 px-4 whitespace-nowrap">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${statusBadge(comp.status)}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${statusDot(comp.status)}`} />
                          {comp.status}
                        </span>
                      </td>

                      <td className="py-4 px-4 text-text-primary whitespace-nowrap">{comp.deadline || "TBA"}</td>
                      <td className="py-4 px-4 text-text-primary whitespace-nowrap">{comp.eventDate || "TBA"}</td>

                      <td className="py-4 px-4 text-text-primary whitespace-nowrap font-medium">
                        <span className="inline-flex items-center gap-1">
                          <Bookmark className="w-3.5 h-3.5 text-sand" />
                          {comp.bookmarks || 0}
                        </span>
                      </td>

                      <td className="py-4 px-5 text-right relative whitespace-nowrap">
                        <div className="relative inline-block">
                          <button
                            type="button"
                            onClick={() => setOpenActionId(openActionId === compId ? null : compId)}
                            className="w-8 h-8 rounded-lg hover:bg-surface-raised flex items-center justify-center text-text-secondary hover:text-white cursor-pointer"
                          >
                            <MoreHorizontal className="w-4 h-4" />
                          </button>

                          {openActionId === compId && (
                            <div
                              className={`absolute right-0 w-48 bg-surface border border-border rounded-xl shadow-2xl z-40 py-1.5 text-left text-xs animate-fade-in ${
                                openUpward ? 'bottom-full mb-1.5 origin-bottom-right' : 'top-full mt-1.5 origin-top-right'
                              }`}
                            >
                              <button
                                type="button"
                                onClick={() => { setOpenActionId(null); navigate(`/organizer/competitions/edit/${compId}`); }}
                                className="w-full px-3.5 py-2 flex items-center gap-2 text-text-primary hover:bg-surface-raised cursor-pointer"
                              >
                                <Edit className="w-3.5 h-3.5 text-sand" /><span>Edit Details</span>
                              </button>
                              <button
                                type="button"
                                onClick={() => { setOpenActionId(null); navigate(`/organizer/competitions/edit/${compId}?preview=true`); }}
                                className="w-full px-3.5 py-2 flex items-center gap-2 text-text-primary hover:bg-surface-raised cursor-pointer"
                              >
                                <Eye className="w-3.5 h-3.5 text-text-secondary" /><span>View Participant Preview</span>
                              </button>
                              <button
                                type="button"
                                onClick={() => { setOpenActionId(null); duplicateCompetition(compId); }}
                                className="w-full px-3.5 py-2 flex items-center gap-2 text-text-primary hover:bg-surface-raised cursor-pointer"
                              >
                                <Copy className="w-3.5 h-3.5 text-text-secondary" /><span>Duplicate</span>
                              </button>

                              <div className="border-t border-border my-1" />

                              {comp.status !== "Published" && (
                                <button
                                  type="button"
                                  onClick={() => { setOpenActionId(null); toggleCompetitionStatus(compId, "Published"); }}
                                  className="w-full px-3.5 py-2 flex items-center gap-2 text-sand hover:bg-surface-raised cursor-pointer"
                                >
                                  <CheckCircle2 className="w-3.5 h-3.5" /><span>Publish Now</span>
                                </button>
                              )}
                              {comp.status !== "Draft" && (
                                <button
                                  type="button"
                                  onClick={() => { setOpenActionId(null); toggleCompetitionStatus(compId, "Draft"); }}
                                  className="w-full px-3.5 py-2 flex items-center gap-2 text-text-secondary hover:bg-surface-raised cursor-pointer"
                                >
                                  <Clock className="w-3.5 h-3.5" /><span>Revert to Draft</span>
                                </button>
                              )}
                              {comp.status !== "Closed" && (
                                <button
                                  type="button"
                                  onClick={() => { setOpenActionId(null); toggleCompetitionStatus(compId, "Closed"); }}
                                  className="w-full px-3.5 py-2 flex items-center gap-2 text-text-muted hover:bg-surface-raised cursor-pointer"
                                >
                                  <Archive className="w-3.5 h-3.5" /><span>Close</span>
                                </button>
                              )}

                              <div className="border-t border-border my-1" />

                              <button
                                type="button"
                                onClick={() => { setOpenActionId(null); if (window.confirm(`Delete "${comp.title}"?`)) deleteCompetition(compId); }}
                                className="w-full px-3.5 py-2 flex items-center gap-2 text-danger hover:bg-red-950/40 cursor-pointer"
                              >
                                <Trash2 className="w-3.5 h-3.5" /><span>Delete Competition</span>
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
  );
}

// Small helper so callers can build the empty-state CTA without importing Plus themselves.
export function CreateCompetitionLink({ className = "" }) {
  return (
    <Link
      to="/organizer/competitions/new"
      className={`inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-text-primary text-xs font-medium px-4 py-2 rounded-xl transition-all ${className}`}
    >
      <Plus className="w-3.5 h-3.5" />
      <span>Create New Competition</span>
    </Link>
  );
}