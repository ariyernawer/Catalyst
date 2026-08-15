import { useState, useRef, useEffect } from "react";
import {
  Compass, Heart, ListChecks, CircleUserRound,
  Search, Bell, Menu, X, LogOut, ChevronRight,
} from "lucide-react";
import { cn } from "../../utils/cn";

const NAV_ITEMS = [
  { id: "discover",  label: "Discover",  icon: Compass,         desc: "Browse all competitions"  },
  { id: "bookmarks", label: "Bookmarks", icon: Heart,           desc: "Your saved competitions"  },
  { id: "upcoming",  label: "Upcoming",  icon: ListChecks,      desc: "Deadlines coming up"      },
  { id: "profile",   label: "Profile",   icon: CircleUserRound, desc: "Your account & settings"  },
];

/**
 * Full-width sticky top navbar.
 * Hamburger is the primary nav trigger on every screen size.
 */
export function Navbar({
  activeId = "discover",
  onNavigate,
  bookmarkCount = 0,
  user,
  notificationCount = 0,
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  /* Close dropdown when clicking outside */
  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsMenuOpen(false);
      }
    }
    if (isMenuOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMenuOpen]);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-surface/90 backdrop-blur-lg">
      <div className="mx-auto flex h-16 max-w-screen-xl items-center gap-3 px-4 sm:px-6 lg:px-8">

        {/* ── Hamburger button ────────────────────────────────── */}
        <div className="relative" ref={menuRef}>
          <button
            type="button"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((v) => !v)}
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-xl border transition-all duration-150",
              isMenuOpen
                ? "border-sand bg-surface-raised text-sand"
                : "border-border bg-surface text-text-secondary hover:border-sand/50 hover:text-text-primary"
            )}
          >
            <span className={cn("transition-transform duration-200", isMenuOpen && "rotate-90")}>
              {isMenuOpen ? <X size={19} /> : <Menu size={19} />}
            </span>
          </button>

          {/* ── Dropdown panel ────────────────────────────────── */}
          {isMenuOpen && (
            <div className="absolute left-0 top-[calc(100%+10px)] w-72 overflow-hidden rounded-2xl border border-border bg-surface shadow-card">

              {/* User row */}
              {user && (
                <div className="flex items-center gap-3 border-b border-border px-4 py-3.5">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-sand text-sm font-bold text-bg">
                    {user.name.charAt(0)}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-text-primary">{user.name}</p>
                    <p className="text-xs text-text-muted">Participant account</p>
                  </div>
                </div>
              )}

              {/* Nav items */}
              <nav className="p-2">
                {NAV_ITEMS.map(({ id, label, icon: Icon, desc }) => {
                  const isActive = id === activeId;
                  return (
                    <button
                      key={id}
                      type="button"
                      onClick={() => { onNavigate?.(id); setIsMenuOpen(false); }}
                      className={cn(
                        "group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 transition-all duration-150",
                        isActive
                          ? "bg-danger/12 text-danger"
                          : "text-text-secondary hover:bg-surface-raised hover:text-text-primary"
                      )}
                    >
                      <span className={cn(
                        "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors",
                        isActive ? "bg-danger/20 text-danger" : "bg-bg text-text-secondary group-hover:text-text-primary"
                      )}>
                        <Icon size={16} />
                      </span>
                      <span className="flex-1 text-left">
                        <span className="flex items-center gap-2">
                          <span className="text-sm font-semibold">{label}</span>
                          {id === "bookmarks" && bookmarkCount > 0 && (
                            <span className="rounded-full bg-danger px-1.5 py-0.5 text-[10px] font-bold leading-none text-text-primary">
                              {bookmarkCount}
                            </span>
                          )}
                        </span>
                        <span className="text-xs text-text-muted">{desc}</span>
                      </span>
                      <ChevronRight size={14} className="shrink-0 opacity-30 group-hover:opacity-70 transition-opacity" />
                    </button>
                  );
                })}
              </nav>

              {/* Sign out */}
              <div className="border-t border-border p-2">
                <button
                  type="button"
                  className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-text-secondary transition-colors hover:bg-surface-raised hover:text-text-primary"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-bg">
                    <LogOut size={15} />
                  </span>
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>

        {/* ── Logo ────────────────────────────────────────────── */}
        <div className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sand font-display text-sm font-bold text-bg">
            C
          </span>
          <span className="font-display text-lg font-bold text-text-primary">
            Catalyst
          </span>
        </div>

        

        {/* ── Right controls ──────────────────────────────────── */}
        <div className="ml-auto flex items-center gap-2">

          {/* Search – visible on sm+ */}
          <div className="relative hidden sm:block">
            <Search
              size={14}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-text-muted"
            />
            <input
              type="text"
              readOnly
              placeholder="Search competitions…"
              className="w-44 rounded-full border border-border bg-bg py-2 pl-8 pr-4 text-sm text-text-primary placeholder:text-text-muted transition-all focus:border-sand focus:outline-none focus:w-56 focus:ring-2 focus:ring-sand/20 xl:w-56"
            />
          </div>

          {/* Bell */}
          <button
            type="button"
            aria-label="Notifications"
            className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-surface text-text-secondary transition-colors hover:border-sand/50 hover:text-text-primary"
          >
            <Bell size={17} />
            {notificationCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-danger px-1 text-[10px] font-bold text-text-primary">
                {notificationCount}
              </span>
            )}
          </button>

          {/* User avatar chip */}
          {user && (
            <div className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl border border-border bg-surface transition-colors hover:border-sand/50">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-sand text-xs font-bold text-bg">
                {user.name.charAt(0)}
              </span>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
