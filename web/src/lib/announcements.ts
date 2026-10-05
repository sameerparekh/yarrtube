import type { Announcement } from '@/api/types'

export function parseAnnouncements(body: unknown): Announcement[] {
  return body as Announcement[]
}

export function firstUnread(
  announcements: readonly Announcement[],
  _dismissed: ReadonlySet<string>,
): Announcement | undefined {
  return announcements[0]
}

export function readDismissedAnnouncements(): string[] {
  return []
}

export function writeDismissedAnnouncements(_ids: readonly string[]): void {}
