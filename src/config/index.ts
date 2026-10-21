export const CONFIG = {
  PRIMEUI_LICENSE: import.meta.env.VITE_PRIMEUI_LICENSE,
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL,
  FIREBASE: {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
  },
}
