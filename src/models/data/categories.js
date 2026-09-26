
export const CATEGORY_OPTIONS = [
  { id: "hackathon", label: "Hackathon", aliases: ["Hackathons"] },
  { id: "innovation", label: "Innovation" },
  { id: "business", label: "Business" },
  { id: "programming", label: "Programming" },
  { id: "technology", label: "Technology" },
  { id: "case-competition", label: "Case Competition" },
  { id: "entrepreneurship", label: "Entrepreneurship" },
  { id: "design", label: "Design" },
  { id: "science", label: "Science" },
  { id: "olympiad", label: "Olympiad", aliases: ["Olympiads"] },
  { id: "other", label: "Other" },
];

export const CATEGORIES = [
  { id: "all", label: "All" },
  ...CATEGORY_OPTIONS,
];

export const CATEGORY_VALUES = CATEGORY_OPTIONS.map(({ label }) => label);
export const EDUCATION_LEVELS = ["School", "College", "University", "Graduate", "Open to All"];
export const EVENT_TYPES = ["Online", "Offline", "Hybrid"];

function normalizeCategory(value) {
  return String(value ?? "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function categoryValues(entry) {
  return [entry.id, entry.label, ...(entry.aliases || [])].map(normalizeCategory);
}

/** Return a display label for an API category value, with a safe fallback. */
export function getCategoryLabel(category) {
  const normalized = normalizeCategory(category);
  const match = CATEGORY_OPTIONS.find((entry) => categoryValues(entry).includes(normalized));
  return match?.label || category || "Other";
}

/** Check whether an API category value belongs to the selected chip. */
export function categoryMatches(category, selectedId) {
  if (!selectedId || selectedId === "all") return true;

  const selected = CATEGORIES.find((entry) => entry.id === selectedId);
  if (!selected) return false;

  const normalized = normalizeCategory(category);
  return categoryValues(selected).includes(normalized);
}
