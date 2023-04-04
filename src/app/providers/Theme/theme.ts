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
        secondary8: addMantineColor("rgba(225, 144, 46, 0.08)"),
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
    breakpoints: {
        xs: 375,
        sm: 744,
        md: 1024,
        lg: 1440,
        xl: 1920,
    },
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
                lineHeight: "32px",
                fontWeight: 600,
            },
            h3: {
                fontSize: 20,
                lineHeight: "24px",
                fontWeight: 600,
            },
            h4: {
                fontSize: 18,
                lineHeight: "24px",
                fontWeight: 600,
            },
            h5: {
                fontSize: 15,
                fontWeight: 22,
            },
        },
    },
    components: {
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
        Modal: {
            styles: (theme) => ({
                title: {
                    fontWeight: 600,
                    fontSize: 20,
                    lineHeight: "24px",
                },
                modal: {
                    padding: "24px !important",
                    borderRadius: 16,
                    background: theme.colors.white[0],
                    boxShadow: "0px 16px 32px rgba(2, 6, 46, 0.08)",
                },
                close: {
                    svg: {
                        color: theme.colors.primary[0],
                    },
                },
                header: {
                    marginBottom: 24,
                    fontWeight: 600,
                    fontSize: 20,
                    lineHeight: "24px",
                    color: theme.colors.dark[0],
                },
            }),
        },
        Accordion: {
            styles: (theme) => ({
                root: {},
                item: {
                    borderRadius: 16,
                    backgroundColor: theme.colors.white,

                    "&[data-active]": {
                        border: "none",
                        boxShadow: " 0px 16px 32px rgba(2, 6, 46, 0.08)",
                    },

                    "&:not(:first-of-type)": {
                        marginTop: 8,
                    },
                },
                control: {
                    padding: 32,
                },
                label: {
                    fontWeight: 600,
                    fontSize: 20,
                    lineHeight: "24px",
                    color: theme.colors.dark[0],
                },
                content: {
                    padding: "0 32px 40px",
                    fontWeight: 500,
                    fontSize: 16,
                    lineHeight: "24px",
                    color: theme.colors.gray45[0],
                },
            }),
        },
        List: {
            styles: (theme) => ({
                root: {
                    display: "table",
                },
                item: {
                    display: "table-row",
                    counterIncrement: "list-item",

                    ":before": {
                        content: 'counter(list-item, decimal) ".\\a0"',
                        display: "table-cell",
                        width: 24,
                        color: theme.colors.dark[0],
                    },

                    span: {
                        display: "flex",
                        paddingBlock: 8,
                        marginLeft: 8,
                        gap: 8,
                        color: theme.colors.dark[0],
                    },
                },
            }),
        },
        Carousel: {
            styles: (theme) => ({
                root: {},
                viewport: {
                    marginBottom: 48,
                },
                controls: {
                    top: "calc(50% - 60px)",
                    left: -22,
                    right: -22,
                    padding: 0,

                    "@media (max-width: 1440px)": {
                        left: -8,
                        right: -8,
                    },
                },
                control: {
                    width: 56,
                    height: 56,
                    borderRadius: 48,
                    border: "none",
                    color: theme.colors.dark[0],
                    opacity: 1,

                    "&[data-inactive]": {
                        opacity: 0,
                    },

                    ":hover": {
                        boxShadow: "drop-shadow(0px 1px 2px rgba(0, 18, 110, 0.04)) drop-shadow(0px 0px 16px rgba(0, 18, 110, 0.04));",
                    },
                },

                indicators: {
                    position: "initial",
                },
                indicator: {
                    height: 6,
                    width: 11,
                    borderRadius: 8,
                    backgroundColor: theme.colors.gray20[0],

                    "&[data-active]": {
                        width: 23,
                        backgroundColor: theme.colors.dark[0],
                    },
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
