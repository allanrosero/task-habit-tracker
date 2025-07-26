'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import api from '@/lib/api'
import { tokenAtom } from '@/atoms/auth'
import { useAtomValue } from 'jotai'

type Props = {
  task: {
    id: string
    title: string
    description?: string
    dueDate?: string
  }
  onUpdate: () => void
}

export default function EditTaskDialog({ task, onUpdate }: Props) {
  const token = useAtomValue(tokenAtom)
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({
    title: task.title,
    description: task.description || '',
    dueDate: task.dueDate ? task.dueDate.slice(0, 10) : '', // YYYY-MM-DD
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await api.put(`/tasks/${task.id}`, form, {
        headers: { Authorization: `Bearer ${token}` },
      })
      toast.success('Task updated')
      setOpen(false)
      onUpdate()
    } catch {
      toast.error('Failed to update task')
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">Edit</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Task</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <Input
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            placeholder="Title"
            required
          />
          <Input
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            placeholder="Description"
          />
          <Input
            type="date"
            value={form.dueDate}
            onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
          />
          <Button type="submit" className="w-full">Save</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
