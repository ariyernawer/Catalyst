import { cn } from "../../utils/cn";

/**
 * @param {import("react").ComponentType} icon - lucide icon component
 * @param {string | number} value
 * @param {string} label
 * @param {"sand" | "danger"} accent
 */
export function StatCard({ icon: Icon, value, label, accent = "sand" }) {
  const accentClass = accent === "danger" ? "text-danger" : "text-sand";

  return (
    <div className="flex h-full flex-col justify-between rounded-card bg-surface p-6 shadow-card">
      <Icon size={20} className={cn(accentClass, "fill-current/20")} />
      <div>
        <p className="font-display text-4xl font-bold text-text-primary">{value}</p>
        <p className="mt-1 text-xs font-medium uppercase tracking-widest text-text-muted">
          {label}
        </p>
      </div>
    </div>
  );
}
