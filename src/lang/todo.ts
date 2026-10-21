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

export const TODO_CREATE_FAILURE_MESSAGE: Record<LANGUAGE, string> = {
  [LANGUAGE.ENGLISH]: 'Failed to create todo!',
  [LANGUAGE.THAI]: 'สร้างงานไม่สำเร็จ!',
}

export const TODO_UPDATE_FAILURE_MESSAGE: Record<LANGUAGE, string> = {
  [LANGUAGE.ENGLISH]: 'Failed to update todo!',
  [LANGUAGE.THAI]: 'อัปเดตงานไม่สำเร็จ!',
}

export const TODO_DELETE_FAILURE_MESSAGE: Record<LANGUAGE, string> = {
  [LANGUAGE.ENGLISH]: 'Failed to delete todo!',
  [LANGUAGE.THAI]: 'ลบงานไม่สำเร็จ!',
}
