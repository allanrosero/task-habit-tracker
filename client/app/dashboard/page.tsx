'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAtomValue } from 'jotai'
import { tokenAtom } from '@/atoms/auth'
import { Button } from '@/components/ui/button'
import { useLogout, useAuthInit } from '@/lib/auth'
import Habits from './_components/Habit'
import Tasks from './_components/Task'


export default function DashboardPage() {
    const token = useAtomValue(tokenAtom)
    const [hydrated, setHydrated] = useState(false)
    const router = useRouter()
    const logout = useLogout()

    useEffect(() => {
        setHydrated(true)
    }, [])

    useAuthInit()

    useEffect(() => {
        if (hydrated && !token) {
            router.replace('/')
        }
    }, [hydrated, token])






    return (
        <main className="p-4 max-w-full mx-auto">
            <div className="flex justify-between items-center">
                <Button variant="destructive" onClick={logout}>
                    Logout
                </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 w-full">
                <Tasks />
                <Habits />
            </div>





        </main >
    )
}
