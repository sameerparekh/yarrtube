import type { Announcement } from '@/api/types'

export function parseAnnouncements(body: unknown): Announcement[] {
  if (!Array.isArray(body)) {
    throw new Error('announcements file is not a JSON array')
  }
  return body.filter(isAnnouncement)
}

export function firstUnread(
  announcements: readonly Announcement[],
  dismissed: ReadonlySet<string>,
): Announcement | undefined {
  return announcements.find((announcement) => !dismissed.has(announcement.id))
}

const DISMISSED_KEY = 'yarrtube.dismissedAnnouncements'

export function readDismissedAnnouncements(): string[] {
  return JSON.parse(window.localStorage.getItem(DISMISSED_KEY) ?? '[]') as string[]
}

export function writeDismissedAnnouncements(ids: readonly string[]): void {
  window.localStorage.setItem(DISMISSED_KEY, JSON.stringify(ids))
}

function isAnnouncement(entry: unknown): entry is Announcement {
  return (
    typeof entry === 'object' &&
    entry !== null &&
    typeof (entry as { id?: unknown }).id === 'string' &&
    typeof (entry as { text?: unknown }).text === 'string'
  )
}
