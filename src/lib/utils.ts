import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { format, formatDistanceToNow } from "date-fns"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatTimeRange(start: Date, end: Date): string {
  const startStr = format(start, 'HH:mm')
  const endStr = format(end, 'HH:mm')
  return `${startStr} - ${endStr}`
}

export function formatRelativeTime(date: Date): string {
  return formatDistanceToNow(date, { addSuffix: true })
}

export function getIncidentTypeColor(type: string): string {
  switch (type.toLowerCase()) {
    case 'unauthorised access':
      return 'bg-red-500'
    case 'gun threat':
      return 'bg-red-700'
    case 'face recognised':
      return 'bg-blue-500'
    case 'suspicious activity':
      return 'bg-yellow-500'
    case 'theft alert':
      return 'bg-orange-500'
    default:
      return 'bg-gray-500'
  }
}

export function getIncidentTypeIcon(type: string): string {
  switch (type.toLowerCase()) {
    case 'unauthorised access':
      return '🚫'
    case 'gun threat':
      return '🔫'
    case 'face recognised':
      return '👤'
    case 'suspicious activity':
      return '⚠️'
    case 'theft alert':
      return '🔓'
    default:
      return '📹'
  }
}
