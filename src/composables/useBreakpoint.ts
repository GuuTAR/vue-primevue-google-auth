import { onScopeDispose, readonly, ref } from 'vue'

import { MOBILE_BREAKPOINT, TABLET_BREAKPOINT } from '@/data/global'

const useMediaQuery = (query: string) => {
  const mediaQuery = window.matchMedia(query)
  const matches = ref(mediaQuery.matches)

  const listener = (event: MediaQueryListEvent) => {
    matches.value = event.matches
  }
  mediaQuery.addEventListener('change', listener)
  onScopeDispose(() => mediaQuery.removeEventListener('change', listener))

  return readonly(matches)
}

export function useBreakpoint() {
  const isMobile = useMediaQuery(`(max-width: ${MOBILE_BREAKPOINT}px)`)
  const isTablet = useMediaQuery(
    `(min-width: ${MOBILE_BREAKPOINT + 1}px) and (max-width: ${TABLET_BREAKPOINT}px)`,
  )
  const isDesktop = useMediaQuery(`(min-width: ${TABLET_BREAKPOINT + 1}px)`)

  return { isMobile, isTablet, isDesktop }
}
