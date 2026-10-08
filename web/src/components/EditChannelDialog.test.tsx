import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { EditChannelDialog } from './EditChannelDialog'
import { aChannel } from '@/test/helpers'
import type { ChannelListItem } from '@/api/types'

function renderDialog(
  channel: ChannelListItem,
  onSave: (changes: object) => Promise<void> = vi.fn(async () => {}),
) {
  const onOpenChange = vi.fn()
  render(<EditChannelDialog channel={channel} open onOpenChange={onOpenChange} onSave={onSave} />)
  return { onOpenChange, onSave }
}

describe('EditChannelDialog', () => {
  it("opens prefilled with the channel's current settings", () => {
    renderDialog(aChannel({ name: 'Veritasium', quality: 'mid', video_limit: 5 }))

    expect(screen.getByRole('dialog', { name: 'Edit channel' })).toBeInTheDocument()
    expect(screen.getByText('Veritasium')).toBeInTheDocument()
    expect(screen.getByRole('combobox', { name: /Video quality/ })).toHaveTextContent('Mid')
    expect(screen.getByLabelText('Video limit')).toHaveValue(5)
  })
  it('sends only the changed quality', async () => {
    const { onSave, onOpenChange } = renderDialog(aChannel({ quality: 'high', video_limit: 5 }))
    const user = userEvent.setup()

    await user.click(screen.getByRole('combobox', { name: /Video quality/ }))
    await user.click(await screen.findByRole('option', { name: 'Low' }))
    await user.click(screen.getByRole('button', { name: 'Save' }))

    expect(onSave).toHaveBeenCalledExactlyOnceWith({ quality: 'low' })
    expect(onOpenChange).toHaveBeenCalledWith(false)
  })
})
