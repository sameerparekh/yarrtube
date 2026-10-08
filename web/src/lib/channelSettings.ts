import type { UpdateChannelRequest } from '@/api/client'
import type { ChannelListItem } from '@/api/types'

/** The edit channel dialog's fields, as entered. */
export interface ChannelSettingsForm {
  quality: string
  video_limit: string
}

/** The settings the form changes from the channel's current ones; `{}` when none. */
export function channelSettingsChanges(
  _current: Pick<ChannelListItem, 'quality' | 'video_limit'>,
  _form: ChannelSettingsForm,
): UpdateChannelRequest {
  return {}
}

/** Whether the entered video limit is below the channel's current one. */
export function lowersVideoLimit(_currentLimit: number, _entered: string): boolean {
  return false
}
