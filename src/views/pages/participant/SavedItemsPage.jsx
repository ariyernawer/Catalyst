import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CompetitionGrid } from "../../components/discover/CompetitionGrid";
import { DashboardLayout } from "../../components/layout/DashboardLayout";
import { competitionApi } from "../../../models/api/competitionApi";
import { toCardShape } from "../../../controllers/utils/eventShape";
import { useAuthContext } from "../../../models/contexts/useAuthContext";

export default function SavedItemsPage() {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const [bookmarks, setBookmarks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isCurrent = true;

    competitionApi
      .getBookmarks()
      .then((res) => {
        if (!isCurrent) return;
        const items = Array.isArray(res.data) ? res.data : [];
        setBookmarks(items.map(toCardShape));
      })
      .catch(() => {
        if (isCurrent) setBookmarks([]);
      })
      .finally(() => {
        if (isCurrent) setIsLoading(false);
      });

    return () => {
      isCurrent = false;
    };
  }, []);

  const toggleBookmark = async (competition) => {
    try {
      await competitionApi.removeBookmark(competition.id);
      setBookmarks((current) => current.filter((item) => item.id !== competition.id));
    } catch {
      // Keep the item if the API call fails.
    }
  };

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
      bookmarkCount={bookmarks.length}
      user={user}
      pageTitle="Saved items"
      pageSubtitle="Competitions saved for later"
    >
      {isLoading ? (
        <div className="rounded-card bg-surface py-16 text-center text-sm text-text-muted shadow-card">
          Loading saved competitions…
        </div>
      ) : (
        <CompetitionGrid
          competitions={bookmarks}
          onSelect={(competition) => navigate(`/competition/${competition.id}`)}
          onToggleBookmark={toggleBookmark}
        />
      )}
    </DashboardLayout>
  );
}