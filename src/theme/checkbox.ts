import type { CheckboxDesignTokens } from '@primeuix/themes/types/checkbox'

export const checkboxTheme: CheckboxDesignTokens = {
  root: {
    background: 'var(--p-background-color)',
    checkedHoverBackground: '{primary.500}',
    checkedBackground: '{primary.500}',
  },
  icon: {
    checkedColor: '{primary.0}',
    checkedHoverColor: '{primary.0}',
  },
}
