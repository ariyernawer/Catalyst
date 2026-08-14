import { Compass, Heart, ListChecks, CircleUserRound, ChevronLeft, LogOut, X } from "lucide-react";
import { cn } from "../../utils/cn";

const NAV_ITEMS = [
  { id: "discover", label: "Discover", icon: Compass },
  { id: "bookmarks", label: "Bookmarks", icon: Heart },
  { id: "upcoming", label: "Upcoming", icon: ListChecks },
  { id: "profile", label: "Profile", icon: CircleUserRound },
];

/**
 * @param {string} activeId - id of the current nav item (drives highlighting)
 * @param {(id: string) => void} onNavigate - called with the item id when clicked
 * @param {number} bookmarkCount - badge shown next to "Bookmarks"
 * @param {boolean} isCollapsed - desktop rail collapse (icons only)
 * @param {() => void} onToggleCollapse
 * @param {boolean} isOpenOnMobile - drawer visibility on small screens
 * @param {() => void} onCloseMobile
 */
export function Sidebar({
  activeId = "discover",
  onNavigate,
  bookmarkCount = 0,
  isCollapsed = false,
  onToggleCollapse,
  isOpenOnMobile = false,
  onCloseMobile,
}) {
  return (
    <>
      {/* Mobile scrim */}
      {isOpenOnMobile && (
        <div
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
          onClick={onCloseMobile}
          aria-hidden="true"
        />
      )}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex h-full flex-col border-r border-border bg-surface p-4 transition-all duration-200",
          "lg:static lg:translate-x-0",
          isOpenOnMobile ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
          isCollapsed ? "lg:w-20" : "lg:w-64",
          "w-64"
        )}
      >
        <div className="mb-8 flex items-center justify-between px-2">
          <div className="flex items-center gap-2 overflow-hidden">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sand font-display text-sm font-bold text-bg">
              C
            </span>
            {!isCollapsed && (
              <span className="truncate font-display text-lg font-bold text-text-primary">
                Catalyst
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={onCloseMobile}
            className="text-text-muted lg:hidden"
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 space-y-1">
          {NAV_ITEMS.map(({ id, label, icon: Icon }) => {
            const isActive = id === activeId;
            return (
              <button
                key={id}
                type="button"
                onClick={() => onNavigate?.(id)}
                className={cn(
                  "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-danger/15 text-danger"
                    : "text-text-secondary hover:bg-surface-raised hover:text-text-primary"
                )}
              >
                <Icon size={18} className="shrink-0" />
                {!isCollapsed && <span className="truncate">{label}</span>}
                {!isCollapsed && id === "bookmarks" && bookmarkCount > 0 && (
                  <span className="ml-auto rounded-full bg-danger px-2 py-0.5 text-xs font-semibold text-text-primary">
                    {bookmarkCount}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        <div className="space-y-1 border-t border-border pt-3">
          <button
            type="button"
            onClick={onToggleCollapse}
            className="hidden w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-text-secondary transition-colors hover:bg-surface-raised hover:text-text-primary lg:flex"
          >
            <ChevronLeft
              size={18}
              className={cn("shrink-0 transition-transform", isCollapsed && "rotate-180")}
            />
            {!isCollapsed && <span>Collapse</span>}
          </button>
          <button
            type="button"
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-text-secondary transition-colors hover:bg-surface-raised hover:text-text-primary"
          >
            <LogOut size={18} className="shrink-0" />
            {!isCollapsed && <span>Sign Out</span>}
          </button>
        </div>
      </aside>
    </>
  );
}
