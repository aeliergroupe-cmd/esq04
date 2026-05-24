import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { format, formatDistanceToNow, differenceInDays } from 'date-fns'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(
  amount: number,
  currency = 'USD',
  compact = false
): string {
  if (compact) {
    if (amount >= 1_000_000) return `$${(amount / 1_000_000).toFixed(2)}M`
    if (amount >= 1_000) return `$${(amount / 1_000).toFixed(0)}K`
  }
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

export function formatDate(date: string | Date, pattern = 'MMM d, yyyy'): string {
  return format(new Date(date), pattern)
}

export function formatRelative(date: string | Date): string {
  return formatDistanceToNow(new Date(date), { addSuffix: true })
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .slice(0, 2)
    .map((n) => n[0])
    .join('')
    .toUpperCase()
}

export function getDaysUntil(date: string | Date): number {
  return differenceInDays(new Date(date), new Date())
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str
  return str.slice(0, length) + '…'
}

export function slugify(str: string): string {
  return str.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '')
}

export const COUNTRY_FLAGS: Record<string, string> = {
  Italy: '🇮🇹',
  France: '🇫🇷',
  Japan: '🇯🇵',
  China: '🇨🇳',
  India: '🇮🇳',
  Portugal: '🇵🇹',
  Turkey: '🇹🇷',
  UK: '🇬🇧',
  Germany: '🇩🇪',
  Peru: '🇵🇪',
  Morocco: '🇲🇦',
  Bangladesh: '🇧🇩',
  Vietnam: '🇻🇳',
  Korea: '🇰🇷',
  Spain: '🇪🇸',
  Switzerland: '🇨🇭',
}
