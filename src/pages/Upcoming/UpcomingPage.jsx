import { AlarmClock, CalendarDays, CheckCircle2, Clock3 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { CountdownTimer } from "../../components/discover/CountdownTimer";
import { DashboardLayout } from "../../components/layout/DashboardLayout";
import { DEMO_USER } from "../../constants/demoUser";
import { MOCK_COMPETITIONS } from "../../constants/mockCompetitions";

const savedCompetitions = MOCK_COMPETITIONS.filter(
  (competition) => competition.isBookmarked
);

export function UpcomingPage() {
  const navigate = useNavigate();

  const goToPage = (id) => {
    if (id === "bookmarks") return navigate("/saved");
    if (id === "upcoming") return navigate("/upcoming");
    if (id === "profile") return navigate("/profile");
    return navigate("/discover");
  };

  return (
    <DashboardLayout
      activeNavId="upcoming"
      onNavigate={goToPage}
      bookmarkCount={savedCompetitions.length}
      user={DEMO_USER}
      pageTitle="Upcoming deadlines"
      pageSubtitle="A simple view of competition closing dates"
      notificationCount={3}
    >
      <div className="space-y-6">
        {/* Alert banner */}
        <section className="relative overflow-hidden rounded-card border border-danger/30 bg-surface p-5 shadow-card sm:p-7">
          <div className="relative flex items-start gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-danger/15 text-danger">
              <AlarmClock size={24} />
            </span>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-danger">
                Stay ahead
              </p>
              <h2 className="mt-1 font-display text-xl font-bold text-text-primary sm:text-2xl">
                Deadlines are getting closer
              </h2>
              <p className="mt-1 text-sm text-text-secondary">
                Check the countdown before you apply.
              </p>
            </div>
          </div>
        </section>

        //Stats row 
        <section className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-2xl bg-surface p-4">
            <Clock3 className="text-danger" size={19} />
            <p className="mt-4 font-display text-3xl font-bold text-text-primary">2</p>
            <p className="text-xs font-semibold uppercase tracking-widest text-text-muted">
              Due this week
            </p>
          </div>

          <div className="rounded-2xl bg-surface p-4">
            <CheckCircle2 className="text-sand" size={19} />
            <p className="mt-4 font-display text-3xl font-bold text-text-primary">
              {savedCompetitions.length}
            </p>
            <p className="text-xs font-semibold uppercase tracking-widest text-text-muted">
              Saved examples
            </p>
          </div>

          <div className="rounded-2xl bg-surface p-4">
            <CalendarDays className="text-sand" size={19} />
            <p className="mt-4 font-display text-3xl font-bold text-text-primary">
              {MOCK_COMPETITIONS.length}
            </p>
            <p className="text-xs font-semibold uppercase tracking-widest text-text-muted">
              Open opportunities
            </p>
          </div>
        </section>

        //Competition list 
        <section className="space-y-3">
          {MOCK_COMPETITIONS.map((competition) => (
            <article
              key={competition.id}
              className="rounded-card border border-border bg-surface p-4 shadow-card sm:p-5"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <img
                  src={competition.coverImage}
                  alt=""
                  className="h-20 w-full rounded-xl object-cover sm:w-32"
                />
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-text-muted">{competition.organizer}</p>
                  <h2 className="mt-1 font-display text-lg font-semibold text-text-primary">
                    {competition.title}
                  </h2>
                  <p className="mt-1 text-sm text-text-secondary">
                    Deadline: {new Date(competition.deadline).toLocaleDateString()}
                  </p>
                </div>
                <CountdownTimer deadline={competition.deadline} />
              </div>
            </article>
          ))}
        </section>
      </div>
    </DashboardLayout>
  );
}