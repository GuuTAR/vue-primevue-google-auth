import { computed, shallowRef } from 'vue'

import { defineStore } from 'pinia'

import { onAuthStateChanged, type User } from 'firebase/auth'

import { auth } from '@/config/firebase'

import { useAppDataStore } from '@/stores/appData'

export const useAuthStore = defineStore('auth', () => {
  const appData = useAppDataStore()

  const user = shallowRef<User | null>(null)

  const isAuthenticated = computed(() => user.value !== null)

  const setUser = (newUser: User | null) => {
    user.value = newUser
    appData.setDisplayName(newUser?.displayName ?? '')
  }

  // Resolves once Firebase has restored (or ruled out) a saved session
  const authReady = new Promise<void>((resolve) => {
    if (!auth) return resolve()
    onAuthStateChanged(auth, (newUser) => {
      setUser(newUser)
      resolve()
    })
  })

  const waitForAuthReady = () => authReady

  return { user, isAuthenticated, setUser, waitForAuthReady }
})
