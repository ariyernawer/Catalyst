/**
 * @param {string} name - display name, e.g. "Rafsan"
 * @param {number} deadlineCount - deadlines coming up this week
 */
export function WelcomeBanner({ name, deadlineCount = 0 }) {
  const greeting = getGreeting();

  return (
    <div className="relative flex h-full flex-col justify-center overflow-hidden rounded-card bg-surface p-6 shadow-card after:pointer-events-none after:absolute after:-right-28 after:-top-36 after:h-60 after:w-60 after:rounded-full after:bg-radial after:from-sand/20 after:to-transparent after:to-68% sm:p-8">
      <p className="text-xs font-semibold uppercase tracking-widest text-danger">{greeting}</p>
      <h2 className="mt-2 font-display text-2xl font-bold text-text-primary sm:text-3xl">
        Welcome back, {name}.
      </h2>
      {deadlineCount > 0 && (
        <p className="mt-2 text-sm text-text-secondary">
          You have <span className="font-semibold text-text-primary">{deadlineCount} deadlines</span>{" "}
          coming up this week. Don't miss them.
        </p>
      )}
    </div>
  );
}

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}