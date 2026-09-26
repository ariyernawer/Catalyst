import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Calendar, ExternalLink, Mail, MapPin, Trophy, Users } from "lucide-react";
import { DashboardLayout } from "../../components/layout/DashboardLayout";
import { CountdownTimer } from "../../components/discover/CountdownTimer";
import { Badge } from "../../components/ui/Badge";
import { Button } from "../../components/ui/Button";
import { competitionApi } from "../../../models/api/competitionApi";
import { useAuthContext } from "../../../models/contexts/useAuthContext";

export default function CompetitionDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const [competition, setCompetition] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    competitionApi
      .getPublicEvents()
      .then((res) => {
        const found = res.data.find((e) => (e.id || e._id) === id);
        setCompetition(found || null);
      })
      .catch(() => setCompetition(null))
      .finally(() => setLoading(false));
  }, [id]);

  const goToPage = (navId) =>
    navigate(navId === "bookmarks" ? "/saved" : navId === "upcoming" ? "/upcoming" : navId === "profile" ? "/profile" : "/discover");

  if (loading) {
    return (
      <DashboardLayout activeNavId="discover" onNavigate={goToPage} user={user} pageTitle="Loading…">
        <p className="text-sm text-text-muted">Fetching competition details…</p>
      </DashboardLayout>
    );
  }

  if (!competition) {
    return (
      <DashboardLayout activeNavId="discover" onNavigate={goToPage} user={user} pageTitle="Competition not found">
        <p className="text-sm text-text-muted">This competition doesn't exist or isn't published.</p>
        <Button variant="secondary" className="mt-4 w-auto" onClick={() => navigate("/discover")}>
          Back to Discover
        </Button>
      </DashboardLayout>
    );
  }

  const audience = Array.isArray(competition.educationLevels)
    ? competition.educationLevels.join(", ")
    : "Open to All";

  return (
    <DashboardLayout
      activeNavId="discover"
      onNavigate={goToPage}
      user={user}
      pageTitle={competition.title}
      pageSubtitle={`${competition.organizerName || "Catalyst"} · ${competition.category}`}
    >
      <div className="space-y-6">
        {/* Banner */}
        {competition.banner && (
          <div className="relative aspect-[16/7] w-full overflow-hidden rounded-card shadow-card">
            <img src={competition.banner} alt="" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 flex items-center gap-2">
              <Badge variant="category">{competition.category}</Badge>
              {competition.status === "Published" && <Badge variant="hot">Open</Badge>}
            </div>
          </div>
        )}

        {/* Deadline + actions */}
        <div className="flex flex-col gap-4 rounded-card bg-surface p-5 shadow-card sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-text-muted">Deadline</p>
            <div className="mt-2"><CountdownTimer deadline={competition.deadline} /></div>
          </div>
          <div className="flex gap-3">
            <Button variant="secondary" onClick={() => navigate("/discover")}>
              <ArrowLeft className="mr-2 inline h-4 w-4" /> Back
            </Button>
            {competition.registrationUrl ? (
              <a href={competition.registrationUrl} target="_blank" rel="noreferrer">
                <Button variant="primary">Register <ExternalLink className="ml-2 inline h-4 w-4" /></Button>
              </a>
            ) : (
              <Button variant="primary" onClick={() => navigate("/upcoming")}>Register</Button>
            )}
          </div>
        </div>

        {/* Description */}
        <section className="rounded-card bg-surface p-6 shadow-card">
          <h2 className="font-display text-lg font-bold text-text-primary">About this competition</h2>
          <p className="mt-3 text-sm leading-relaxed text-text-secondary">
            {competition.fullDescription || competition.shortDescription || "No description provided."}
          </p>
        </section>

        {/* Facts */}
        <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {competition.eventType && (
            <div className="rounded-card bg-surface p-5 shadow-card">
              <Calendar className="h-5 w-5 text-sand" />
              <p className="mt-2 text-xs font-semibold uppercase tracking-widest text-text-muted">Event type</p>
              <p className="mt-1 text-sm font-medium text-text-primary">{competition.eventType}</p>
            </div>
          )}
          {competition.eventDate && (
            <div className="rounded-card bg-surface p-5 shadow-card">
              <Calendar className="h-5 w-5 text-sand" />
              <p className="mt-2 text-xs font-semibold uppercase tracking-widest text-text-muted">Event date</p>
              <p className="mt-1 text-sm font-medium text-text-primary">{competition.eventDate}</p>
            </div>
          )}
          {competition.location && (
            <div className="rounded-card bg-surface p-5 shadow-card">
              <MapPin className="h-5 w-5 text-sand" />
              <p className="mt-2 text-xs font-semibold uppercase tracking-widest text-text-muted">Location</p>
              <p className="mt-1 text-sm font-medium text-text-primary">{competition.location}</p>
            </div>
          )}
          <div className="rounded-card bg-surface p-5 shadow-card">
            <Users className="h-5 w-5 text-sand" />
            <p className="mt-2 text-xs font-semibold uppercase tracking-widest text-text-muted">Eligibility</p>
            <p className="mt-1 text-sm font-medium text-text-primary">{audience}</p>
          </div>
          {competition.participationType && (
            <div className="rounded-card bg-surface p-5 shadow-card">
              <Users className="h-5 w-5 text-sand" />
              <p className="mt-2 text-xs font-semibold uppercase tracking-widest text-text-muted">Participation</p>
              <p className="mt-1 text-sm font-medium text-text-primary">
                {competition.participationType}
                {competition.participationType === "Team" && competition.maxTeamSize ? ` (up to ${competition.maxTeamSize})` : ""}
              </p>
            </div>
          )}
          {competition.contactEmail && (
            <div className="rounded-card bg-surface p-5 shadow-card">
              <Mail className="h-5 w-5 text-sand" />
              <p className="mt-2 text-xs font-semibold uppercase tracking-widest text-text-muted">Contact</p>
              <p className="mt-1 break-all text-sm font-medium text-text-primary">{competition.contactEmail}</p>
            </div>
          )}
        </section>

        {/* Prizes + Rules */}
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          {competition.prizes && (
            <section className="rounded-card bg-surface p-6 shadow-card">
              <h2 className="flex items-center gap-2 font-display text-lg font-bold text-text-primary">
                <Trophy className="h-5 w-5 text-sand" /> Prizes
              </h2>
              <pre className="mt-3 whitespace-pre-line font-body text-sm leading-relaxed text-text-secondary">{competition.prizes}</pre>
            </section>
          )}
          {competition.rules && (
            <section className="rounded-card bg-surface p-6 shadow-card">
              <h2 className="font-display text-lg font-bold text-text-primary">Rules</h2>
              <pre className="mt-3 whitespace-pre-line font-body text-sm leading-relaxed text-text-secondary">{competition.rules}</pre>
            </section>
          )}
        </div>

        {/* Timeline */}
        {Array.isArray(competition.timeline) && competition.timeline.length > 0 && (
          <section className="rounded-card bg-surface p-6 shadow-card">
            <h2 className="font-display text-lg font-bold text-text-primary">Timeline</h2>
            <ul className="mt-4 space-y-4">
              {competition.timeline.map((item, i) => (
                <li key={i} className="flex gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sand/15 font-display text-sm font-bold text-sand">
                    {i + 1}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-text-primary">{item.stage}</p>
                    {item.date && <p className="text-xs text-text-muted">{item.date}</p>}
                    {item.desc && <p className="mt-1 text-sm text-text-secondary">{item.desc}</p>}
                  </div>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </DashboardLayout>
  );
}