import type { SidebarDesignTokens } from '@primeuix/themes/types/sidebar'

export const sidebarTheme: SidebarDesignTokens = {
  root: {
    borderColor: '{primary.50}',
  },
  layout: {
    background: '{background.color}',
  },
  header: {
    padding: 'var(--app-spacing-6) var(--app-spacing-6) var(--app-spacing-4)',
  },
  footer: {
    padding: 'var(--app-spacing-0) var(--app-spacing-0) var(--app-spacing-2)',
  },
  panel: {
    background: '{primary.0}',
    color: '{text.color}',
  },
  group: {
    padding: 'var(--app-spacing-2) var(--app-spacing-4)',
  },
  menu: {
    gap: 'var(--app-spacing-1)',
  },
  menuButton: {
    padding: 'var(--app-spacing-2) var(--app-spacing-5)',
    gap: 'var(--app-spacing-4)',
    height: '40px',
    borderRadius: '12px',
    fontSize: '14px',
    color: '{text.color}',
    focusBackground: '{background.color}',
    focusColor: '{text.color}',
    activeBackground: '{background.color}',
    activeColor: '{primary.700}',
  },
  main: {
    background: '{background.color}',
  },
}
