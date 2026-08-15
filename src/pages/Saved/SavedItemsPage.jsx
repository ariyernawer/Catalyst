import { Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { CompetitionGrid } from "../../components/discover/CompetitionGrid";
import { DashboardLayout } from "../../components/layout/DashboardLayout";
import { useBookmarks } from "../../hooks/useBookmarks";
import { useAuth } from "../../hooks/useAuth";

export function SavedItemsPage() {
  const navigate = useNavigate();
  const { bookmarkedCompetitions, toggleBookmark } = useBookmarks();
  const { user } = useAuth();

  return (
    <DashboardLayout
      activeNavId="bookmarks"
      onNavigate={(id) => navigate(id === "bookmarks" ? "/saved" : id === "upcoming" ? "/upcoming" : id === "profile" ? "/profile" : "/discover")}
      bookmarkCount={bookmarkedCompetitions.length}
      user={user}
      pageTitle="Saved items"
      pageSubtitle={bookmarkedCompetitions.length ? `${bookmarkedCompetitions.length} competition${bookmarkedCompetitions.length === 1 ? "" : "s"} saved for later` : "Keep track of the opportunities you care about"}
      notificationCount={3}
    >
      {bookmarkedCompetitions.length ? (
        <CompetitionGrid
          competitions={bookmarkedCompetitions}
          onToggleBookmark={toggleBookmark}
          onOpen={(id) => console.log("open competition", id)}
        />
      ) : (
        <section className="flex min-h-72 flex-col items-center justify-center rounded-card border border-border bg-surface px-6 text-center shadow-card">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-danger/15 text-danger"><Heart size={25} /></span>
          <h2 className="mt-4 font-display text-xl font-semibold text-text-primary">Nothing saved yet</h2>
          <p className="mt-2 max-w-sm text-sm text-text-muted">Tap the heart on any competition to save it here for later.</p>
          <button type="button" onClick={() => navigate("/discover")} className="mt-5 rounded-full bg-sand px-5 py-2.5 text-sm font-semibold text-bg transition-transform hover:-translate-y-0.5 hover:bg-text-primary">Explore competitions</button>
        </section>
      )}
    </DashboardLayout>
  );
}
