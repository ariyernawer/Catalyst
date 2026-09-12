import { Heart, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CategoryFilter } from "../../components/discover/CategoryFilter";
import { CompetitionGrid } from "../../components/discover/CompetitionGrid";
import { DeadlineBanner } from "../../components/discover/DeadlineBanner";
import { StatCard } from "../../components/ui/StatCard";
import { WelcomeBanner } from "../../components/discover/WelcomeBanner";
import { DashboardLayout } from "../../components/layout/DashboardLayout";
import { CATEGORIES } from "../../../models/data/categories";
import { competitionApi } from "../../../models/api/competitionApi";
import { getTimeRemaining } from "../../../controllers/utils/countdown";
import { useAuthContext } from "../../../models/contexts/useAuthContext";

// Maps backend event fields to the shape CompetitionCard expects.
const toCardShape = (e) => ({
  id: e.id,
  title: e.title,
  organizer: e.organizerName || "Catalyst",
  audience: Array.isArray(e.educationLevels)
    ? e.educationLevels.join(", ")
    : "Open to All",
  category: e.category,
  prize: Number(String(e.prizes).replace(/[^0-9.]/g, "")) || 0,
  currency: "$",
  isHot: false,
  isBookmarked: false,
  deadline: e.deadline,
  coverImage: e.banner || e.thumbnail,
  quote: null,
});

export default function DiscoverPage() {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const [competitions, setCompetitions] = useState([]);

  useEffect(() => {
    competitionApi
      .getPublicEvents()
      .then((res) => setCompetitions(res.data.map(toCardShape)))
      .catch(() => setCompetitions([]));
  }, []);

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
  const newThisWeek = competitions.filter(
    (c) => new Date(c.createdAt) > Date.now() - 7 * 24 * 60 * 60 * 1000,
  ).length;

  return (
    <DashboardLayout
      activeNavId="discover"
      onNavigate={goToPage}
      bookmarkCount={savedCompetitions.length}
      user={user}
      pageTitle="Discover"
      pageSubtitle={`${competitions.length} competitions found`}
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
        <CategoryFilter
          categories={CATEGORIES}
          activeId="all"
          onChange={() => {}}
        />
        <CompetitionGrid
          competitions={competitions}
          onSelect={(c) => navigate(`/competition/${c.id}`)}
        />{" "}
      </div>
    </DashboardLayout>
  );
}
