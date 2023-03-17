/* eslint-disable @typescript-eslint/no-unused-vars */
import { MantineColor } from "@mantine/core";
import { MantineThemeColors } from "@mantine/core";
import { MantineThemeOverride } from "@mantine/core";
import * as fonts from "./fonts";

export const addMantineColor = (color: string): MantineThemeColors[MantineColor] => {
    return [color, color, color, color, color, color, color, color, color, color];
};

const { FuturaFont, MontserratFont, ManropeFont } = fonts;

export const defaultTheme: MantineThemeOverride = {
    colorScheme: "light",
    fontFamily: ManropeFont.style.fontFamily,
    primaryColor: "primary",
    colors: {
        primary: addMantineColor("#CC9A6C"),
        primaryHover: addMantineColor("#CA905B"),
        primary16: addMantineColor("rgba(204, 154, 108, 0.16)"),
        primary8: addMantineColor("rgba(204, 154, 108, 0.08)"),
        secondary: addMantineColor("#D6913D"),
        secondaryHover: addMantineColor("#DA851F"),
        secondary16: addMantineColor("rgba(225, 144, 46, 0.16)"),
        secondary8: addMantineColor("rgba(225, 144, 46, 0.8)"),
        dark: addMantineColor("#02062E"),
        gray45: addMantineColor("rgba(0, 4, 41, 0.45)"),
        gray20: addMantineColor("rgba(0, 4, 41, 0.2)"),
        grayLight: addMantineColor("#EDEDF0"),
        light: addMantineColor("#F7F7F7"),
        white: addMantineColor("#FFFFFF"),
        white56: addMantineColor("rgba(255, 255, 255, 0.56)"),
        white16: addMantineColor("rgba(255, 255, 255, 0.16)"),
        info: addMantineColor("#3C4FF5"),
        info16: addMantineColor("rgba(122, 136, 255, 0.16)"),
        done: addMantineColor("#2DCC46"),
        doneDark: addMantineColor("#00AA1B"),
        done16: addMantineColor("#rgba(0, 216, 35, 0.16)"),
        error: addMantineColor("#FFB119"),
        errorDark: addMantineColor("#E59700"),
        error16: addMantineColor("rgba(255, 177, 25, 0.16)"),
        warning: addMantineColor("#F23218"),
        warning16: addMantineColor("rgba(242, 50, 24, 0.16)"),
        background: addMantineColor("#F7F7F7"),
        neutral_gray: addMantineColor("#00042973"),
        shadowGray: addMantineColor("#00126e"),
    },
    defaultRadius: "sm",
    fontSizes: {
        xs: 10,
        sm: 12,
        md: 14,
        lg: 16,
        xl: 20,
    },
    headings: {
        fontFamily: ManropeFont.style.fontFamily,
        fontWeight: ManropeFont.style.fontWeight,

        sizes: {
            h1: {
                fontSize: 32,
                lineHeight: "40px",
                fontWeight: 600,
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
            styles: () => ({
                root: {
                    // position: "relative",
                    // border: `1px solid ${theme.fn.darken(theme.primaryColor, 0.2)}`,
                    // padding: "1.1rem",
                    // borderRadius: theme.fn.radius(theme.defaultRadius),
                },
            }),
        },
        Select: {
            styles: (theme) => ({
                item: {
                    padding: 12,
                    ":hover": {
                        backgroundColor: theme.colors.primary8[0],
                        borderRadius: 8,
                    },
                    "&[data-selected]": {
                        backgroundColor: theme.colors.primary8[0],
                        borderRadius: 8,
                        color: theme.colors.dark[0],
                        ":hover": {
                            backgroundColor: theme.colors.primary8[0],
                            borderRadius: 8,
                        },
                    },
                },
            }),
        },
        DatePicker: {
            defaultProps: {
                inputFormat: "DD/MM/YYYY",
                locale: "ru",
            },
            styles: (theme) => ({
                day: {
                    ":hover": {
                        backgroundColor: theme.colors.primary16[0],
                    },
                },
            }),
        },
        Button: {
            styles: () => ({
                root: {
                    fontFamily: ManropeFont.style.fontFamily,
                    fontWeight: 600,
                    borderRadius: 8,
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
