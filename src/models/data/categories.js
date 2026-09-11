// Central list of competition categories.
// When the backend is wired up, this can be replaced with a fetched list —
// keep the shape { id, label } the same so components don't need to change.

export const CATEGORIES = [
  { id: "all", label: "All" },
  { id: "hackathon", label: "Hackathon" },
  { id: "innovation", label: "Innovation" },
  { id: "business", label: "Business" },
  { id: "programming", label: "Programming" },
  { id: "olympiad", label: "Olympiad" },
];
