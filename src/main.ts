import '@/assets/main.css'
import 'primeicons/primeicons.css'

import { createApp } from 'vue'

import { createPinia } from 'pinia'

import PrimeVue from 'primevue/config'
import ToastService from 'primevue/toastservice'

import { CONFIG } from '@/config'

import router from '@/router'

import { primeVueTheme } from '@/theme'

import App from '@/App.vue'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.use(PrimeVue, {
  theme: primeVueTheme,
  license: CONFIG.PRIMEUI_LICENSE,
})
app.use(ToastService)

app.mount('#app')
