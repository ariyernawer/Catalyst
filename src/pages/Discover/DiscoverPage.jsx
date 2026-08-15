import { Heart, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { CategoryFilter } from "../../components/discover/CategoryFilter";
import { CompetitionGrid } from "../../components/discover/CompetitionGrid";
import { DeadlineBanner } from "../../components/discover/DeadlineBanner";
import { StatCard } from "../../components/discover/SetCard";
import { WelcomeBanner } from "../../components/discover/WelcomeBanner";
import { DashboardLayout } from "../../components/layout/DashboardLayout";
import { CATEGORIES } from "../../constants/categories";
import { DEMO_USER } from "../../constants/demoUser";
import { MOCK_COMPETITIONS, MOCK_DASHBOARD_STATS } from "../../constants/mockCompetitions";
import { getTimeRemaining } from "../../utils/countdown";

const savedCompetitions = MOCK_COMPETITIONS.filter((competition) => competition.isBookmarked);
const featuredDeadline = { ...savedCompetitions[0], daysLeft: getTimeRemaining(savedCompetitions[0].deadline).days };

export function DiscoverPage() {
  const navigate = useNavigate();
  const goToPage = (id) => navigate(id === "bookmarks" ? "/saved" : id === "upcoming" ? "/upcoming" : id === "profile" ? "/profile" : "/discover");

  return (
    <DashboardLayout activeNavId="discover" onNavigate={goToPage} bookmarkCount={savedCompetitions.length} user={DEMO_USER} pageTitle="Discover" pageSubtitle="6 competitions found" notificationCount={3}>
      <div className="space-y-6">
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          <div className="lg:col-span-2"><WelcomeBanner name="Rafsan" deadlineCount={2} /></div>
          <StatCard icon={Heart} value={savedCompetitions.length} label="Bookmarked" accent="danger" />
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <StatCard icon={Sparkles} value={MOCK_DASHBOARD_STATS.newThisWeek} label="New this week" />
          <DeadlineBanner competition={featuredDeadline} onView={() => navigate("/upcoming")} />
        </div>
        <CategoryFilter categories={CATEGORIES} activeId="all" onChange={() => {}} />
        <CompetitionGrid competitions={MOCK_COMPETITIONS} />
      </div>
    </DashboardLayout>
  );
}
