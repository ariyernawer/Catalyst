import { AlarmClock, CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CountdownTimer } from "../../components/discover/CountdownTimer";
import { DashboardLayout } from "../../components/layout/DashboardLayout";
import { cn } from "../../../controllers/utils/cn";
import { competitionApi } from "../../../models/api/competitionApi";
import { useAuthContext } from "../../../models/contexts/useAuthContext";
import { getTimeRemaining } from "../../../controllers/utils/countdown";

const DUE_WINDOW_DAYS = 7;
const DATE_PLACEHOLDERS = new Set(["tba", "open", "draft", "closed"]);
const WEEKDAY_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function normalizeText(value) {
  return String(value ?? "").trim().toLocaleLowerCase();
}

function startOfDay(value = new Date()) {
  const date = new Date(value);
  date.setHours(0, 0, 0, 0);
  return date;
}

function parseDate(value) {
  const text = String(value ?? "").trim();
  if (!text || DATE_PLACEHOLDERS.has(normalizeText(text))) return null;

  // Treat date-only values as local dates so the calendar does not shift them
  // across a timezone boundary.
  const dateOnly = /^(\d{4})-(\d{1,2})-(\d{1,2})(?:$|T|\s)/.exec(text);
  const date = dateOnly
    ? new Date(Number(dateOnly[1]), Number(dateOnly[2]) - 1, Number(dateOnly[3]))
    : new Date(text);

  return Number.isNaN(date.getTime()) ? null : startOfDay(date);
}

function getCountdownDeadline(value) {
  const text = String(value ?? "").trim();
  const dateOnly = /^(\d{4})-(\d{1,2})-(\d{1,2})$/.exec(text);
  if (!dateOnly) return value;

  return new Date(
    Number(dateOnly[1]),
    Number(dateOnly[2]) - 1,
    Number(dateOnly[3]),
    23,
    59,
    59,
  ).toISOString();
}

