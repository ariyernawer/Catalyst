import { Badge } from "../ui/Badge";
import { BookmarkButton } from "../ui/BookmarkButton";
import { CountdownTimer } from "./CountdownTimer";
import { CATEGORIES } from "../../constants/categories";


export function CompetitionCard({ competition }) {
  const {
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
    <article className="competition-card group relative flex flex-col overflow-hidden rounded-card bg-surface shadow-card motion-reduce:transition-none motion-reduce:hover:transform-none">
      <div className="relative block aspect-[16/10] w-full overflow-hidden text-left">
        <img
          src={coverImage}
          alt=""
          className="h-full w-full object-cover transition duration-500 ease-out group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

        <div className="absolute left-3 top-3">
          <Badge variant="category">{categoryLabel}</Badge>
        </div>

      <div className="absolute right-3 top-3 flex items-center gap-2">
          {isHot && <Badge variant="hot">Hot</Badge>}
          <BookmarkButton isBookmarked={isBookmarked} />
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
      </div>

      <div className="relative flex flex-1 flex-col gap-3 p-5 transition-transform duration-300 group-hover:-translate-y-0.5">
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
