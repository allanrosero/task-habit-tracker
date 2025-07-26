import api from '@/lib/api'
import { tokenAtom, userAtom } from '@/atoms/auth'
import { useSetAtom } from 'jotai'
import { useRouter } from 'next/navigation'
import { toast } from "sonner"
import { useAtom } from 'jotai'
import { useEffect } from 'react'


export const useLogout = () => {
    const setToken = useSetAtom(tokenAtom)
    const setUser = useSetAtom(userAtom)
    const router = useRouter()

    return () => {
        setToken(null)
        setUser(null)
        router.push('/')
        toast.success('Logged out successfully')
    }
}

export const useAuthInit = () => {
    const [token] = useAtom(tokenAtom)
    const setUser = useSetAtom(userAtom)
    const router = useRouter()

    useEffect(() => {
        if (!token) return

        api
            .get('/auth/me', {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => setUser(res.data))
            .catch(() => {
                setUser(null)
                toast.error('Session expired')
                router.push('/')
            })
    }, [token])
}
