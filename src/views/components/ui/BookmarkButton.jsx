import { Heart } from "lucide-react";
import { cn } from "../../../controllers/utils/cn";

export function BookmarkButton({ isBookmarked, onToggle, className }) {
  return (
    <button
      type="button"
      aria-label={isBookmarked ? "Remove from saved" : "Save competition"}
      aria-pressed={isBookmarked}
      onClick={(event) => {
        event.stopPropagation();
        onToggle?.();
      }}
      className={cn(
        "flex h-8 w-8 items-center justify-center rounded-full bg-bg/50 backdrop-blur-sm transition-all duration-200 hover:scale-110 hover:bg-bg/70 active:scale-95",
        className
      )}
    >
      <Heart
        size={16}
        className={isBookmarked ? "animate-heart-pop fill-danger text-danger" : "text-text-primary"}
      />
    </button>
  );
}