import { useEffect, useState } from "react";
import { getTimeRemaining } from "../utils/countdown";


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
