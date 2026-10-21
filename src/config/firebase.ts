import { initializeApp } from 'firebase/app'
import { type Auth, getAuth } from 'firebase/auth'

import { CONFIG } from '@/config'

const isFirebaseConfigured = Object.values(CONFIG.FIREBASE).every(Boolean)

// null when the VITE_FIREBASE_* variables are missing, so the app still runs without Firebase
export const auth: Auth | null = isFirebaseConfigured
  ? getAuth(initializeApp(CONFIG.FIREBASE))
  : null
