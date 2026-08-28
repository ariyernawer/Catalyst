import { useCountdown } from "../../hooks/useCountdown";
import { pad } from "../../utils/countdown";

const UNITS = [
  { key: "days", label: "D" },
  { key: "hours", label: "H" },
  { key: "minutes", label: "M" },
  { key: "seconds", label: "S" },
];


export function CountdownTimer({ deadline }) {
  const timeLeft = useCountdown(deadline);

  if (timeLeft.isPast) {
    return <p className="text-sm font-semibold text-text-muted">Submissions closed</p>;
  }

  return (
    <div className="flex gap-3">
      {UNITS.map(({ key, label }) => (
        <div key={key} className="flex flex-col items-center">
          <span className="font-display text-lg font-bold text-danger tabular-nums">
            {pad(timeLeft[key])}
          </span>
          <span className="text-[10px] font-medium uppercase tracking-widest text-text-muted">
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}
