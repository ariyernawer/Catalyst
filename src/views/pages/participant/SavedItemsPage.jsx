import { useNavigate } from "react-router-dom";
import { CompetitionGrid } from "../../components/discover/CompetitionGrid";
import { DashboardLayout } from "../../components/layout/DashboardLayout";
import { MOCK_COMPETITIONS } from "../../../models/data/mockCompetitions";
import { useAuthContext } from "../../../models/contexts/useAuthContext";

const savedCompetitions = MOCK_COMPETITIONS.filter(
  (competition) => competition.isBookmarked
);

export default function SavedItemsPage() {
  const navigate = useNavigate();
  const { user } = useAuthContext();

  const goToPage = (id) => {
    if (id === "bookmarks") return navigate("/saved");
    if (id === "upcoming") return navigate("/upcoming");
    if (id === "profile") return navigate("/profile");
    return navigate("/discover");
  };

  return (
    <DashboardLayout
      activeNavId="bookmarks"
      onNavigate={goToPage}
      bookmarkCount={savedCompetitions.length}
      user={user}
      pageTitle="Saved items"
      pageSubtitle="Competitions saved for later"
    >
      <CompetitionGrid competitions={savedCompetitions} />
    </DashboardLayout>
  );
}