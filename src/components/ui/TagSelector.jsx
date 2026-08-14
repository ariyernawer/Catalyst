const TAG_BASE =
  'font-body text-[0.85rem] rounded-full px-4 py-2 border transition-all duration-150 cursor-pointer';

const TAG_INACTIVE =
  'bg-surface border-border text-text-secondary ' +
  'hover:bg-surface-raised hover:border-sand hover:text-text-primary ' +
  'hover:shadow-[0_0_0_3px_rgba(219,185,140,0.22),0_0_14px_rgba(219,185,140,0.15)]';

const TAG_ACTIVE =
  'bg-sand border-sand text-bg font-semibold ' +
  'hover:shadow-[0_0_0_3px_rgba(219,185,140,0.4),0_0_18px_rgba(219,185,140,0.3)]';

/**
 * Toggleable chip group. Fully controlled: parent owns `selected`
 * and receives the updated array back through onChange.
 */
export default function TagSelector({ label, required = false, options, selected, onChange }) {
  const toggle = (value) => {
    const next = selected.includes(value)
      ? selected.filter((v) => v !== value)
      : [...selected, value];
    onChange(next);
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      <label className="text-[0.8rem] font-medium text-text-secondary">
        {label}
        {required && <span className="text-accent"> *</span>}
      </label>
      <div className="flex flex-wrap gap-2" role="group" aria-label={label}>
        {options.map((opt) => {
          const active = selected.includes(opt);
          return (
            <button
              key={opt}
              type="button"
              aria-pressed={active}
              onClick={() => toggle(opt)}
              className={`${TAG_BASE} ${active ? TAG_ACTIVE : TAG_INACTIVE}`}
            >
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}
