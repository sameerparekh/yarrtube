import type { UpdateChannelRequest } from '@/api/client'
import type { ChannelListItem } from '@/api/types'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'

interface EditChannelDialogProps {
  channel: ChannelListItem
  open: boolean
  onOpenChange: (open: boolean) => void
  /** Sends the changes; rejects to keep the dialog open with the error. */
  onSave: (changes: UpdateChannelRequest) => Promise<void>
}

export function EditChannelDialog({ open, onOpenChange }: EditChannelDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogTitle>Edit channel</DialogTitle>
      </DialogContent>
    </Dialog>
  )
}
