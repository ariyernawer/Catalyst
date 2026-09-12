import { Link } from "react-router-dom";
import { useOrganizer } from "../../../models/contexts/useOrganizer";
import { Trophy, FileText, Bookmark, Calendar, TrendingUp, Plus, ArrowRight } from "lucide-react";
import { StatCard } from "../../components/ui/StatCard";
import { CompetitionsTable } from "../../components/organizer/CompetitionsTable";

export default function OrganizerDashboardPage() {
  const {
    organizer, competitions, publishedCount, draftCount,
    totalBookmarks, upcomingEventsCount,
  } = useOrganizer();

  const formatStat = (num) => (num < 10 ? `0${num}` : `${num}`);

  const greetingName = organizer.contactPerson?.split(' ')[0] || organizer.name?.split(' ')[0] || organizer.organizationName || 'Organizer';

  // Dynamic top competition or clean state
  const topCompetition = competitions.find(c => c.status === 'Published' && (c.bookmarks || 0) > 0) || competitions[0];

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Welcome Hero Card */}
      <div className="bg-surface border border-border rounded-card p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-card relative overflow-hidden">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-sand">
            ORGANIZER DASHBOARD
          </p>
          <h1 className="font-display text-3xl sm:text-4xl text-text-primary font-normal tracking-tight mt-1">
            Welcome back, <em className="italic font-normal">{greetingName}.</em>
          </h1>
          <p className="text-xs sm:text-sm text-text-secondary mt-1.5 max-w-xl">
            Create opportunities. Reach ambitious student innovators worldwide.
          </p>
        </div>

        <Link
          to="/organizer/competitions/new"
          className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent-hover text-text-primary px-5 py-3 rounded-xl text-xs sm:text-sm font-medium transition-all shadow-lg hover:shadow-stone-950/50 active:scale-[0.98] shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Create Competition</span>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        <StatCard variant="detailed" icon={Trophy} label="Published" value={formatStat(publishedCount)} subNote={`${publishedCount} active`} />
        <StatCard variant="detailed" icon={FileText} label="Drafts" value={formatStat(draftCount)} subNote={draftCount > 0 ? "Ready to publish" : "No drafts"} />
        <StatCard
          variant="detailed"
          icon={Bookmark}
          label="Total Bookmarks"
          value={totalBookmarks > 1000 ? `${(totalBookmarks / 1000).toFixed(1)}k` : totalBookmarks}
          subNote="Across all competitions"
        />
        <StatCard variant="detailed" icon={Calendar} label="Upcoming Events" value={formatStat(upcomingEventsCount)} subNote={`${upcomingEventsCount} scheduled`} />
      </div>

      {/* Engagement Trending Info Banner */}
      <div className="bg-surface border border-border rounded-card p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-bg border border-border flex items-center justify-center text-sand shrink-0">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            {topCompetition ? (
              <>
                <p className="text-sm font-medium text-text-primary">
                  {topCompetition.title} has <span className="font-semibold text-sand">{topCompetition.bookmarks || 0} bookmarks</span>
                </p>
                <p className="text-xs text-text-secondary">
                  {topCompetition.category} · {topCompetition.eventType || 'Online'}
                </p>
              </>
            ) : (
              <>
                <p className="text-sm font-medium text-text-primary">
                  Ready to launch your next opportunity?
                </p>
                <p className="text-xs text-text-secondary">
                  Create and publish a competition to start receiving bookmarks from students.
                </p>
              </>
            )}
          </div>
        </div>

        <Link
          to="/organizer/competitions"
          className="inline-flex items-center gap-1.5 bg-accent hover:bg-accent-hover text-text-primary text-xs font-medium px-4 py-2 rounded-xl transition-all shadow-xs self-start sm:self-auto cursor-pointer"
        >
          <span>View all</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Competitions Table Section */}
      <div className="space-y-4">
        <div>
          <h2 className="font-display text-2xl text-text-primary font-medium">Your Competitions</h2>
          <p className="text-xs text-text-secondary mt-0.5">Manage your published opportunities and drafts.</p>
        </div>
        <CompetitionsTable competitions={competitions} />
      </div>
    </div>
  );
}