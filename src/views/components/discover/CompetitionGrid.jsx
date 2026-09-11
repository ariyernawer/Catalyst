import { CompetitionCard } from "./CompetitionCard";


export function CompetitionGrid({ competitions }) {
  if (competitions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-card bg-surface py-16 text-center shadow-card">
        <p className="font-display text-lg font-semibold text-text-primary">
          No competitions match that filter
        </p>
        <p className="mt-1 text-sm text-text-muted">Try a different category or search term.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {competitions.map((competition) => (
        <CompetitionCard
          key={competition.id}
          competition={competition}
        />
      ))}
    </div>
  );
}
