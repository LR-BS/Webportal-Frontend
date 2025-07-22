import { extendTheme, type ThemeOverride } from '@chakra-ui/react';

export const theme = extendTheme({
  colors: {
    yellow: {
      550: '#eab308',
    },
  },
  components: {
    Checkbox: {
      sizes: {
        sm: {
          control: {
            w: '6',
            h: '6',
          },
          icon: {
            fontSize: '0.8rem',
          },
          label: {
            fontSize: '0.8rem',
          },
        },
        md: {
          control: {
            w: '8',
            h: '8',
          },
          icon: {
            fontSize: '1.2rem',
          },
          label: {
            fontSize: '1.2rem',
          },
        },
        lg: {
          control: {
            w: '10',
            h: '10',
          },
          icon: {
            fontSize: '1.5rem',
          },
          label: {
            fontSize: '1.5rem',
          },
        },
      },
      parts: ['container', 'icon', 'label', 'control'],
    },
  },
} satisfies ThemeOverride);
