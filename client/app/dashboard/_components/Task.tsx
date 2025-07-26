'use client'

import { useState, useEffect } from 'react'
import { useAtomValue } from 'jotai'
import { tokenAtom } from '@/atoms/auth'
import api from '@/lib/api'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import EditTaskDialog from '@/components/task/EditTaskDialog'
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
} from "@/components/ui/card"



type Task = {
    id: string
    title: string
    isCompleted: boolean
}


export default function Tasks() {
    const token = useAtomValue(tokenAtom)
    const [tasks, setTasks] = useState<Task[]>([])
    const [title, setTitle] = useState('')
    const fetchTasks = async () => {
        try {
            const res = await api.get('/tasks', {
                headers: { Authorization: `Bearer ${token}` },
            })
            setTasks(res.data)
        } catch (err) {
            console.error('Failed to fetch tasks')
        }
    }

    const handleAdd = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!title.trim()) return

        try {
            await api.post(
                '/tasks',
                { title },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            )
            setTitle('')
            fetchTasks()
        } catch {
            console.error('Failed to create task')
        }
    }

    const toggleComplete = async (task: Task) => {
        try {
            await api.put(
                `/tasks/${task.id}`,
                { isCompleted: !task.isCompleted },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            )
            fetchTasks()
        } catch {
            console.error('Failed to update task')
        }
    }

    const deleteTask = async (id: string) => {
        try {
            await api.delete(`/tasks/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            fetchTasks()
        } catch {
            console.error('Failed to delete task')
        }
    }

    useEffect(() => {
        if (token) fetchTasks()
    }, [token])


    return (
        <Card className="w-full h-full ">
            <CardHeader>
                <CardTitle><h1 className="text-2xl font-bold">My Tasks</h1></CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <form onSubmit={handleAdd} className="flex gap-2">
                    <Input
                        placeholder="Enter new task"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <Button type="submit">Add</Button>
                </form>

                <ul className="space-y-2">
                    {tasks.map((task) => (
                        <li
                            key={task.id}
                            className="flex items-center justify-between border p-3 rounded"
                        >
                            <span
                                onClick={() => toggleComplete(task)}
                                className={` w-full break-words whitespace-normal cursor-pointer ${task.isCompleted ? 'line-through text-gray-500' : ''
                                    }`}
                            >
                                {task.title}
                            </span>
                            <div className='flex gap-2'>
                                <EditTaskDialog task={task}
                                    onUpdate={fetchTasks} />
                                <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => deleteTask(task.id)}
                                >
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
