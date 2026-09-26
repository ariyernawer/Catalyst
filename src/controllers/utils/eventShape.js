export function toCardShape(event) {
  const educationLevels = Array.isArray(event.educationLevels)
    ? event.educationLevels.filter(Boolean).map(String)
    : typeof event.educationLevels === "string"
      ? event.educationLevels.split(",").map((level) => level.trim()).filter(Boolean)
      : [];
  const organizerName =
    event.organizerName ||
    (typeof event.organizer === "string" ? event.organizer : event.organizer?.name) ||
    "Catalyst";
  const prize = Number(String(event.prizes ?? "").replace(/[^0-9.]/g, ""));

  return {
    id: event.id ?? event._id ?? "",
    title: event.title || "",
    organizer: organizerName,
    audience: educationLevels.length ? educationLevels.join(", ") : "Open to All",
    educationLevels,
    category: event.category || "Other",
    eventType: event.eventType || "",
    eventDate: event.eventDate || "",
    registrationOpens: event.registrationOpens || "",
    deadline: event.deadline || "",
    location: event.location || "",
    shortDescription: event.shortDescription || "",
    fullDescription: event.fullDescription || "",
    prizes: event.prizes || "",
    prize: Number.isFinite(prize) ? prize : 0,
    currency: "$",
    isHot: Boolean(event.isHot),
    isBookmarked: Boolean(event.isBookmarked),
    createdAt: event.createdAt || null,
    coverImage: event.banner || event.thumbnail,
    quote: null,
  };
}