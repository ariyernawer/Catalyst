import { useContext } from "react";
import { BookmarksContext } from "../context/bookmarksContext";

export function useBookmarks() {
  const context = useContext(BookmarksContext);
  if (!context) throw new Error("useBookmarks must be used inside BookmarksProvider");
  return context;
}
