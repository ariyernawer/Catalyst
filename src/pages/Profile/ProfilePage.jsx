import { BellRing, Check, Mail, MapPin, Pencil, ShieldCheck, UserRound } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DashboardLayout } from "../../components/layout/DashboardLayout";
import { useBookmarks } from "../../hooks/useBookmarks";
import { useAuth } from "../../hooks/useAuth";

const navigateTo = (navigate, id) => navigate(id === "bookmarks" ? "/saved" : id === "upcoming" ? "/upcoming" : id === "profile" ? "/profile" : "/discover");

export function ProfilePage() {
  const navigate = useNavigate();
  const { bookmarkedCompetitions } = useBookmarks();
  const { user, updateUser } = useAuth();
  const [profile, setProfile] = useState(user);
  const [editing, setEditing] = useState(false);
  const [saved, setSaved] = useState(false);
  const [notifications, setNotifications] = useState({ deadline: true, newMatches: true });
  const update = (key, value) => setProfile((previous) => ({ ...previous, [key]: value }));
  const saveProfile = () => { updateUser(profile); setEditing(false); setSaved(true); window.setTimeout(() => setSaved(false), 2600); };

  return (
    <DashboardLayout activeNavId="profile" onNavigate={(id) => navigateTo(navigate, id)} bookmarkCount={bookmarkedCompetitions.length} user={user} pageTitle="Your profile" pageSubtitle="Manage your account and opportunity preferences" notificationCount={3}>
      <div className="grid gap-6 lg:grid-cols-[0.85fr_1.55fr]">
        <aside className="profile-identity rounded-card border border-border bg-surface p-6 shadow-card sm:p-7"><div className="flex items-center gap-4 lg:flex-col lg:items-start"><span className="profile-avatar flex h-20 w-20 shrink-0 items-center justify-center rounded-3xl bg-sand font-display text-3xl font-bold text-bg">{profile.name.charAt(0)}</span><div><p className="font-display text-2xl font-bold text-text-primary">{profile.name}</p><p className="mt-1 flex items-center gap-1.5 text-sm text-text-muted"><MapPin size={14} /> {profile.location}</p></div></div><p className="mt-6 border-t border-border pt-5 text-sm leading-relaxed text-text-secondary">{profile.bio}</p><div className="mt-6 grid grid-cols-2 gap-3"><div className="rounded-2xl bg-bg p-3"><p className="font-display text-2xl font-bold text-sand">{bookmarkedCompetitions.length}</p><p className="text-xs text-text-muted">Saved items</p></div><div className="rounded-2xl bg-bg p-3"><p className="font-display text-2xl font-bold text-text-primary">12</p><p className="text-xs text-text-muted">Applications</p></div></div></aside>
        <div className="space-y-6">
          <section className="rounded-card border border-border bg-surface p-5 shadow-card sm:p-7"><div className="flex items-center justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-[0.18em] text-sand">Account details</p><h2 className="mt-1 font-display text-xl font-bold text-text-primary">Personal information</h2></div><button type="button" onClick={() => editing ? saveProfile() : setEditing(true)} className="inline-flex items-center gap-2 rounded-full border border-sand/50 px-4 py-2 text-sm font-semibold text-sand transition-all hover:-translate-y-0.5 hover:bg-sand hover:text-bg">{editing ? <><Check size={16} /> Save</> : <><Pencil size={15} /> Edit</>}</button></div>{saved && <p className="mt-4 flex items-center gap-2 rounded-xl bg-sand/10 px-3 py-2 text-sm text-sand"><Check size={15} /> Profile saved successfully</p>}<div className="mt-6 grid gap-4 sm:grid-cols-2">{[["name", "Full name", UserRound], ["email", "Email address", Mail], ["location", "Location", MapPin]].map(([key, label, Icon]) => <label key={key} className={key === "location" ? "sm:col-span-2" : ""}><span className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-text-muted"><Icon size={13} /> {label}</span><input disabled={!editing} value={profile[key]} onChange={(event) => update(key, event.target.value)} className="w-full rounded-xl border border-border bg-bg px-3.5 py-3 text-sm text-text-primary outline-none transition focus:border-sand focus:ring-2 focus:ring-sand/15 disabled:cursor-default disabled:opacity-80" /></label>)}<label className="sm:col-span-2"><span className="mb-1.5 block text-xs font-semibold text-text-muted">About you</span><textarea disabled={!editing} value={profile.bio} onChange={(event) => update("bio", event.target.value)} rows="3" className="w-full resize-none rounded-xl border border-border bg-bg px-3.5 py-3 text-sm text-text-primary outline-none transition focus:border-sand focus:ring-2 focus:ring-sand/15 disabled:cursor-default disabled:opacity-80" /></label></div></section>
          <section className="rounded-card border border-border bg-surface p-5 shadow-card sm:p-7"><div className="flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-danger/15 text-danger"><BellRing size={19} /></span><div><h2 className="font-display text-xl font-bold text-text-primary">Notifications</h2><p className="text-sm text-text-muted">Choose what Catalyst should remind you about.</p></div></div><div className="mt-5 divide-y divide-border">{[["deadline", "Deadline reminders", "Get an alert before saved opportunities close."], ["newMatches", "New opportunities", "Hear about new competitions that match your interests."]].map(([key, title, description]) => <div key={key} className="flex items-center justify-between gap-4 py-4"><div><p className="text-sm font-semibold text-text-primary">{title}</p><p className="mt-0.5 text-xs text-text-muted">{description}</p></div><button type="button" aria-pressed={notifications[key]} onClick={() => setNotifications((previous) => ({ ...previous, [key]: !previous[key] }))} className={`relative h-7 w-12 rounded-full transition-colors ${notifications[key] ? "bg-sand" : "bg-border"}`}><span className={`absolute top-1 h-5 w-5 rounded-full bg-bg shadow transition-transform ${notifications[key] ? "translate-x-6" : "translate-x-1"}`} /></button></div>)}</div></section>
          <section className="flex items-center gap-3 rounded-card border border-sand/20 bg-sand/5 p-5"><ShieldCheck className="shrink-0 text-sand" size={25} /><p className="text-sm text-text-secondary">Your profile details are only used to personalize your Catalyst experience.</p></section>
        </div>
      </div>
    </DashboardLayout>
  );
}
