import { AlarmClock, ArrowRight, CalendarDays, CheckCircle2, Clock3 } from "lucide-react";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { DashboardLayout } from "../../components/layout/DashboardLayout";
import { BookmarkButton } from "../../components/ui/BookmarkButton";
import { useBookmarks } from "../../hooks/useBookmarks";
import { getTimeRemaining } from "../../utils/countdown";
import { useAuth } from "../../hooks/useAuth";

const navigateTo = (navigate, id) => navigate(id === "bookmarks" ? "/saved" : id === "upcoming" ? "/upcoming" : id === "profile" ? "/profile" : "/discover");

function formatDeadline(date) {
  return new Intl.DateTimeFormat("en", { weekday: "short", month: "short", day: "numeric", hour: "numeric", minute: "2-digit" }).format(new Date(date));
}

export function UpcomingPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { competitions, bookmarkedCompetitions, toggleBookmark } = useBookmarks();
  const upcoming = useMemo(() => [...competitions].sort((a, b) => new Date(a.deadline) - new Date(b.deadline)), [competitions]);
  const urgentCount = upcoming.filter((competition) => getTimeRemaining(competition.deadline).days <= 7).length;

  return (
    <DashboardLayout activeNavId="upcoming" onNavigate={(id) => navigateTo(navigate, id)} bookmarkCount={bookmarkedCompetitions.length} user={user} pageTitle="Upcoming deadlines" pageSubtitle="Plan ahead and never miss an opportunity" notificationCount={3}>
      <div className="space-y-6">
        <section className="deadline-hero overflow-hidden rounded-card border border-danger/30 bg-surface p-5 shadow-card sm:p-7">
          <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-danger/15 text-danger"><AlarmClock size={24} /></span>
              <div><p className="text-xs font-bold uppercase tracking-[0.18em] text-danger">Stay ahead</p><h2 className="mt-1 font-display text-xl font-bold text-text-primary sm:text-2xl">{urgentCount} deadline{urgentCount === 1 ? "" : "s"} coming up this week</h2><p className="mt-1 text-sm text-text-secondary">Save the ones you want to return to before time runs out.</p></div>
            </div>
            <button type="button" onClick={() => navigate("/saved")} className="group inline-flex shrink-0 items-center justify-center gap-2 rounded-full border border-sand/50 bg-sand/10 px-5 py-2.5 text-sm font-semibold text-sand transition-all hover:-translate-y-0.5 hover:border-sand hover:bg-sand hover:text-bg">View saved <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" /></button>
          </div>
        </section>

        <section className="grid gap-3 sm:grid-cols-3">
          <div className="interactive-panel rounded-2xl bg-surface p-4"><Clock3 className="text-danger" size={19} /><p className="mt-4 font-display text-3xl font-bold text-text-primary">{urgentCount}</p><p className="text-xs font-semibold uppercase tracking-widest text-text-muted">Due in 7 days</p></div>
          <div className="interactive-panel rounded-2xl bg-surface p-4"><CheckCircle2 className="text-sand" size={19} /><p className="mt-4 font-display text-3xl font-bold text-text-primary">{bookmarkedCompetitions.length}</p><p className="text-xs font-semibold uppercase tracking-widest text-text-muted">Saved for later</p></div>
          <div className="interactive-panel rounded-2xl bg-surface p-4"><CalendarDays className="text-sand" size={19} /><p className="mt-4 font-display text-3xl font-bold text-text-primary">{upcoming.length}</p><p className="text-xs font-semibold uppercase tracking-widest text-text-muted">Open opportunities</p></div>
        </section>

        <section className="space-y-3">
          {upcoming.map((competition, index) => {
            const remaining = getTimeRemaining(competition.deadline);
            const urgent = remaining.days <= 7;
            return <article key={competition.id} className="deadline-row group animate-fade-up rounded-card border border-border bg-surface p-4 shadow-card sm:p-5" style={{ animationDelay: `${index * 55}ms` }}>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <img src={competition.coverImage} alt="" className="h-20 w-full rounded-xl object-cover transition-transform duration-500 group-hover:scale-[1.03] sm:w-32" />
                <div className="min-w-0 flex-1"><div className="flex flex-wrap items-center gap-2"><span className={urgent ? "rounded-full bg-danger/15 px-2.5 py-1 text-xs font-bold text-danger" : "rounded-full bg-sand/15 px-2.5 py-1 text-xs font-bold text-sand"}>{urgent ? "Closing soon" : "Upcoming"}</span><span className="text-xs text-text-muted">{competition.organizer}</span></div><h2 className="mt-2 truncate font-display text-lg font-semibold text-text-primary">{competition.title}</h2><p className="mt-1 flex items-center gap-1.5 text-sm text-text-secondary"><CalendarDays size={14} /> {formatDeadline(competition.deadline)}</p></div>
                <div className="flex items-center justify-between gap-4 border-t border-border pt-3 sm:border-t-0 sm:border-l sm:pl-5 sm:pt-0"><div className="text-right"><p className={urgent ? "font-display text-xl font-bold text-danger" : "font-display text-xl font-bold text-sand"}>{remaining.days}d {remaining.hours}h</p><p className="text-xs text-text-muted">remaining</p></div><BookmarkButton isBookmarked={competition.isBookmarked} onToggle={() => toggleBookmark(competition.id)} /></div>
              </div>
            </article>;
          })}
        </section>
      </div>
    </DashboardLayout>
  );
}
