import { useAnnouncements } from '@/api/queries'
import { firstUnread } from '@/lib/announcements'

/**
 * Shows the newest announcement this browser hasn't dismissed, above the
 * header. Renders nothing while loading, on any fetch error, or when every
 * announcement has been read.
 */
export function AnnouncementBar() {
  const { data } = useAnnouncements()
  const announcement = data && firstUnread(data, new Set())
  if (!announcement) {
    return null
  }

  return (
    <div
      role="region"
      aria-label="Announcement"
      className="flex shrink-0 items-center gap-3 border-b border-border bg-muted px-4 py-2 text-sm sm:px-6"
    >
      <p className="min-w-0 flex-1">{announcement.text}</p>
    </div>
  )
}
