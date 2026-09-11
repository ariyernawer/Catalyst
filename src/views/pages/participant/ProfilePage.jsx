import { BellRing, Mail, MapPin, ShieldCheck, UserRound } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { DashboardLayout } from "../../components/layout/DashboardLayout";
import { useAuthContext } from "../../../models/contexts/AuthContext";
import { MOCK_COMPETITIONS } from "../../../models/data/mockCompetitions";

export default function ProfilePage() {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const savedCount = MOCK_COMPETITIONS.filter((competition) => competition.isBookmarked).length;
  const goToPage = (id) => navigate(id === "bookmarks" ? "/saved" : id === "upcoming" ? "/upcoming" : id === "profile" ? "/profile" : "/discover");

  const fullname = user?.fullname || "Participant";
  const email = user?.email || "you@example.com";
  const phone = user?.phoneNumber || "—";
  const education = user?.education || "—";
  const initial = fullname.charAt(0).toUpperCase();

  return (
    <DashboardLayout activeNavId="profile" onNavigate={goToPage} bookmarkCount={savedCount} user={user} pageTitle="Your profile" pageSubtitle="Your participant account" notificationCount={3}>
      <div className="grid gap-6 lg:grid-cols-[0.85fr_1.55fr]">
        <aside className="rounded-card border border-border bg-surface p-6 shadow-card sm:p-7">
          <div className="flex items-center gap-4">
            <span className="flex h-20 w-20 items-center justify-center rounded-3xl bg-sand font-display text-3xl font-bold text-bg">{initial}</span>
            <div>
              <p className="font-display text-2xl font-bold text-text-primary">{fullname}</p>
              <p className="mt-1 flex items-center gap-1.5 text-sm text-text-muted"><MapPin size={14} /> Bangladesh</p>
            </div>
          </div>
          <p className="mt-6 border-t border-border pt-5 text-sm leading-relaxed text-text-secondary">Building thoughtful ideas, one challenge at a time.</p>
          <div className="mt-6 grid grid-cols-2 gap-3">
            <div className="rounded-2xl bg-bg p-3">
              <p className="font-display text-2xl font-bold text-sand">{savedCount}</p>
              <p className="text-xs text-text-muted">Saved items</p>
            </div>
            <div className="rounded-2xl bg-bg p-3">
              <p className="font-display text-2xl font-bold text-text-primary">12</p>
              <p className="text-xs text-text-muted">Applications</p>
            </div>
          </div>
        </aside>
        <div className="space-y-6">
          <section className="rounded-card border border-border bg-surface p-5 shadow-card sm:p-7">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-sand">Account details</p>
            <h2 className="mt-1 font-display text-xl font-bold text-text-primary">Personal information</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <Info icon={UserRound} label="Full name" value={fullname} />
              <Info icon={Mail} label="Email address" value={email} />
              <Info icon={BellRing} label="Phone number" value={phone} />
              <Info icon={ShieldCheck} label="Education level" value={education} />
            </div>
          </section>
        </div>
      </div>
    </DashboardLayout>
  );
}

function Info({ icon: Icon, label, value }) {
  return (
    <div>
      <p className="flex items-center gap-1.5 text-xs font-semibold text-text-muted"><Icon size={13} /> {label}</p>
      <p className="mt-2 rounded-xl border border-border bg-bg px-3.5 py-3 text-sm text-text-primary">{value}</p>
    </div>
  );
}