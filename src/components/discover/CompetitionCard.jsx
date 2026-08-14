import { Badge } from "../ui/Badge";
import { BookmarkButton } from "../ui/BookmarkButton";
import { CountdownTimer } from "./CountdownTimer";
import { CATEGORIES } from "../../constants/categories";

/**
 * @param {object} competition - see constants/mockCompetitions.js for shape
 * @param {(id: string) => void} onToggleBookmark
 * @param {(id: string) => void} onOpen
 */
export function CompetitionCard({ competition, onToggleBookmark, onOpen }) {
  const {
    id,
    title,
    organizer,
    audience,
    category,
    prize,
    currency,
    isHot,
    isBookmarked,
    deadline,
    coverImage,
    quote,
  } = competition;

  const categoryLabel = CATEGORIES.find((entry) => entry.id === category)?.label ?? category;

  return (
    <article className="flex flex-col overflow-hidden rounded-card bg-surface shadow-card">
      <button
        type="button"
        onClick={() => onOpen?.(id)}
        className="relative block aspect-[16/10] w-full overflow-hidden text-left"
      >
        <img
          src={coverImage}
          alt=""
          className="h-full w-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

        <div className="absolute left-3 top-3">
          <Badge variant="category">{categoryLabel}</Badge>
        </div>

        <div className="absolute right-3 top-3 flex items-center gap-2">
          {isHot && <Badge variant="hot">Hot</Badge>}
          <BookmarkButton
            isBookmarked={isBookmarked}
            onToggle={(event) => {
              event.stopPropagation();
              onToggleBookmark?.(id);
            }}
          />
        </div>

        {quote ? (
          <div className="absolute inset-x-0 top-10 px-5 text-center">
            <p className="font-display text-base italic leading-snug text-text-primary sm:text-lg">
              &ldquo;{quote.text}&rdquo;
            </p>
            <p className="mt-2 text-xs font-semibold uppercase tracking-widest text-text-secondary">
              {quote.author}
            </p>
          </div>
        ) : null}

        <div className="absolute bottom-3 right-3 rounded-full bg-bg/70 px-3 py-1 text-sm font-bold text-text-primary backdrop-blur-sm">
          {currency}
          {prize.toLocaleString()}
        </div>
      </button>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div>
          <p className="text-xs text-text-muted">
            {organizer} · {audience}
          </p>
          <h3 className="mt-1 font-display text-lg font-semibold leading-snug text-text-primary">
            {title}
          </h3>
        </div>
        <div className="mt-auto border-t border-border pt-3">
          <CountdownTimer deadline={deadline} />
        </div>
      </div>
    </article>
  );
}
