import { atomWithStorage } from 'jotai/utils'

export const tokenAtom = atomWithStorage<string | null>('auth_token', null)
export const userAtom = atomWithStorage<any | null>('auth_user', null)
