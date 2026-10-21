import { LANGUAGE } from '@/enum/global'

export const TITLE: Record<LANGUAGE, string> = {
  [LANGUAGE.ENGLISH]: 'My tasks',
  [LANGUAGE.THAI]: 'งานของฉัน',
}

export const GREETING: Record<LANGUAGE, string> = {
  [LANGUAGE.ENGLISH]: "Here's what's on your plate today.",
  [LANGUAGE.THAI]: 'นี่คือสิ่งที่คุณต้องทำวันนี้',
}
