import { Heart, Search, SlidersHorizontal, Sparkles, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CategoryFilter } from "../../components/discover/CategoryFilter";
import { CompetitionGrid } from "../../components/discover/CompetitionGrid";
import { DeadlineBanner } from "../../components/discover/DeadlineBanner";
import { StatCard } from "../../components/ui/StatCard";
import { WelcomeBanner } from "../../components/discover/WelcomeBanner";
import { DashboardLayout } from "../../components/layout/DashboardLayout";
import {
  CATEGORIES,
  EDUCATION_LEVELS,
  EVENT_TYPES,
  categoryMatches,
} from "../../../models/data/categories";
import { competitionApi } from "../../../models/api/competitionApi";
import { getTimeRemaining } from "../../../controllers/utils/countdown";
import { useAuthContext } from "../../../models/contexts/useAuthContext";

const DEFAULT_FILTERS = {
  category: "all",
  educationLevel: "",
  eventType: "",
  dateField: "eventDate",
  fromDate: "",
  toDate: "",
};

const DATE_FIELDS = [
  { value: "eventDate", label: "Event date" },
  { value: "deadline", label: "Registration deadline" },
];

const DATE_PLACEHOLDERS = new Set(["tba", "open", "draft", "closed"]);

function normalizeText(value) {
  return String(value ?? "").trim().toLocaleLowerCase();
}

function formatDateKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function getDateKey(value) {
  if (value === null || value === undefined) return null;

  const text = String(value).trim();
  if (!text || DATE_PLACEHOLDERS.has(normalizeText(text))) return null;

  // Parse YYYY-MM-DD values as local dates so date filters do not shift by timezone.
  const dateOnly = /^(\d{4})-(\d{1,2})-(\d{1,2})(?:$|T|\s)/.exec(text);
  const date = dateOnly
    ? new Date(Number(dateOnly[1]), Number(dateOnly[2]) - 1, Number(dateOnly[3]))
    : new Date(text);

  return Number.isNaN(date.getTime()) ? null : formatDateKey(date);
}

function isRecent(createdAt) {
  const timestamp = new Date(createdAt).getTime();
  return Number.isFinite(timestamp) && timestamp > Date.now() - 7 * 24 * 60 * 60 * 1000;
}

// Maps backend event fields to the shape used by the card and filter controls.
function toCardShape(event) {
  const educationLevels = Array.isArray(event.educationLevels)
    ? event.educationLevels.filter(Boolean).map(String)
    : typeof event.educationLevels === "string"
      ? event.educationLevels.split(",").map((level) => level.trim()).filter(Boolean)
      : [];
  const organizerName =
    event.organizerName ||
    (typeof event.organizer === "string" ? event.organizer : event.organizer?.name) ||
    "Catalyst";
  const prize = Number(String(event.prizes ?? "").replace(/[^0-9.]/g, ""));

  return {
    id: event.id ?? event._id ?? "",
    title: event.title || "",
    organizer: organizerName,
    audience: educationLevels.length ? educationLevels.join(", ") : "Open to All",
    educationLevels,
    category: event.category || "Other",
    eventType: event.eventType || "",
    eventDate: event.eventDate || "",
    registrationOpens: event.registrationOpens || "",
    deadline: event.deadline || "",
    location: event.location || "",
    shortDescription: event.shortDescription || "",
    fullDescription: event.fullDescription || "",
    prizes: event.prizes || "",
    prize: Number.isFinite(prize) ? prize : 0,
    currency: "$",
    isHot: Boolean(event.isHot),
    isBookmarked: Boolean(event.isBookmarked),
    createdAt: event.createdAt || null,
    coverImage: event.banner || event.thumbnail,
    quote: null,
  };
}

function getSearchText(competition) {
  return normalizeText(
    [
      competition.title,
      competition.organizer,
      competition.category,
      competition.audience,
      ...(competition.educationLevels || []),
      competition.eventType,
      competition.location,
      competition.shortDescription,
      competition.fullDescription,
      competition.prizes,
    ]
      .filter(Boolean)
      .join(" "),
  );
}

function matchesEducationLevel(competition, selectedLevel) {
  if (!selectedLevel) return true;

  const selected = normalizeText(selectedLevel);
  const levels = (competition.educationLevels || []).map(normalizeText);
  return levels.includes(selected) || levels.includes("open to all");
}

function matchesDateRange(competition, filters) {
  if (!filters.fromDate && !filters.toDate) return true;

  const dateKey = getDateKey(competition[filters.dateField]);
  if (!dateKey) return false;

  return (
    (!filters.fromDate || dateKey >= filters.fromDate) &&
    (!filters.toDate || dateKey <= filters.toDate)
  );
}

