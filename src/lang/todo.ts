import { LANGUAGE } from '@/enum/global'

export const TODO_CREATED_MESSAGE: Record<LANGUAGE, string> = {
  [LANGUAGE.ENGLISH]: 'Todo created successfully!',
  [LANGUAGE.THAI]: 'สร้างงานสำเร็จ!',
}

export const TODO_DELETED_MESSAGE: Record<LANGUAGE, string> = {
  [LANGUAGE.ENGLISH]: 'Todo deleted successfully!',
  [LANGUAGE.THAI]: 'ลบงานสำเร็จ!',
}

export const TODO_CLEARED_MESSAGE: Record<LANGUAGE, string> = {
  [LANGUAGE.ENGLISH]: 'Completed todos cleared!',
  [LANGUAGE.THAI]: 'ล้างงานที่เสร็จแล้ว!',
}
