import { Heart } from "lucide-react";
import { cn } from "../../utils/cn";

/**
 * Purely presentational — the parent owns `isBookmarked` state so that
 * swapping to a real "toggle bookmark" API call later only touches
 * whichever component holds that state, not this one.
 */
export function BookmarkButton({ isBookmarked, className }) {
  return (
    <span
      aria-label={isBookmarked ? "Saved competition" : "Not saved"}
      className={cn(
        "flex h-8 w-8 items-center justify-center rounded-full bg-bg/50 backdrop-blur-sm transition-all duration-200 hover:scale-110 hover:bg-bg/70 active:scale-95",
        className
      )}
    >
      <Heart
        size={16}
        className={isBookmarked ? "animate-heart-pop fill-danger text-danger" : "text-text-primary"}
      />
    </span>
  );
}