export default function DiscoverPage() {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const [competitions, setCompetitions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({ ...DEFAULT_FILTERS });
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    let isCurrent = true;

    competitionApi
      .getPublicEvents()
      .then((res) => {
        if (!isCurrent) return;

        const events = Array.isArray(res.data) ? res.data : res.data?.items;
        setCompetitions(Array.isArray(events) ? events.map(toCardShape) : []);
      })
      .catch((error) => {
        if (isCurrent) {
          setLoadError(error?.response?.data?.message || "Unable to load competitions.");
        }
      })
      .finally(() => {
        if (isCurrent) setIsLoading(false);
      });

    return () => {
      isCurrent = false;
    };
  }, []);

  const filteredCompetitions = useMemo(() => {
    const queryTerms = normalizeText(searchQuery).split(/\s+/).filter(Boolean);

    return competitions.filter((competition) => {
      const searchText = getSearchText(competition);
      const matchesSearch =
        queryTerms.length === 0 || queryTerms.every((term) => searchText.includes(term));
      const matchesEventType =
        !filters.eventType ||
        normalizeText(competition.eventType) === normalizeText(filters.eventType);

      return (
        matchesSearch &&
        categoryMatches(competition.category, filters.category) &&
        matchesEducationLevel(competition, filters.educationLevel) &&
        matchesEventType &&
        matchesDateRange(competition, filters)
      );
    });
  }, [competitions, filters, searchQuery]);

  const updateFilter = (key, value) => {
    setFilters((current) => ({ ...current, [key]: value }));
  };

  const clearFilters = () => {
    setSearchQuery("");
    setFilters({ ...DEFAULT_FILTERS });
  };

  const hasActiveFilters = Boolean(
    searchQuery.trim() ||
      filters.category !== "all" ||
      filters.educationLevel ||
      filters.eventType ||
      filters.fromDate ||
      filters.toDate,
  );
  const activeFilterCount = [
    searchQuery.trim(),
    filters.category !== "all",
    filters.educationLevel,
    filters.eventType,
    filters.fromDate,
    filters.toDate,
  ].filter(Boolean).length;

  const goToPage = (id) =>
    navigate(
      id === "bookmarks"
        ? "/saved"
        : id === "upcoming"
          ? "/upcoming"
          : id === "profile"
            ? "/profile"
            : "/discover",
    );

  const firstName = user?.fullname?.split(" ")[0] || "there";
  const savedCompetitions = []; // bookmarks not wired to backend yet
  const featuredDeadline = null;
  const upcomingThisWeek = competitions.filter((c) => {
    const { days, isPast } = getTimeRemaining(c.deadline);
    return !isPast && days <= 7;
  }).length;
  const newThisWeek = competitions.filter((competition) => isRecent(competition.createdAt)).length;
  const pageSubtitle = isLoading
    ? "Loading competitions…"
    : loadError
      ? "Unable to load competitions"
      : hasActiveFilters
        ? `${filteredCompetitions.length} of ${competitions.length} competitions found`
        : `${competitions.length} competitions found`;

  return (
    <DashboardLayout
      activeNavId="discover"
      onNavigate={goToPage}
      bookmarkCount={savedCompetitions.length}
      user={user}
      pageTitle="Discover"
      pageSubtitle={pageSubtitle}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <WelcomeBanner name={firstName} deadlineCount={upcomingThisWeek} />
          </div>
          <StatCard
            icon={Heart}
            value={savedCompetitions.length}
            label="Bookmarked"
            accent="danger"
          />
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <StatCard icon={Sparkles} value={newThisWeek} label="New this week" />
          {featuredDeadline && (
            <DeadlineBanner
              competition={featuredDeadline}
              onView={() => navigate("/upcoming")}
            />
          )}
        </div>

        <section className="space-y-3" aria-label="Competition filters">
          <div className="flex items-center gap-2">
            <div
              className="min-w-0 flex-1"
              role="group"
              aria-label="Filter competitions by category"
            >
              <CategoryFilter
                categories={CATEGORIES}
                activeId={filters.category}
                onChange={(id) => updateFilter("category", id)}
                className="pr-1"
              />
            </div>

            <button
              type="button"
              aria-label={isFilterOpen ? "Close search and filters" : "Open search and filters"}
              aria-expanded={isFilterOpen}
              aria-controls="competition-filters-panel"
              onClick={() => setIsFilterOpen((open) => !open)}
              className="inline-flex h-10 shrink-0 items-center gap-2 rounded-full border border-border bg-surface px-3 text-xs font-semibold text-text-secondary transition hover:border-sand hover:text-text-primary"
            >
              <SlidersHorizontal size={15} />
              <span className="hidden sm:inline">Filters</span>
              {activeFilterCount > 0 && (
                <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-danger px-1.5 text-[10px] font-bold text-text-primary">
                  {activeFilterCount}
                </span>
              )}
            </button>

            {hasActiveFilters && (
              <button
                type="button"
                onClick={clearFilters}
                className="hidden shrink-0 text-xs font-semibold text-danger transition hover:text-text-primary sm:inline-flex"
              >
                Clear
              </button>
            )}
          </div>

          {isFilterOpen && (
            <section
              id="competition-filters-panel"
              className="rounded-2xl border border-border bg-surface p-4 shadow-card"
              aria-labelledby="competition-filters-heading"
            >
              <div className="mb-3 flex items-start justify-between gap-3">
                <div>
                  <h2
                    id="competition-filters-heading"
                    className="font-display text-base font-bold text-text-primary"
                  >
                    Search & filters
                  </h2>
                  <p className="mt-0.5 text-xs text-text-muted">
                    Search by keyword or narrow the results below.
                  </p>
                </div>
                <button
                  type="button"
                  aria-label="Close filters"
                  onClick={() => setIsFilterOpen(false)}
                  className="rounded-lg p-1 text-text-muted transition hover:bg-bg hover:text-text-primary"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                <label className="block sm:col-span-2 lg:col-span-3">
                  <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-text-secondary">
                    Keyword
                  </span>
                  <span className="relative block">
                    <Search
                      size={15}
                      className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-text-muted"
                    />
                    <input
                      type="search"
                      value={searchQuery}
                      onChange={(event) => setSearchQuery(event.target.value)}
                      placeholder="Search by competition name or keyword"
                      className="w-full rounded-xl border border-border bg-bg py-2.5 pl-9 pr-3 text-sm text-text-primary placeholder:text-text-muted focus:border-sand focus:outline-none focus:ring-2 focus:ring-sand/20"
                    />
                  </span>
                </label>

                <label className="block">
                  <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-text-secondary">
                    Education level
                  </span>
                  <select
                    value={filters.educationLevel}
                    onChange={(event) => updateFilter("educationLevel", event.target.value)}
                    className="w-full rounded-xl border border-border bg-bg px-3 py-2.5 text-sm text-text-primary focus:border-sand focus:outline-none focus:ring-2 focus:ring-sand/20"
                  >
                    <option value="">Any level</option>
                    {EDUCATION_LEVELS.map((level) => (
                      <option key={level} value={level} className="bg-surface text-text-primary">
                        {level}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="block">
                  <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-text-secondary">
                    Event type
                  </span>
                  <select
                    value={filters.eventType}
                    onChange={(event) => updateFilter("eventType", event.target.value)}
                    className="w-full rounded-xl border border-border bg-bg px-3 py-2.5 text-sm text-text-primary focus:border-sand focus:outline-none focus:ring-2 focus:ring-sand/20"
                  >
                    <option value="">Any type</option>
                    {EVENT_TYPES.map((type) => (
                      <option key={type} value={type} className="bg-surface text-text-primary">
                        {type}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="block">
                  <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-text-secondary">
                    Date field
                  </span>
                  <select
                    value={filters.dateField}
                    onChange={(event) => updateFilter("dateField", event.target.value)}
                    className="w-full rounded-xl border border-border bg-bg px-3 py-2.5 text-sm text-text-primary focus:border-sand focus:outline-none focus:ring-2 focus:ring-sand/20"
                  >
                    {DATE_FIELDS.map(({ value, label }) => (
                      <option key={value} value={value} className="bg-surface text-text-primary">
                        {label}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="block">
                  <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-text-secondary">
                    From
                  </span>
                  <input
                    type="date"
                    value={filters.fromDate}
                    max={filters.toDate || undefined}
                    onChange={(event) => updateFilter("fromDate", event.target.value)}
                    className="w-full rounded-xl border border-border bg-bg px-3 py-2.5 text-sm text-text-primary [color-scheme:dark] focus:border-sand focus:outline-none focus:ring-2 focus:ring-sand/20"
                  />
                </label>

                <label className="block">
                  <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-text-secondary">
                    To
                  </span>
                  <input
                    type="date"
                    value={filters.toDate}
                    min={filters.fromDate || undefined}
                    onChange={(event) => updateFilter("toDate", event.target.value)}
                    className="w-full rounded-xl border border-border bg-bg px-3 py-2.5 text-sm text-text-primary [color-scheme:dark] focus:border-sand focus:outline-none focus:ring-2 focus:ring-sand/20"
                  />
                </label>
              </div>

              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-danger transition hover:text-text-primary"
                >
                  <X size={13} /> Clear all filters
                </button>
              )}
            </section>
          )}
        </section>

        {isLoading ? (
          <div className="rounded-card bg-surface py-16 text-center text-sm text-text-muted shadow-card">
            Loading competitions…
          </div>
        ) : loadError ? (
          <div className="rounded-card bg-surface py-16 text-center shadow-card" role="alert">
            <p className="font-display text-lg font-semibold text-text-primary">
              We couldn&apos;t load competitions
            </p>
            <p className="mt-1 text-sm text-text-muted">{loadError}</p>
          </div>
        ) : (
          <CompetitionGrid
            competitions={filteredCompetitions}
            onSelect={(competition) => navigate(`/competition/${competition.id}`)}
            onClearFilters={hasActiveFilters ? clearFilters : undefined}
          />
        )}
      </div>
    </DashboardLayout>
  );
}
