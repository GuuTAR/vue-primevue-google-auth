import type { ToggleButtonDesignTokens } from '@primeuix/themes/types/togglebutton'

export const toggleButtonTheme: ToggleButtonDesignTokens = {
  root: {
    background: 'var(--p-background-color)',
    hoverBackground: '{primary.600}',
    borderColor: '{primary.500}',
    color: '{primary.500}',
    hoverColor: '{primary.0}',
    checkedBackground: '{primary.500}',
    checkedBorderColor: '{primary.500}',
  },
  content: {
    checkedBackground: '{primary.500}',
  },
}
