/**
 * Utility functions — Avalin Laboratories
 *
 * cn(): Merges Tailwind class names with conflict resolution.
 * Uses clsx for conditional classes and tailwind-merge for deduplication.
 *
 * Note: tailwind-merge is not installed — using a lightweight alternative
 * that handles the common cases we actually use (no complex merge needed).
 */

type ClassValue = ClassValue[] | string | number | boolean | null | undefined

/** Filters falsy values and joins class strings (supports nested arrays) */
export function cn(...inputs: ClassValue[]): string {
  return inputs
    .flat(Infinity as 1)
    .filter(Boolean)
    .join(' ')
}

/** Clamp a number between min and max */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}

/** Format a number in Indian locale (e.g. 1,00,000) */
export function formatIndian(value: number, decimals = 0): string {
  return value.toLocaleString('en-IN', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })
}

/** Truncate a string at word boundary */
export function truncate(str: string, maxLen: number): string {
  if (str.length <= maxLen) return str
  return str.slice(0, maxLen).replace(/\s+\S*$/, '') + '\u2026'
}
