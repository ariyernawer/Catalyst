import { useEffect, useState } from "react";
import { getTimeRemaining } from "../utils/countdown";

// Re-renders once a second with the remaining time until `deadlineIso`.
// Deliberately its own hook (not inlined in CountdownTimer) so any future
// component — a detail page, a notification badge — can reuse it.
export function useCountdown(deadlineIso) {
  const [timeLeft, setTimeLeft] = useState(() => getTimeRemaining(deadlineIso));

  useEffect(() => {
    const tick = () => setTimeLeft(getTimeRemaining(deadlineIso));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [deadlineIso]);

  return timeLeft;
}
