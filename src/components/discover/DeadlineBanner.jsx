
export function DeadlineBanner({ competition, onView }) {
  if (!competition) return null;

  return (
    <div className="relative flex flex-col gap-4 overflow-hidden rounded-card bg-surface p-5 shadow-card after:pointer-events-none after:absolute after:-right-28 after:-top-36 after:h-60 after:w-60 after:rounded-full after:bg-[radial-gradient(circle,rgba(207,157,123,.16),transparent_68%)] sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-start gap-3 sm:items-center">
        <span className="text-2xl leading-none"></span>
        <p className="text-sm text-text-secondary sm:text-base">
          <span className="font-semibold text-text-primary">{competition.title}</span> closes in{" "}
          <span className="font-semibold text-danger">{competition.daysLeft} days</span>
          <br className="sm:hidden" />
          <span className="text-text-muted"> — You've bookmarked this, don't forget to register.</span>
        </p>
      </div>
      <button
        type="button"
        onClick={onView}
        className="shrink-0 rounded-full bg-danger px-6 py-2.5 text-sm font-semibold text-text-primary transition-colors hover:bg-danger/90"
      >
        View →
      </button>
    </div>
  );
}
