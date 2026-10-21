import { definePreset } from '@primeuix/themes'
import Aura from '@primeuix/themes/aura'

import { buttonTheme } from '@/theme/button'
import { checkboxTheme } from '@/theme/checkbox'
import { dividerTheme } from '@/theme/divider'
import { inputTextTheme } from '@/theme/inputtext'
import { sidebarTheme } from '@/theme/sidebar'
import { toastTheme } from '@/theme/toast'
import { toggleButtonTheme } from '@/theme/togglebutton'

const preset = definePreset(Aura, {
  semantic: {
    primary: {
      0: '#FFFFFF',
      50: '#F2F6FD',
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
    sidebar: sidebarTheme,
    toast: toastTheme,
    inputtext: inputTextTheme,
    togglebutton: toggleButtonTheme,
    checkbox: checkboxTheme,
  },
  extend: {
    colorScheme: {
      light: {
        background: {
          color: '{primary.50}',
        },
      },
    },
  },
})

export const primeVueTheme = {
  preset,
}
