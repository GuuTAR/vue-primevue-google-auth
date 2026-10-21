import { ref } from 'vue'
import { useRouter } from 'vue-router'

import { useToast } from 'primevue'

import { FirebaseError } from 'firebase/app'
import {
  GoogleAuthProvider,
  signInAnonymously,
  signInWithPopup,
  signOut,
  updateProfile,
  type User,
} from 'firebase/auth'

import { auth } from '@/config/firebase'

import { LANGUAGE } from '@/enum/global'

import { DEMO_DISPLAY_NAME } from '@/data/user'

import {
  AUTH_UNAVAILABLE_MESSAGE,
  LOGIN_FAILURE_MESSAGE,
  LOGIN_SUCCESS_MESSAGE,
  LOGOUT_FAILURE_MESSAGE,
  LOGOUT_SUCCESS_MESSAGE,
} from '@/lang/auth'

import { useAppDataStore } from '@/stores/appData'
import { useAuthStore } from '@/stores/auth'
import { useTodoStore } from '@/stores/todo'

// Closing or replacing the Google popup is a user choice, not a failure worth a toast
const DISMISSED_POPUP_CODES = ['auth/popup-closed-by-user', 'auth/cancelled-popup-request']

export function useAuth() {
  const router = useRouter()
  const toast = useToast()

  const appData = useAppDataStore()
  const authStore = useAuthStore()
  const todoStore = useTodoStore()

  const isLoading = ref(false)

  const showToast = (
    severity: 'success' | 'error',
    message: Record<LANGUAGE, string>,
    life: number,
  ) => {
    toast.add({ severity, summary: message[appData.language], life })
  }

  const completeLogin = async (user: User) => {
    authStore.setUser(user)
    await router.push({ name: 'home' })
    showToast('success', LOGIN_SUCCESS_MESSAGE, 3000)
  }

  const loginGoogle = async () => {
    if (!auth) return showToast('error', AUTH_UNAVAILABLE_MESSAGE, 3000)

    isLoading.value = true
    try {
      const { user } = await signInWithPopup(auth, new GoogleAuthProvider())
      await completeLogin(user)
    } catch (error) {
      const isDismissed =
        error instanceof FirebaseError && DISMISSED_POPUP_CODES.includes(error.code)
      if (!isDismissed) showToast('error', LOGIN_FAILURE_MESSAGE, 3000)
    } finally {
      isLoading.value = false
    }
  }

  const loginDemo = async () => {
    if (!auth) return showToast('error', AUTH_UNAVAILABLE_MESSAGE, 3000)

    isLoading.value = true
    try {
      const { user } = await signInAnonymously(auth)
      if (!user.displayName) await updateProfile(user, { displayName: DEMO_DISPLAY_NAME })
      await completeLogin(user)
    } catch {
      showToast('error', LOGIN_FAILURE_MESSAGE, 3000)
    } finally {
      isLoading.value = false
    }
  }

  const logout = async () => {
    if (!auth) return

    try {
      await signOut(auth)
      authStore.setUser(null)
      todoStore.resetTodos()
      await router.push({ name: 'login' })
      showToast('success', LOGOUT_SUCCESS_MESSAGE, 3000)
    } catch {
      showToast('error', LOGOUT_FAILURE_MESSAGE, 3000)
    }
  }

  return {
    isLoading,
    loginGoogle,
    loginDemo,
    logout,
  }
}
