export type AnnouncementSegment =
  | { kind: 'text'; text: string }
  | { kind: 'link'; label: string; url: string }

export function parseAnnouncementText(_text: string): AnnouncementSegment[] {
  return []
}
