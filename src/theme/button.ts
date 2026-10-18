import type { ButtonDesignTokens } from '@primeuix/themes/types/button'

export const buttonTheme: ButtonDesignTokens = {
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
          color: '#FFFFFF',
          hoverColor: '#FFFFFF',
          activeColor: '#FFFFFF',
          focusRing: {
            color: '{primary.500}',
            shadow: '0 0 0 0.2rem rgba(45, 127, 249, 0.2)',
          },
        },
      },
    },
  },
}
