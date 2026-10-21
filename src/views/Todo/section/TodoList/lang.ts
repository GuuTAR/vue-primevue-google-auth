import { LANGUAGE, TODO_FILTER } from '@/enum/global'

export const EMPTY_TITLE: Record<TODO_FILTER, Record<LANGUAGE, string>> = {
  [TODO_FILTER.ALL]: {
    [LANGUAGE.ENGLISH]: 'No tasks yet',
    [LANGUAGE.THAI]: 'ยังไม่มีงาน',
  },
  [TODO_FILTER.ACTIVE]: {
    [LANGUAGE.ENGLISH]: 'Nothing left to do',
    [LANGUAGE.THAI]: 'ไม่มีงานค้าง',
  },
  [TODO_FILTER.COMPLETED]: {
    [LANGUAGE.ENGLISH]: 'No completed tasks',
    [LANGUAGE.THAI]: 'ยังไม่มีงานที่เสร็จ',
  },
}

export const EMPTY_DESCRIPTION: Record<TODO_FILTER, Record<LANGUAGE, string>> = {
  [TODO_FILTER.ALL]: {
    [LANGUAGE.ENGLISH]: 'Add your first task to get started.',
    [LANGUAGE.THAI]: 'เพิ่มงานแรกของคุณเพื่อเริ่มต้น',
  },
  [TODO_FILTER.ACTIVE]: {
    [LANGUAGE.ENGLISH]: 'Every task is completed.',
    [LANGUAGE.THAI]: 'ทุกงานเสร็จเรียบร้อย',
  },
  [TODO_FILTER.COMPLETED]: {
    [LANGUAGE.ENGLISH]: 'Check off a task to see it here.',
    [LANGUAGE.THAI]: 'ทำเครื่องหมายงานเพื่อแสดงที่นี่',
  },
}

export const DELETE_TASK: Record<LANGUAGE, string> = {
  [LANGUAGE.ENGLISH]: 'Delete task',
  [LANGUAGE.THAI]: 'ลบงาน',
}

export const LOADING: Record<LANGUAGE, string> = {
  [LANGUAGE.ENGLISH]: 'Loading tasks...',
  [LANGUAGE.THAI]: 'กำลังโหลดงาน...',
}
