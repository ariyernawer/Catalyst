import { Navbar } from "./Navbar";

/**
 * Shell layout for all dashboard pages.
 * Uses a sticky top navbar instead of a left sidebar, so the full
 * viewport width is available for content on every screen size.
 *
 * @param {string}   activeNavId
 * @param {Function} onNavigate
 * @param {number}   bookmarkCount
 * @param {object}   user               - { name: string }
 * @param {string}   pageTitle
 * @param {string}   pageSubtitle
 * @param {string}   searchValue
 * @param {Function} onSearchChange
 * @param {number}   notificationCount
 * @param {import("react").ReactNode} children
 */
export function DashboardLayout({
  activeNavId,
  onNavigate,
  bookmarkCount = 0,
  user,
  pageTitle,
  pageSubtitle,
  searchValue,
  onSearchChange,
  notificationCount = 0,
  children,
}) {
  return (
    <div className="min-h-screen bg-bg">
      <Navbar
        activeId={activeNavId}
        onNavigate={onNavigate}
        bookmarkCount={bookmarkCount}
        user={user}
        searchValue={searchValue}
        onSearchChange={onSearchChange}
        notificationCount={notificationCount}
      />

      <main className="mx-auto max-w-screen-xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        {/* Page header */}
        {pageTitle && (
          <div className="mb-6">
            <h1 className="font-display text-2xl font-bold text-text-primary sm:text-3xl">
              {pageTitle}
            </h1>
            {pageSubtitle && (
              <p className="mt-1 text-sm text-text-muted">{pageSubtitle}</p>
            )}
          </div>
        )}

        {children}
      </main>
    </div>
  );
}
