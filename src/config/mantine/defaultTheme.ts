import { MantineThemeOverride } from "@mantine/core";
import { Montserrat } from '@next/font/google'
import localFont from '@next/font/local'

// Font files can be colocated inside of `pages`
const _FuturaPT = localFont({
    src: [
        { path: '../../../public/fonts/FuturaPT/FuturaPT-Bold.woff', style: 'normal', weight: 'bold' },
        { path: '../../../public/fonts/FuturaPT/FuturaPT-Book.woff', style: 'normal', weight: 'normal' }
    ],
})

const MontserratFont = Montserrat({ subsets: ['latin'] });

export const deafultTheme: MantineThemeOverride = {
    colorScheme: 'light',
    fontFamily: "FuturaPT-Book",
    defaultRadius: "sm",
    headings: {
        fontFamily: MontserratFont.className,
        fontWeight: MontserratFont.style.fontWeight,

        sizes: {
            h1: {
                fontSize: 32,
                lineHeight: 39,
                fontWeight: 700,
            },
            h2: {
                fontSize: 24,
                lineHeight: 30,
                fontWeight: 700
            },
            h3: {
                fontSize: 20,
                lineHeight: 27,
                fontWeight: 700
            },
            h4: {
                fontSize: 16,
                lineHeight: 22,
            },
            h5: {
                fontSize: 15,
                fontWeight: 22
            }
        }
    },
    components: {
        BaseForm: {
            styles: (theme) => ({
                root: {
                    position: 'relative',
                    'border': `1px solid ${theme.primaryColor}`,
                    padding: '1.5rem',
                    borderRadius: theme.fn.radius(theme.defaultRadius)
                },
            })
        }


    }
}
/**root: {
    position: 'relative',
  },

  label: {
    position: 'absolute',
    zIndex: 2,
    top: 7,
    left: theme.spacing.sm,
    pointerEvents: 'none',
    color: floating
      ? theme.colorScheme === 'dark'
        ? theme.white
        : theme.black
      : theme.colorScheme === 'dark'
      ? theme.colors.dark[3]
      : theme.colors.gray[5],
    transition: 'transform 150ms ease, color 150ms ease, font-size 150ms ease',
    transform: floating ? `translate(-${theme.spacing.sm}px, -28px)` : 'none',
    fontSize: floating ? theme.fontSizes.xs : theme.fontSizes.sm,
    fontWeight: floating ? 500 : 400,
  },

  required: {
    transition: 'opacity 150ms ease',
    opacity: floating ? 1 : 0,
  },

  input: {
    '&::placeholder': {
      transition: 'color 150ms ease',
      color: !floating ? 'transparent' : undefined,
    },
  },


     Input: {            
            styles: (theme, floating = true) => ({
                root: {
                    position: 'relative',
                },
                label: {
                    position: 'absolute',
                    zIndex: 2,
                    top: 7,
                    left: theme.spacing.sm,
                    pointerEvents: 'none',
                    color: floating
                        ? theme.colorScheme === 'dark'
                            ? theme.white
                            : theme.black
                        : theme.colorScheme === 'dark'
                            ? theme.colors.dark[3]
                            : theme.colors.gray[5],
                    transition: 'transform 150ms ease, color 150ms ease, font-size 150ms ease',
                    transform: floating ? `translate(-${theme.spacing.sm}px, -28px)` : 'none',
                    fontSize: floating ? theme.fontSizes.xs : theme.fontSizes.sm,
                    fontWeight: floating ? 500 : 400,
                },
                input: {
                    borderRadius: theme.defaultRadius,
                    '&::placeholder': {
                        transition: 'color 150ms ease',
                        color: !floating ? 'transparent' : undefined,
                    }

                },
                required: {
                    transition: 'opacity 150ms ease',
                    opacity: floating ? 1 : 0,
                },



            })
        },
        InputWrapper: {
            styles: (theme) => ({
                error: {
                    color: theme.colors.black
                },
            }),
        },
})); */