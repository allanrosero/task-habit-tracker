'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import api from '@/lib/api'
import { toast } from "sonner"

export default function RegisterPage() {
    const router = useRouter()
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            await api.post('/auth/register', form)
            toast.success('Registration successful!')
            router.push('/login')
        } catch (err: any) {
            toast.error(err?.response?.data?.message || 'Registration failed')

        }
    }

    return (
        <main className="flex items-center justify-center min-h-screen px-4">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-md space-y-4 border p-6 rounded shadow"
            >
                <h2 className="text-2xl font-bold text-center">Register</h2>
                <Input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={form.name}
                    onChange={handleChange}
                    required
                />
                <Input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    required
                />
                <Input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                    required
                />
                <Button type="submit" className="w-full">
                    Register
                </Button>
                <p className="text-sm text-center">
                    Already have an account?{' '}
                    <a href="/" className="underline text-blue-600">
                        Login
                    </a>
                </p>
            </form>
        </main>
    )
}
