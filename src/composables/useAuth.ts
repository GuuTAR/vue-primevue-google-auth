import { useRouter } from 'vue-router'

import { useToast } from 'primevue'

import {
  AUTH_UNAVAILABLE_MESSAGE,
  LOGIN_SUCCESS_MESSAGE,
  LOGOUT_SUCCESS_MESSAGE,
} from '@/lang/auth'

import { useAppDataStore } from '@/stores/appData'

export function useAuth() {
  const router = useRouter()
  const toast = useToast()

  const appData = useAppDataStore()

  const loginGoogle = () => {
    toast.add({
      severity: 'error',
      summary: AUTH_UNAVAILABLE_MESSAGE[appData.language],
      life: 30000,
    })
  }

  const loginDemo = () => {
    router.push({ name: 'home' })
    toast.add({
      severity: 'success',
      summary: LOGIN_SUCCESS_MESSAGE[appData.language],
      life: 30000,
    })
  }

  const logout = () => {
    router.push({ name: 'login' })
    toast.add({
      severity: 'success',
      summary: LOGOUT_SUCCESS_MESSAGE[appData.language],
      life: 3000,
    })
  }

  return {
    loginGoogle,
    loginDemo,
    logout,
  }
}
