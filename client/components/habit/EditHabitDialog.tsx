'use client'

import { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import api from '@/lib/api'
import { tokenAtom } from '@/atoms/auth'
import { useAtomValue } from 'jotai'
import { toast } from 'sonner'

type Props = {
    habit: {
        id: string
        name: string
        description?: string
        frequency: 'daily' | 'weekly' | 'monthly'
        startDate: string
    }
    onUpdate: () => void
}

export default function EditHabitDialog({ habit, onUpdate }: Props) {
    const token = useAtomValue(tokenAtom)
    const [open, setOpen] = useState(false)
    const [form, setForm] = useState<{
        name: string
        description: string
        frequency: 'daily' | 'weekly' | 'monthly'
        startDate: string
    }>({
        name: habit.name,
        description: habit.description || '',
        frequency: habit.frequency,
        startDate: habit.startDate.slice(0, 10),
    })


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        try {
            await api.put(`/habits/${habit.id}`, form, {
                headers: { Authorization: `Bearer ${token}` },
            })
            toast.success('Habit updated')
            setOpen(false)
            onUpdate()
        } catch {
            toast.error('Failed to update habit')
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                    Edit
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Habit</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-3 mt-4">
                    <Input
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="Name"
                        required
                    />
                    <Input
                        value={form.description}
                        onChange={(e) => setForm({ ...form, description: e.target.value })}
                        placeholder="Description"
                    />
                    <select
                        className="border rounded p-2 w-full"
                        value={form.frequency}
                        onChange={(e) =>
                            setForm({ ...form, frequency: e.target.value as 'daily' | 'weekly' | 'monthly' })
                        }
                    >
                        <option value="daily">Daily</option>
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                    </select>
                    <Input
                        type="date"
                        value={form.startDate}
                        onChange={(e) => setForm({ ...form, startDate: e.target.value })}
                    />
                    <Button type="submit" className="w-full">
                        Save Changes
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    )
}
