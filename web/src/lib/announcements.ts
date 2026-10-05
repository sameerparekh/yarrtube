import type { Announcement } from '@/api/types'

export function parseAnnouncements(_body: unknown): Announcement[] {
  return []
}

export function firstUnread(
  _announcements: readonly Announcement[],
  _dismissed: ReadonlySet<string>,
): Announcement | undefined {
  return undefined
}

export function readDismissedAnnouncements(): string[] {
  return []
}

export function writeDismissedAnnouncements(_ids: readonly string[]): void {}
