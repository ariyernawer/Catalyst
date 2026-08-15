import { useNavigate } from "react-router-dom";
import { CompetitionGrid } from "../../components/discover/CompetitionGrid";
import { DashboardLayout } from "../../components/layout/DashboardLayout";
import { DEMO_USER } from "../../constants/demoUser";
import { MOCK_COMPETITIONS } from "../../constants/mockCompetitions";

const savedCompetitions = MOCK_COMPETITIONS.filter((competition) => competition.isBookmarked);

export function SavedItemsPage() {
  const navigate = useNavigate();
  const goToPage = (id) => navigate(id === "bookmarks" ? "/saved" : id === "upcoming" ? "/upcoming" : id === "profile" ? "/profile" : "/discover");
  return <DashboardLayout activeNavId="bookmarks" onNavigate={goToPage} bookmarkCount={savedCompetitions.length} user={DEMO_USER} pageTitle="Saved items" pageSubtitle="Competitions saved for later" notificationCount={3}><CompetitionGrid competitions={savedCompetitions} /></DashboardLayout>;
}
