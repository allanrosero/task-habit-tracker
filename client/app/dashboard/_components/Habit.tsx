'use client'

import { useEffect, useState } from 'react'
import { useAtomValue } from 'jotai'
import { tokenAtom } from '@/atoms/auth'
import api from '@/lib/api'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'
import EditHabitDialog from '@/components/habit/EditHabitDialog'
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
} from "@/components/ui/card"

type Habit = {
    id: string
    name: string
    description?: string
    frequency: 'daily' | 'weekly' | 'monthly'
    startDate: string
    isActive: boolean
}

export default function Habits() {
    const token = useAtomValue(tokenAtom)
    const [habits, setHabits] = useState<Habit[]>([])
    const [form, setForm] = useState({
        name: '',
        description: '',
        frequency: 'daily',
        startDate: '',
    })

    const fetchHabits = async () => {
        try {
            const res = await api.get('/habits', {
                headers: { Authorization: `Bearer ${token}` },
            })
            setHabits(res.data)
        } catch {
            toast.error('Failed to fetch habits')
        }
    }

    useEffect(() => {
        if (token) fetchHabits()
    }, [token])

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            await api.post('/habits', form, {
                headers: { Authorization: `Bearer ${token}` },
            })
            toast.success('Habit added!')
            setForm({ name: '', description: '', frequency: 'daily', startDate: '' })
            fetchHabits()
        } catch {
            toast.error('Failed to create habit')
        }
    }

    const handleDelete = async (id: string) => {
        try {
            await api.delete(`/habits/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            toast.success('Habit deleted')
            fetchHabits()
        } catch {
            toast.error('Failed to delete habit')
        }
    }

    const toggleStatus = async (habit: Habit) => {
        try {
            await api.put(`/habits/${habit.id}`, {
                isActive: !habit.isActive,
            }, {
                headers: { Authorization: `Bearer ${token}` },
            })
            fetchHabits()
        } catch {
            toast.error('Failed to update habit')
        }
    }

    return (
        <Card className="w-full h-full">
            <CardHeader>
                <CardTitle>   <h1 className="text-xl font-bold">My Habits</h1></CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <form onSubmit={handleCreate} className="space-y-2">
                    <Input
                        placeholder="Habit name"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        required
                    />
                    <Input
                        placeholder="Description"
                        value={form.description}
                        onChange={(e) => setForm({ ...form, description: e.target.value })}
                    />
                    <select
                        className="border rounded p-2 w-full"
                        value={form.frequency}
                        onChange={(e) => setForm({ ...form, frequency: e.target.value })}
                    >
                        <option value="daily">Daily</option>
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                    </select>
                    <Input
                        type="date"
                        value={form.startDate}
                        onChange={(e) => setForm({ ...form, startDate: e.target.value })}
                        required
                    />
                    <Button type="submit">Add Habit</Button>
                </form>

                <ul className="space-y-3 ">
                    {habits.map((habit) => (
                        <li key={habit.id} className="border p-4 rounded flex justify-between items-center">
                            <div onClick={() => toggleStatus(habit)} className="cursor-pointer">
                                <p className={`font-medium ${!habit.isActive ? 'line-through text-gray-400' : ''}`}>
                                    {habit.name}
                                </p>
                                <p className="text-sm text-muted-foreground">{habit.frequency}</p>
                            </div>
                            <div className='flex gap-2'>
                                <EditHabitDialog habit={habit} onUpdate={fetchHabits} />
                                <Button size="sm" variant="outline" onClick={() => handleDelete(habit.id)}>
                                    Delete
                                </Button>
                            </div>

                        </li>
                    ))}
                </ul>
            </CardContent>
        </Card>
    )
}