function dateKey(value) {
  const date = value instanceof Date ? value : parseDate(value);
  if (!date) return "";

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function formatDate(value, options = { year: "numeric", month: "short", day: "numeric" }) {
  const date = value instanceof Date ? value : parseDate(value);
  if (!date) return "Date unavailable";
  return date.toLocaleDateString(undefined, options);
}

function formatMonth(value) {
  return value.toLocaleDateString(undefined, { month: "long", year: "numeric" });
}

function isSameDay(first, second) {
  return dateKey(first) === dateKey(second);
}

function isSameMonth(first, second) {
  return first.getFullYear() === second.getFullYear() && first.getMonth() === second.getMonth();
}

function getCalendarDays(month) {
  const firstDay = new Date(month.getFullYear(), month.getMonth(), 1);
  const mondayOffset = (firstDay.getDay() + 6) % 7;

  return Array.from({ length: 42 }, (_, index) => {
    const day = new Date(month.getFullYear(), month.getMonth(), 1 - mondayOffset + index);
    return startOfDay(day);
  });
}

function getFirstDateForMonth(competitions, month) {
  return (
    competitions
      .flatMap((competition) => [competition.eventDate, competition.deadline].filter(Boolean))
      .filter((date) => isSameMonth(date, month))
      .sort((first, second) => first.getTime() - second.getTime())[0] ||
    new Date(month.getFullYear(), month.getMonth(), 1)
  );
}

function toCalendarCompetition(event, today) {
  if (!event || typeof event !== "object") return null;
  if (event.status && event.status !== "Published") return null;

  const parsedEventDate = parseDate(event?.eventDate);
  const parsedDeadline = parseDate(event?.deadline);
  const eventDate = parsedEventDate && parsedEventDate >= today ? parsedEventDate : null;
  const deadline = parsedDeadline && parsedDeadline >= today ? parsedDeadline : null;
  if (!eventDate && !deadline) return null;

  const organizerName =
    event.organizerName ||
    (typeof event.organizer === "string" ? event.organizer : event.organizer?.name) ||
    "Catalyst";

  return {
    id: event.id ?? event._id,
    title: event.title || "Untitled competition",
    organizer: organizerName,
    eventDate,
    deadline,
    deadlineForCountdown: getCountdownDeadline(event.deadline),
    coverImage: event.banner || event.thumbnail,
  };
}

function CalendarEventRow({ entry, onSelect }) {
  const isDeadline = entry.calendarType === "deadline";

  return (
    <button
      type="button"
      onClick={onSelect}
      className="group flex w-full items-center gap-3 rounded-xl border border-border bg-bg p-3 text-left transition hover:border-sand/50"
    >
      <span
        className={cn(
          "mt-1 h-2 w-2 shrink-0 rounded-full",
          isDeadline ? "bg-danger" : "bg-sand",
        )}
      />
      <div className="min-w-0 flex-1">
        <p className={cn("text-[10px] font-bold uppercase tracking-widest", isDeadline ? "text-danger" : "text-sand")}>
          {isDeadline ? "Registration deadline" : "Event date"}
        </p>
        <p className="mt-0.5 truncate text-sm font-semibold text-text-primary">{entry.title}</p>
        <p className="truncate text-xs text-text-muted">{entry.organizer}</p>
      </div>
      <ChevronRight
        size={15}
        className="shrink-0 text-text-muted transition group-hover:translate-x-1 group-hover:text-text-primary"
      />
    </button>
  );
}

export default function UpcomingPage() {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const today = useMemo(() => startOfDay(), []);
  const [competitions, setCompetitions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [visibleMonth, setVisibleMonth] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    let isCurrent = true;

    competitionApi
      .getPublicEvents()
      .then((res) => {
        if (!isCurrent) return;

        const events = Array.isArray(res.data) ? res.data : res.data?.items;
        setCompetitions(Array.isArray(events) ? events : []);
      })
      .catch((error) => {
        if (isCurrent) {
          setLoadError(error?.response?.data?.message || "Unable to load upcoming deadlines.");
        }
      })
      .finally(() => {
        if (isCurrent) setIsLoading(false);
      });

    return () => {
      isCurrent = false;
    };
  }, []);

  const calendarCompetitions = useMemo(
    () =>
      competitions
        .map((event) => toCalendarCompetition(event, today))
        .filter(Boolean)
        .sort((first, second) => {
          const firstDate = first.eventDate || first.deadline;
          const secondDate = second.eventDate || second.deadline;
          return firstDate.getTime() - secondDate.getTime();
        }),
    [competitions, today],
  );

  const defaultDate = useMemo(() => {
    const nextDate = calendarCompetitions
      .flatMap((competition) => [competition.eventDate, competition.deadline].filter(Boolean))
      .sort((first, second) => first.getTime() - second.getTime())[0];
    return nextDate || today;
  }, [calendarCompetitions, today]);

  const activeSelectedDate = selectedDate || defaultDate;
  const activeVisibleMonth = useMemo(
    () => visibleMonth || new Date(activeSelectedDate.getFullYear(), activeSelectedDate.getMonth(), 1),
    [activeSelectedDate, visibleMonth],
  );
  const calendarDays = useMemo(() => getCalendarDays(activeVisibleMonth), [activeVisibleMonth]);

  const eventsByDay = useMemo(() => {
    const grouped = new Map();
    const addEntry = (date, competition, calendarType) => {
      if (!date) return;
      const key = dateKey(date);
      const entries = grouped.get(key) || [];
      entries.push({ ...competition, calendarType, calendarDate: date });
      grouped.set(key, entries);
    };

    calendarCompetitions.forEach((competition) => {
      addEntry(competition.eventDate, competition, "event");
      addEntry(competition.deadline, competition, "deadline");
    });

    return grouped;
  }, [calendarCompetitions]);

  const selectedDayEvents = eventsByDay.get(dateKey(activeSelectedDate)) || [];
  const dueCompetitions = useMemo(
    () =>
      calendarCompetitions
        .filter((competition) => {
          if (!competition.deadline) return false;
          const time = getTimeRemaining(competition.deadlineForCountdown);
          return !time.isPast && Number.isFinite(time.days) && time.days <= DUE_WINDOW_DAYS;
        })
        .sort((first, second) => first.deadline.getTime() - second.deadline.getTime()),
    [calendarCompetitions],
  );

  const goToPage = (id) => {
    if (id === "bookmarks") return navigate("/saved");
    if (id === "upcoming") return navigate("/upcoming");
    if (id === "profile") return navigate("/profile");
    return navigate("/discover");
  };

  const changeMonth = (offset) => {
    const nextMonth = new Date(activeVisibleMonth.getFullYear(), activeVisibleMonth.getMonth() + offset, 1);
    setVisibleMonth(nextMonth);
    setSelectedDate(getFirstDateForMonth(calendarCompetitions, nextMonth));
  };

  const selectDay = (day) => {
    setSelectedDate(day);
    if (!isSameMonth(day, activeVisibleMonth)) {
      setVisibleMonth(new Date(day.getFullYear(), day.getMonth(), 1));
    }
  };

  const goToToday = () => {
    setVisibleMonth(new Date(today.getFullYear(), today.getMonth(), 1));
    setSelectedDate(today);
  };

  const pageSubtitle = isLoading
    ? "Loading upcoming competitions…"
    : loadError
      ? "Unable to load upcoming competitions"
      : `${calendarCompetitions.length} upcoming ${calendarCompetitions.length === 1 ? "competition" : "competitions"} · ${dueCompetitions.length} due this week`;

  return (
    <DashboardLayout
      activeNavId="upcoming"
      onNavigate={goToPage}
      user={user}
      pageTitle="Upcoming deadlines"
      pageSubtitle={pageSubtitle}
    >
      <div className="space-y-6">
        <section className="relative overflow-hidden rounded-card border border-danger/30 bg-surface p-5 shadow-card sm:p-7">
          <div className="relative flex items-start gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-danger/15 text-danger">
              <AlarmClock size={24} />
            </span>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-danger">
                Plan ahead
              </p>
              <h2 className="mt-1 font-display text-xl font-bold text-text-primary sm:text-2xl">
                {dueCompetitions.length} {dueCompetitions.length === 1 ? "deadline" : "deadlines"} due this week
              </h2>
              <p className="mt-1 text-sm text-text-secondary">
                Event dates and registration deadlines are marked on the calendar.
              </p>
            </div>
          </div>
        </section>

        {isLoading ? (
          <div className="rounded-card bg-surface py-16 text-center text-sm text-text-muted shadow-card">
            Loading calendar…
          </div>
        ) : loadError ? (
          <div className="rounded-card bg-surface py-16 text-center shadow-card" role="alert">
            <p className="font-display text-lg font-semibold text-text-primary">
              We couldn&apos;t load upcoming competitions
            </p>
            <p className="mt-1 text-sm text-text-muted">{loadError}</p>
          </div>
        ) : (
          <>
            <div className="grid gap-5 xl:grid-cols-[minmax(0,1.45fr)_minmax(280px,0.75fr)]">
              <section className="rounded-card border border-border bg-surface p-4 shadow-card sm:p-6" aria-label="Competition calendar">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-sand">Calendar</p>
                    <h2 className="mt-1 font-display text-xl font-bold text-text-primary">
                      {formatMonth(activeVisibleMonth)}
                    </h2>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={goToToday}
                      className="rounded-full border border-border px-3 py-1.5 text-xs font-semibold text-text-secondary transition hover:border-sand hover:text-text-primary"
                    >
                      Today
                    </button>
                    <button
                      type="button"
                      aria-label="Previous month"
                      onClick={() => changeMonth(-1)}
                      className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-text-secondary transition hover:border-sand hover:text-text-primary"
                    >
                      <ChevronLeft size={16} />
                    </button>
                    <button
                      type="button"
                      aria-label="Next month"
                      onClick={() => changeMonth(1)}
                      className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-text-secondary transition hover:border-sand hover:text-text-primary"
                    >
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>

                <div className="mt-5 grid grid-cols-7 gap-1 text-center text-[10px] font-bold uppercase tracking-widest text-text-muted sm:text-xs">
                  {WEEKDAY_LABELS.map((label) => (
                    <span key={label} className="py-1">
                      {label}
                    </span>
                  ))}
                </div>

                <div className="mt-1 grid grid-cols-7 gap-1">
                  {calendarDays.map((day) => {
                    const dayEntries = eventsByDay.get(dateKey(day)) || [];
                    const isOutsideMonth = !isSameMonth(day, activeVisibleMonth);
                    const isSelected = isSameDay(day, activeSelectedDate);
                    const isToday = isSameDay(day, today);
                    const dayLabel = formatDate(day, {
                      weekday: "long",
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    });
                    const eventLabel = dayEntries.length
                      ? `${dayEntries.length} calendar ${dayEntries.length === 1 ? "item" : "items"}`
                      : "no calendar items";

                    return (
                      <button
                        key={dateKey(day)}
                        type="button"
                        aria-label={`${dayLabel}, ${eventLabel}`}
                        aria-pressed={isSelected}
                        onClick={() => selectDay(day)}
                        className={cn(
                          "min-h-16 rounded-xl border p-2 text-left transition sm:min-h-20",
                          isOutsideMonth && "text-text-muted/40",
                          isSelected
                            ? "border-danger bg-danger text-text-primary"
                            : "border-transparent hover:border-sand/40 hover:bg-surface-raised",
                          isToday && !isSelected && "ring-1 ring-sand/70",
                        )}
                      >
                        <span className="text-sm font-semibold">{day.getDate()}</span>
                        <span className="mt-2 flex min-h-2 items-center gap-1">
                          {dayEntries.slice(0, 3).map((entry) => (
                            <span
                              key={`${entry.id}-${entry.calendarType}`}
                              className={cn(
                                "h-1.5 w-1.5 rounded-full",
                                isSelected
                                  ? "bg-text-primary"
                                  : entry.calendarType === "deadline"
                                    ? "bg-danger"
                                    : "bg-sand",
                              )}
                            />
                          ))}
                          {dayEntries.length > 3 && (
                            <span className={cn("text-[9px] font-bold", isSelected ? "text-text-primary" : "text-text-muted")}>
                              +{dayEntries.length - 3}
                            </span>
                          )}
                        </span>
                      </button>
                    );
                  })}
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-4 border-t border-border pt-4 text-xs text-text-muted">
                  <span className="inline-flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-sand" /> Event date
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-danger" /> Registration deadline
                  </span>
                </div>
              </section>

              <aside className="rounded-card border border-border bg-surface p-5 shadow-card sm:p-6" aria-label="Selected day competitions">
                <div className="flex items-start gap-3 border-b border-border pb-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-sand/15 text-sand">
                    <CalendarDays size={18} />
                  </span>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-sand">Selected day</p>
                    <h2 className="mt-1 font-display text-lg font-bold text-text-primary">
                      {formatDate(activeSelectedDate, { weekday: "long", month: "long", day: "numeric" })}
                    </h2>
                  </div>
                </div>

                {selectedDayEvents.length > 0 ? (
                  <div className="mt-4 space-y-2">
                    {selectedDayEvents.map((entry) => (
                      <CalendarEventRow
                        key={`${entry.id}-${entry.calendarType}`}
                        entry={entry}
                        onSelect={() => navigate(`/competition/${entry.id}`)}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <CalendarDays size={24} className="text-text-muted/50" />
                    <p className="mt-3 text-sm font-semibold text-text-primary">No competitions on this day</p>
                    <p className="mt-1 text-xs text-text-muted">Choose a day with a dot to see details.</p>
                  </div>
                )}
              </aside>
            </div>

            {dueCompetitions.length > 0 && (
              <section className="rounded-card border border-border bg-surface p-5 shadow-card sm:p-6" aria-label="Deadlines due this week">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-danger">Due this week</p>
                    <h2 className="mt-1 font-display text-lg font-bold text-text-primary">Registration deadlines</h2>
                  </div>
                  <span className="rounded-full bg-danger/15 px-3 py-1 text-xs font-bold text-danger">
                    {dueCompetitions.length}
                  </span>
                </div>

                <div className="mt-4 grid gap-3 lg:grid-cols-2">
                  {dueCompetitions.map((competition) => (
                    <button
                      key={competition.id}
                      type="button"
                      onClick={() => navigate(`/competition/${competition.id}`)}
                      className="group flex min-w-0 items-center gap-3 rounded-xl border border-border bg-bg p-3 text-left transition hover:border-sand/50"
                    >
                      <div className="flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-xl bg-danger/10 text-danger">
                        <span className="text-[10px] font-bold uppercase tracking-widest">
                          {formatDate(competition.deadline, { month: "short" })}
                        </span>
                        <span className="font-display text-xl font-bold leading-none">
                          {formatDate(competition.deadline, { day: "numeric" })}
                        </span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-danger">Deadline</p>
                        <p className="mt-0.5 truncate text-sm font-semibold text-text-primary">{competition.title}</p>
                        <p className="truncate text-xs text-text-muted">{competition.organizer}</p>
                      </div>
                      <div className="hidden shrink-0 sm:block">
                        <CountdownTimer deadline={competition.deadlineForCountdown} />
                      </div>
                      <ChevronRight
                        size={16}
                        className="shrink-0 text-text-muted transition group-hover:translate-x-1 group-hover:text-text-primary"
                      />
                    </button>
                  ))}
                </div>
              </section>
            )}
          </>
        )}
      </div>
    </DashboardLayout>
  );
}
