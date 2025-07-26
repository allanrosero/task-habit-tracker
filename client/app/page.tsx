'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import api from '@/lib/api'
import { toast } from "sonner"
import { useAtom } from 'jotai'
import { tokenAtom } from '@/atoms/auth'

export default function LoginPage() {
  const router = useRouter()
  const [form, setForm] = useState({ email: '', password: '' })
  const [, setToken] = useAtom(tokenAtom)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const res = await api.post('/auth/login', form)
      setToken(res.data.token)
      toast.success('Registration successful!')
      setTimeout(() => {
        router.push('/dashboard')
      }, 1000);
    } catch (err: any) {
      toast.error('Login failed')
    }
  }

  return (
    <main className="flex items-center justify-center min-h-screen px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md space-y-4 border p-6 rounded shadow"
      >
        <h2 className="text-2xl font-bold text-center">Login</h2>
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
          Login
        </Button>
        <p className="text-sm text-center">
          Don’t have an account?{' '}
          <a href="/register" className="underline text-blue-600">
            Register here
          </a>
        </p>
      </form>
    </main>
  )
}
