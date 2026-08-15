import { useEffect, useMemo, useState } from "react";
import { MOCK_COMPETITIONS } from "../constants/mockCompetitions";
import { BookmarksContext } from "./bookmarksContext";

const STORAGE_KEY = "catalyst-competitions";

function getInitialCompetitions() {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : MOCK_COMPETITIONS;
  } catch {
    return MOCK_COMPETITIONS;
  }
}

export function BookmarksProvider({ children }) {
  const [competitions, setCompetitions] = useState(getInitialCompetitions);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(competitions));
  }, [competitions]);

  const bookmarkedCompetitions = useMemo(
    () => competitions.filter((competition) => competition.isBookmarked),
    [competitions]
  );

  function toggleBookmark(id) {
    setCompetitions((previous) =>
      previous.map((competition) =>
        competition.id === id
          ? { ...competition, isBookmarked: !competition.isBookmarked }
          : competition
      )
    );
  }

  return (
    <BookmarksContext.Provider value={{ competitions, bookmarkedCompetitions, toggleBookmark }}>
      {children}
    </BookmarksContext.Provider>
  );
}
