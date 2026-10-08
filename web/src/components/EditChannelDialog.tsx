import { useState } from 'react'
import type { UpdateChannelRequest } from '@/api/client'
import type { ChannelListItem } from '@/api/types'
import type { ChannelSettingsForm } from '@/lib/channelSettings'
import { VideoQualityField } from './VideoQualityField'
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface EditChannelDialogProps {
  channel: ChannelListItem
  open: boolean
  onOpenChange: (open: boolean) => void
  /** Sends the changes; rejects to keep the dialog open with the error. */
  onSave: (changes: UpdateChannelRequest) => Promise<void>
}

export function EditChannelDialog({ channel, open, onOpenChange }: EditChannelDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="gap-5 p-6 sm:max-w-md">
        <DialogTitle>Edit channel</DialogTitle>
        <DialogDescription>{channel.name}</DialogDescription>
        {/* The form unmounts with the dialog, so every open starts from the
            channel's current settings. */}
        <EditChannelForm channel={channel} />
      </DialogContent>
    </Dialog>
  )
}

function EditChannelForm({ channel }: { channel: ChannelListItem }) {
  const [form, setForm] = useState<ChannelSettingsForm>({
    quality: channel.quality,
    video_limit: String(channel.video_limit),
  })

  const setField = (field: keyof ChannelSettingsForm) => (event: { target: { value: string } }) => {
    const value = event.target.value
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <form className="flex min-w-0 flex-col gap-5">
      <VideoQualityField
        id="edit-channel-quality"
        value={form.quality}
        onChange={setField('quality')}
      />
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="edit-channel-video-limit">Video limit</Label>
        <Input
          id="edit-channel-video-limit"
          type="number"
          min="1"
          max="1000"
          step="1"
          value={form.video_limit}
          onChange={setField('video_limit')}
          required
        />
      </div>
    </form>
  )
}
