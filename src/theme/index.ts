import { definePreset } from '@primeuix/themes'
import Aura from '@primeuix/themes/aura'

import { buttonTheme } from './button'
import { dividerTheme } from './divider'

const preset = definePreset(Aura, {
  semantic: {
    primary: {
      0: '#FFFFFF',
      50: '#EFF6FF',
      100: '#DBEAFE',
      200: '#BFDBFE',
      300: '#93C5FD',
      400: '#6BC4FF',
      500: '#2D7FF9',
      600: '#1B5FD6',
      700: '#0F4FCB',
      800: '#123E9A',
      900: '#0B1B3B',
    },
    colorScheme: {
      light: {
        text: {
          color: '#0B1B3B',
          hoverColor: '#0F4FCB',
          mutedColor: '#3A4A6E',
          hoverMutedColor: '#0B1B3B',
        },
      },
      dark: {
        text: {
          color: '#0B1B3B',
          hoverColor: '#0F4FCB',
          mutedColor: '#3A4A6E',
          hoverMutedColor: '#0B1B3B',
        },
      },
    },
  },
  components: {
    button: buttonTheme,
    divider: dividerTheme,
  },
  extend: {
    colorScheme: {
      light: {
        background: {
          color: '{primary.0}',
        },
      },
    },
  },
})

export const primeVueTheme = {
  preset,
}
