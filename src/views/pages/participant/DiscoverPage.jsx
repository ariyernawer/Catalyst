import { Heart, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { CategoryFilter } from "../../components/discover/CategoryFilter";
import { CompetitionGrid } from "../../components/discover/CompetitionGrid";
import { DeadlineBanner } from "../../components/discover/DeadlineBanner";
import { StatCard } from "../../components/ui/StatCard";
import { WelcomeBanner } from "../../components/discover/WelcomeBanner";
import { DashboardLayout } from "../../components/layout/DashboardLayout";
import { CATEGORIES } from "../../../models/data/categories";
import { MOCK_COMPETITIONS, MOCK_DASHBOARD_STATS } from "../../../models/data/mockCompetitions";
import { getTimeRemaining } from "../../../controllers/utils/countdown";
import { useAuthContext } from "../../../models/contexts/useAuthContext";

const savedCompetitions = MOCK_COMPETITIONS.filter((competition) => competition.isBookmarked);
const featuredDeadline = savedCompetitions[0]
  ? { ...savedCompetitions[0], daysLeft: getTimeRemaining(savedCompetitions[0].deadline).days }
  : null;

export default function DiscoverPage() {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const goToPage = (id) => navigate(id === "bookmarks" ? "/saved" : id === "upcoming" ? "/upcoming" : id === "profile" ? "/profile" : "/discover");

  const firstName = user?.fullname?.split(" ")[0] || "there";
  const upcomingThisWeek = MOCK_COMPETITIONS.filter((c) => {
    const { days, isPast } = getTimeRemaining(c.deadline);
    return !isPast && days <= 7;
  }).length;

  return (
    <DashboardLayout activeNavId="discover" onNavigate={goToPage} bookmarkCount={savedCompetitions.length} user={user} pageTitle="Discover" pageSubtitle={`${MOCK_COMPETITIONS.length} competitions found`}>
      <div className="space-y-6">
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          <div className="lg:col-span-2"><WelcomeBanner name={firstName} deadlineCount={upcomingThisWeek} /></div>
          <StatCard icon={Heart} value={savedCompetitions.length} label="Bookmarked" accent="danger" />
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <StatCard icon={Sparkles} value={MOCK_DASHBOARD_STATS.newThisWeek} label="New this week" />
          {featuredDeadline && <DeadlineBanner competition={featuredDeadline} onView={() => navigate("/upcoming")} />}
        </div>
        <CategoryFilter categories={CATEGORIES} activeId="all" onChange={() => {}} />
        <CompetitionGrid competitions={MOCK_COMPETITIONS} />
      </div>
    </DashboardLayout>
  );
}