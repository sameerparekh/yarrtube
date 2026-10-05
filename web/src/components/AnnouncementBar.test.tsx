import { beforeEach, describe, expect, it } from 'vitest'
import { screen } from '@testing-library/react'
import { AnnouncementBar } from './AnnouncementBar'
import { ANNOUNCEMENTS_URL } from '@/api/client'
import type { RouteResponse } from '@/test/helpers'
import { anAnnouncement, mockApi, renderWithProviders } from '@/test/helpers'

function renderBar(announcements: RouteResponse) {
  mockApi({ [`GET ${ANNOUNCEMENTS_URL}`]: announcements })
  return renderWithProviders(<AnnouncementBar />)
}

describe('AnnouncementBar', () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  it('shows the newest unread announcement', async () => {
    renderBar([
      anAnnouncement({ id: 'b', text: 'Second' }),
      anAnnouncement({ id: 'a', text: 'First' }),
    ])

    expect(await screen.findByText('Second')).toBeInTheDocument()
    expect(screen.queryByText('First')).not.toBeInTheDocument()
  })
})
