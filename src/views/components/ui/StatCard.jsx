import { cn } from "../../../controllers/utils/cn";

// Shared stat card.
// - variant="simple" (default): icon on top, value, label — used on Discover.
// - variant="detailed": label + icon header, value, optional sub-note — used on the organizer Dashboard.
export function StatCard({ icon: Icon, value, label, subNote, accent = "sand", variant = "simple", className }) {
  const accentClass = accent === "danger" ? "text-danger" : "text-sand";

  if (variant === "detailed") {
    return (
      <div className={cn("bg-surface border border-border rounded-card p-5 text-text-primary shadow-xs relative overflow-hidden group", className)}>
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-text-secondary">{label}</span>
          <Icon className={cn("w-4 h-4", accentClass)} />
        </div>
        <div className="mt-3">
          <p className="font-display text-4xl text-text-primary font-normal">{value}</p>
          {subNote && <p className={cn("text-xs mt-1", accentClass)}>{subNote}</p>}
        </div>
      </div>
    );
  }

  return (
    <div className={cn("flex h-full flex-col justify-between rounded-card bg-surface p-6 shadow-card transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_20px_38px_-24px_rgba(207,157,123,.75)] motion-reduce:transform-none", className)}>
      <Icon size={20} className={cn(accentClass, "fill-current/20")} />
      <div>
        <p className="font-display text-4xl font-bold text-text-primary">{value}</p>
        <p className="mt-1 text-xs font-medium uppercase tracking-widest text-text-muted">{label}</p>
      </div>
    </div>
  );
}