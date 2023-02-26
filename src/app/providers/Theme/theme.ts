/* eslint-disable @typescript-eslint/no-unused-vars */
import { MantineColor } from "@mantine/core";
import { MantineThemeColors } from "@mantine/core";
import { MantineThemeOverride } from "@mantine/core";
import * as fonts from './fonts';

export const addMantineColor = (color: string): MantineThemeColors[MantineColor] => {
    return [color, color, color, color, color, color, color, color, color, color];
};


const { FuturaFont, MontserratFont } = fonts;


export const defaultTheme: MantineThemeOverride = {
    colorScheme: 'light',
    fontFamily: FuturaFont.style.fontFamily,
    primaryColor: 'primary',
    colors: {
        background: addMantineColor("#F7F7F7"),
        primary: addMantineColor('#D6913D'),
        neutral_gray: addMantineColor('#00042973')
    },
    defaultRadius: "sm",
    headings: {
        fontFamily: MontserratFont.style.fontFamily,
        fontWeight: MontserratFont.style.fontWeight,

        sizes: {
            h1: {
                fontSize: 32,
                lineHeight: "39px",
                fontWeight: 700,
            },
            h2: {
                fontSize: 24,
                lineHeight: "30px",
                fontWeight: 700,
            },
            h3: {
                fontSize: 20,
                lineHeight: "27px",
                fontWeight: 700,
            },
            h4: {
                fontSize: 16,
                lineHeight: "22px",
            },
            h5: {
                fontSize: 15,
                fontWeight: 22,
            },
        },
    },
    components: {
        BaseForm: {
            styles: (theme) => ({
                root: {
                    position: "relative",
                    border: `1px solid ${theme.fn.darken(theme.primaryColor, 0.2)}`,
                    padding: "1.1rem",
                    borderRadius: theme.fn.radius(theme.defaultRadius),
                },
            }),
        },
    },
};
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
