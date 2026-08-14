import { Search, Bell, Menu } from "lucide-react";

/**
 * @param {string} title
 * @param {string} subtitle
 * @param {string} searchValue
 * @param {(value: string) => void} onSearchChange
 * @param {number} notificationCount
 * @param {{ name: string }} user
 * @param {() => void} onOpenMobileMenu
 */
export function Topbar({
  title,
  subtitle,
  searchValue = "",
  onSearchChange,
  notificationCount = 0,
  user,
  onOpenMobileMenu,
}) {
  return (
    <header className="flex flex-col gap-4 border-b border-border px-4 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onOpenMobileMenu}
          className="text-text-secondary lg:hidden"
          aria-label="Open menu"
        >
          <Menu size={22} />
        </button>
        <div>
          <h1 className="font-display text-2xl font-bold text-text-primary sm:text-3xl">
            {title}
          </h1>
          {subtitle && <p className="text-sm text-text-muted">{subtitle}</p>}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative hidden sm:block">
          <Search
            size={16}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-text-muted"
          />
          <input
            type="text"
            value={searchValue}
            onChange={(event) => onSearchChange?.(event.target.value)}
            placeholder="Search competitions..."
            className="w-56 rounded-full border border-border bg-surface py-2 pl-9 pr-4 text-sm text-text-primary placeholder:text-text-muted focus:border-sand focus:outline-none xl:w-72"
          />
        </div>

        <button
          type="button"
          className="relative flex h-10 w-10 items-center justify-center rounded-full bg-surface text-text-secondary transition-colors hover:text-text-primary"
          aria-label="Notifications"
        >
          <Bell size={18} />
          {notificationCount > 0 && (
            <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-danger px-1 text-[11px] font-bold text-text-primary">
              {notificationCount}
            </span>
          )}
        </button>

        {user && (
          <div className="flex items-center gap-2 rounded-full bg-surface py-1 pl-1 pr-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-sand text-sm font-bold text-bg">
              {user.name.charAt(0)}
            </span>
            <span className="hidden text-sm font-medium text-text-primary sm:inline">
              {user.name}
            </span>
          </div>
        )}
      </div>
    </header>
  );
}
