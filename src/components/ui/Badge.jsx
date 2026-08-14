
import { Flame } from "lucide-react";
import { cn } from "../../utils/cn";

/**
 * Small pill label.
 *
 * variant="category" -> solid sand/accent pill (top-left of a card)
 * variant="hot"       -> dark pill with a flame icon
 * variant="neutral"   -> plain outlined pill (e.g. filter bar, unselected)
 */
export function Badge({ children, variant = "neutral", className }) {
  const base =
    "inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold tracking-wide uppercase";

  const variants = {
    category: "bg-sand text-bg",
    hot: "bg-danger/90 text-text-primary",
    neutral: "bg-surface-raised text-text-secondary",
  };

  return (
    <span className={cn(base, variants[variant], className)}>
      {variant === "hot" && <Flame size={12} className="shrink-0" />}
      {children}
    </span>
  );
}
