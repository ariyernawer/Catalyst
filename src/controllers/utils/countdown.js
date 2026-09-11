// Turns an ISO deadline string into a { days, hours, minutes, seconds, isPast }
// breakdown. Pure function, no React — the hook below is the only thing
// that calls it on an interval.

export function getTimeRemaining(deadlineIso) {
  const total = new Date(deadlineIso).getTime() - Date.now();

  if (total <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true };
  }

  const days = Math.floor(total / (1000 * 60 * 60 * 24));
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((total / (1000 * 60)) % 60);
  const seconds = Math.floor((total / 1000) % 60);

  return { days, hours, minutes, seconds, isPast: false };
}

export function pad(value) {
  return String(value).padStart(2, "0");
}
