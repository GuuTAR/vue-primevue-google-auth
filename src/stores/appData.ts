import { ref } from 'vue'

import { defineStore } from 'pinia'

import { LANGUAGE } from '@/enum/global'

export const useAppDataStore = defineStore('appData', () => {
  const displayName = ref<string>('')
  const setDisplayName = (newDisplayName: string) => {
    displayName.value = newDisplayName
  }

  const language = ref<LANGUAGE>(
    (() => {
      const storedLanguage = localStorage.getItem('language')
      const isLanguage: boolean = Object.values<string | null>(LANGUAGE).includes(storedLanguage)
      return isLanguage ? (storedLanguage as LANGUAGE) : LANGUAGE.ENGLISH
    })(),
  )
  const setLanguage = (newLanguage: LANGUAGE) => {
    language.value = newLanguage
    localStorage.setItem('language', newLanguage)
  }

  return { displayName, setDisplayName, language, setLanguage }
})
