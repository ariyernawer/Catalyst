/**
 * @param {string} name - display name, e.g. "Rafsan"
 * @param {number} deadlineCount - deadlines coming up this week
 */
export function WelcomeBanner({ name, deadlineCount = 0 }) {
  const greeting = getGreeting();

  return (
    <div className="flex h-full flex-col justify-center rounded-card bg-surface p-6 shadow-card sm:p-8">
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
