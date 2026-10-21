import type { ButtonDesignTokens } from '@primeuix/themes/types/button'

export const buttonTheme: ButtonDesignTokens = {
  root: {
    borderRadius: '12px',
    gap: 'var(--app-spacing-4)',
  },
  colorScheme: {
    light: {
      root: {
        primary: {
          background: '{primary.500}',
          hoverBackground: '{primary.600}',
          activeBackground: '{primary.700}',
          borderColor: '{primary.500}',
          hoverBorderColor: '{primary.600}',
          activeBorderColor: '{primary.700}',
          color: '{primary.0}',
          hoverColor: '{primary.0}',
          activeColor: '{primary.0}',
        },
      },
      outlined: {
        primary: {
          hoverBackground: '{primary.100}',
          activeBackground: '{primary.200}',
          color: '{primary.900}',
          borderColor: '{primary.500}',
        },
      },

      text: {
        primary: {
          color: '{text.color}',
        },
      },
    },
  },
}
