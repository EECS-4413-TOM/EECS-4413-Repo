/**
 * formatCurrency
 *
 * Format a numeric price as a USD currency string.
 * Use the built-in Intl.NumberFormat with style "currency".
 *
 * @param amount - Number to format (e.g. 19.99)
 * @returns Formatted string (e.g. "$19.99")
 *
 * Example:
 *   formatCurrency(19.99)  // "$19.99"
 *   formatCurrency(1500)   // "$1,500.00"
 */
export function formatCurrency(amount: number): string {
  // TODO: return new Intl.NumberFormat("en-CA", { style: "currency", currency: "CAD" }).format(amount)
  throw new Error("Not implemented");
}

/**
 * formatDate
 *
 * Format an ISO date string into a human-readable format.
 * Use the built-in Intl.DateTimeFormat.
 *
 * @param dateString - ISO 8601 date string (e.g. "2026-03-04T12:00:00Z")
 * @returns Formatted string (e.g. "March 4, 2026")
 *
 * Example:
 *   formatDate("2026-03-04T12:00:00Z")  // "March 4, 2026"
 */
export function formatDate(dateString: string): string {
  // TODO: return new Intl.DateTimeFormat("en-CA", { year: "numeric", month: "long", day: "numeric" }).format(new Date(dateString))
  throw new Error("Not implemented");
}
