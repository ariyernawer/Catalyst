import { CompetitionCard } from "./CompetitionCard";

export function CompetitionGrid({ competitions, onSelect, onClearFilters, onToggleBookmark }) {  if (competitions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-card bg-surface py-16 text-center shadow-card">
        <p className="font-display text-lg font-semibold text-text-primary">
          No competitions match that filter
        </p>
        <p className="mt-1 text-sm text-text-muted">
          Try a different category, keyword, date range, or event type.
        </p>
        {onClearFilters && (
          <button
            type="button"
            onClick={onClearFilters}
            className="mt-4 rounded-full border border-border px-4 py-2 text-sm font-semibold text-text-secondary transition hover:border-sand hover:text-text-primary"
          >
            Clear all filters
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {competitions.map((competition) => (
        <CompetitionCard
          key={competition.id}
          competition={competition}
          onClick={onSelect ? () => onSelect(competition) : undefined}
          onToggleBookmark={onToggleBookmark ? () => onToggleBookmark(competition) : undefined}
        />
      ))}
    </div>
  );
}
