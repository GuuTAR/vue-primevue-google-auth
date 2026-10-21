import { LANGUAGE } from '@/enum/global'
import type { SupportLang } from '@/types/SupportLang'

export const LANGUAGE_OPTIONS: SupportLang[] = [
  { value: LANGUAGE.ENGLISH, label: 'English' },
  { value: LANGUAGE.THAI, label: 'ไทย' },
]

export const TABLET_BREAKPOINT: number = 900
export const MOBILE_BREAKPOINT: number = 600
