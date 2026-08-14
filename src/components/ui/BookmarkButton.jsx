import { Heart } from "lucide-react";
import { cn } from "../../utils/cn";

/**
 * Purely presentational — the parent owns `isBookmarked` state so that
 * swapping to a real "toggle bookmark" API call later only touches
 * whichever component holds that state, not this one.
 */
export function BookmarkButton({ isBookmarked, onToggle, className }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={isBookmarked}
      aria-label={isBookmarked ? "Remove bookmark" : "Add bookmark"}
      className={cn(
        "flex h-8 w-8 items-center justify-center rounded-full bg-bg/50 backdrop-blur-sm transition-colors hover:bg-bg/70",
        className
      )}
    >
      <Heart
        size={16}
        className={isBookmarked ? "fill-danger text-danger" : "text-text-primary"}
      />
    </button>
  );
}
