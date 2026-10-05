import { describe, expect, it } from 'vitest'
import { parseAnnouncementText } from './announcementText'

describe('parseAnnouncementText', () => {
  it('returns plain text as a single text segment', () => {
    expect(parseAnnouncementText('Plex integration landed.')).toEqual([
      { kind: 'text', text: 'Plex integration landed.' },
    ])
  })
})
