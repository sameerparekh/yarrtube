import type { Announcement } from '@/api/types'

export function parseAnnouncements(body: unknown): Announcement[] {
  return body as Announcement[]
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

export function writeDismissedAnnouncements(_ids: readonly string[]): void {}
