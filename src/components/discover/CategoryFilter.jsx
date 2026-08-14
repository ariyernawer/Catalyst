import { cn } from "../../utils/cn";

/**
 * @param {{ id: string, label: string }[]} categories
 * @param {string} activeId
 * @param {(id: string) => void} onChange
 */
export function CategoryFilter({ categories, activeId, onChange }) {
  return (
    <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0">
      {categories.map(({ id, label }) => {
        const isActive = id === activeId;
        return (
          <button
            key={id}
            type="button"
            onClick={() => onChange(id)}
            className={cn(
              "shrink-0 rounded-full px-5 py-2 text-sm font-medium transition-colors",
              isActive
                ? "bg-danger text-text-primary"
                : "bg-surface text-text-secondary hover:text-text-primary"
            )}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
