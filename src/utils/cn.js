// Minimal classnames combinator — avoids a dependency for something this small.
// Usage: cn("base-class", isActive && "active-class", className)
export function cn(...values) {
  return values.filter(Boolean).join(" ");
}
