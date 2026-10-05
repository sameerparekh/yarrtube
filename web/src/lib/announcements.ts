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

export function readDismissedAnnouncements(): string[] {
  return []
}

export function writeDismissedAnnouncements(_ids: readonly string[]): void {}
