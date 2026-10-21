import type { InputTextDesignTokens } from '@primeuix/themes/types/inputtext'

export const inputTextTheme: InputTextDesignTokens = {
  root: {
    color: '{text.color}',
    background: 'var(--p-background-color)',
    borderColor: 'var(--p-background-color)',
    hoverBorderColor: '{primary.500}',
    focusBorderColor: '{primary.600}',
  },
}
