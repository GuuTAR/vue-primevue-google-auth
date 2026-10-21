import { LANGUAGE, TODO_FILTER } from '@/enum/global'

export const FILTER_LABEL: Record<TODO_FILTER, Record<LANGUAGE, string>> = {
  [TODO_FILTER.ALL]: {
    [LANGUAGE.ENGLISH]: 'All',
    [LANGUAGE.THAI]: 'ทั้งหมด',
  },
  [TODO_FILTER.ACTIVE]: {
    [LANGUAGE.ENGLISH]: 'Active',
    [LANGUAGE.THAI]: 'ค้างอยู่',
  },
  [TODO_FILTER.COMPLETED]: {
    [LANGUAGE.ENGLISH]: 'Completed',
    [LANGUAGE.THAI]: 'เสร็จแล้ว',
  },
}

export const CLEAR_COMPLETED: Record<LANGUAGE, string> = {
  [LANGUAGE.ENGLISH]: 'Clear completed',
  [LANGUAGE.THAI]: 'ล้างงานที่เสร็จ',
}
