// TEMPORARY mock data.
//
// Shape mirrors what the /competitions endpoint is expected to return, so
// swapping this file out for a real fetch later is a one-line change in
// the page/hook that consumes it — nothing in the components should need
// to change.
//
// deadline: ISO string. prize: number (smallest currency unit not needed,
// just a plain integer). isHot / isBookmarked: booleans the backend will
// eventually own.

export const MOCK_COMPETITIONS = [
  {
    id: "comp-1",
    title: "National Innovation Challenge 2026",
    organizer: "NIC Foundation",
    audience: "University",
    category: "innovation",
    prize: 12000,
    currency: "$",
    isHot: true,
    isBookmarked: false,
    deadline: "2026-08-27T18:00:00+06:00",
    coverImage:
      "https://images.unsplash.com/photo-1517842645767-c639042777db?q=80&w=800&auto=format&fit=crop",
    quote: {
      text: "Innovation happens when people are free to think, experiment and speculate.",
      author: "Matt Ridley",
    },
  },
  {
    id: "comp-2",
    title: "Global Hackathon Series – Dhaka",
    organizer: "Tech Collective BD",
    audience: "Open",
    category: "hackathon",
    prize: 8500,
    currency: "$",
    isHot: true,
    isBookmarked: true,
    deadline: "2026-08-20T18:00:00+06:00",
    coverImage:
      "https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "comp-3",
    title: "Foodpath: Urban Kitchen Business Plan",
    organizer: "Foodpath Ventures",
    audience: "Open",
    category: "business",
    prize: 5000,
    currency: "$",
    isHot: false,
    isBookmarked: false,
    deadline: "2026-09-05T18:00:00+06:00",
    coverImage:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "comp-4",
    title: "CodeForge Weekly Sprint #14",
    organizer: "CodeForge",
    audience: "Open",
    category: "programming",
    prize: 1500,
    currency: "$",
    isHot: false,
    isBookmarked: false,
    deadline: "2026-08-18T18:00:00+06:00",
    coverImage:
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "comp-5",
    title: "Physics Olympiad — Regional Round",
    organizer: "AUST Science Society",
    audience: "University",
    category: "olympiad",
    prize: 2000,
    currency: "$",
    isHot: false,
    isBookmarked: false,
    deadline: "2026-09-12T18:00:00+06:00",
    coverImage:
      "https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "comp-6",
    title: "AUSTPIC Build Weekend",
    organizer: "AUSTPIC",
    audience: "University",
    category: "hackathon",
    prize: 3000,
    currency: "$",
    isHot: false,
    isBookmarked: false,
    deadline: "2026-08-30T18:00:00+06:00",
    coverImage:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=800&auto=format&fit=crop",
  },
];

// Small numbers the top cards show. Backend will own these too eventually —
// keep the key names stable (bookmarkedCount, newThisWeek, upcomingDeadlines)
// since DiscoverPage reads them directly.
export const MOCK_DASHBOARD_STATS = {
  bookmarkedCount: 2,
  newThisWeek: 18,
  upcomingDeadlines: 2,
};
