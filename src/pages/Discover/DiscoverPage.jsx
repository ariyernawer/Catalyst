import { useMemo, useState } from "react";
import { Heart, Sparkles } from "lucide-react";
import { DashboardLayout } from "../../components/layout/DashboardLayout";
import { WelcomeBanner } from "../../components/discover/WelcomeBanner";
import { StatCard } from "../../components/discover/SetCard";
import { DeadlineBanner } from "../../components/discover/DeadlineBanner";
import { CategoryFilter } from "../../components/discover/CategoryFilter";
import { CompetitionGrid } from "../../components/discover/CompetitionGrid";
import { CATEGORIES } from "../../constants/categories";
import { MOCK_COMPETITIONS, MOCK_DASHBOARD_STATS } from "../../constants/mockCompetitions";
import { getTimeRemaining } from "../../utils/countdown";

// ---------------------------------------------------------------------------
// NOTE for wiring up the backend later:
// Everything below `useState` in this component is local/mock. When the API
// is ready, replace:
//   - `competitions` state -> a fetch/query hook (e.g. useCompetitions())
//   - `handleToggleBookmark` -> an actual mutation call, keep the optimistic
//     local update as-is and just add the API call alongside it
//   - `currentUser` -> whatever your auth context provides
// The components themselves (CompetitionGrid, StatCard, etc.) don't know or
// care where the data came from, so none of them need to change.
// ---------------------------------------------------------------------------

const currentUser = { name: "Rafsan" };

export function DiscoverPage() {
  const [competitions, setCompetitions] = useState(MOCK_COMPETITIONS);
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchValue, setSearchValue] = useState("");

  const filteredCompetitions = useMemo(() => {
    return competitions.filter((competition) => {
      const matchesCategory =
        activeCategory === "all" || competition.category === activeCategory;
      const matchesSearch = competition.title
        .toLowerCase()
        .includes(searchValue.trim().toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [competitions, activeCategory, searchValue]);

  const bookmarkedCompetitions = useMemo(
    () => competitions.filter((competition) => competition.isBookmarked),
    [competitions]
  );

  const featuredDeadline = useMemo(() => {
    const soonest = bookmarkedCompetitions
      .map((competition) => ({
        ...competition,
        daysLeft: getTimeRemaining(competition.deadline).days,
      }))
      .sort((a, b) => a.daysLeft - b.daysLeft)[0];
    return soonest;
  }, [bookmarkedCompetitions]);

  function handleToggleBookmark(id) {
    setCompetitions((previous) =>
      previous.map((competition) =>
        competition.id === id
          ? { ...competition, isBookmarked: !competition.isBookmarked }
          : competition
      )
    );
  }

  function handleOpenCompetition(id) {
    // Placeholder until a detail route exists.
    console.log("open competition", id);
  }

  return (
    <DashboardLayout
      activeNavId="discover"
      onNavigate={(id) => console.log("navigate to", id)}
      bookmarkCount={bookmarkedCompetitions.length}
      user={currentUser}
      pageTitle="Discover"
      pageSubtitle={`${filteredCompetitions.length} competitions found`}
      searchValue={searchValue}
      onSearchChange={setSearchValue}
      notificationCount={3}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <WelcomeBanner name={currentUser.name} deadlineCount={MOCK_DASHBOARD_STATS.upcomingDeadlines} />
          </div>
          <StatCard icon={Heart} value={bookmarkedCompetitions.length} label="Bookmarked" accent="danger" />
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <StatCard icon={Sparkles} value={MOCK_DASHBOARD_STATS.newThisWeek} label="New this week" />
          {featuredDeadline && (
            <div className="sm:col-span-1">
              <DeadlineBanner
                competition={featuredDeadline}
                onView={() => handleOpenCompetition(featuredDeadline.id)}
              />
            </div>
          )}
        </div>

        <CategoryFilter
          categories={CATEGORIES}
          activeId={activeCategory}
          onChange={setActiveCategory}
        />

        <CompetitionGrid
          competitions={filteredCompetitions}
          onToggleBookmark={handleToggleBookmark}
          onOpen={handleOpenCompetition}
        />
      </div>
    </DashboardLayout>
  );
}
