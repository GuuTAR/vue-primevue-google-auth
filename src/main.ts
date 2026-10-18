import '@/assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'

import { CONFIG } from '@/config'

import App from '@/App.vue'

import router from '@/router'

import { primeVueTheme } from '@/theme'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.use(PrimeVue, {
  theme: primeVueTheme,
  license: CONFIG.PRIMEUI_LICENSE,
})

app.mount('#app')
