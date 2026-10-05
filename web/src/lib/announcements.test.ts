import { describe, expect, it } from 'vitest'
import { readDismissedAnnouncements, writeDismissedAnnouncements } from './announcements'

describe('dismissed announcements storage', () => {
  it('reads no dismissed ids and writes without throwing when storage is unavailable', () => {
    const original = Object.getOwnPropertyDescriptor(window, 'localStorage')
    const denied = () => {
      throw new Error('storage denied')
    }
    Object.defineProperty(window, 'localStorage', {
      configurable: true,
      get: denied,
    })

    try {
      expect(readDismissedAnnouncements()).toEqual([])
      expect(() => writeDismissedAnnouncements(['a'])).not.toThrow()
    } finally {
      Object.defineProperty(window, 'localStorage', original!)
    }
  })
})
