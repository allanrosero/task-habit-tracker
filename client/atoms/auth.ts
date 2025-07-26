import { atom } from 'jotai'

export const tokenAtom = atom<string | null>(null)
export const userAtom = atom<{ name: string; email: string } | null>(null)
