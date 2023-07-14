/* eslint-disable @typescript-eslint/no-unused-vars */
import { MantineColor } from "@mantine/core";
import { MantineThemeColors } from "@mantine/core";
import { MantineThemeOverride } from "@mantine/core";
import * as fonts from "./fonts";
import "dayjs/locale/ru";

export const addMantineColor = (color: string): MantineThemeColors[MantineColor] => {
    return [color, color, color, color, color, color, color, color, color, color];
};

const { ManropeFont } = fonts;

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
        neutralLight: addMantineColor("#F6F6F6"),
        light: addMantineColor("#F7F7F7"),
        white: addMantineColor("#FFFFFF"),
        white56: addMantineColor("rgba(255, 255, 255, 0.56)"),
        white16: addMantineColor("rgba(255, 255, 255, 0.16)"),
        info: addMantineColor("#3C4FF5"),
        info16: addMantineColor("rgba(122, 136, 255, 0.16)"),
        done: addMantineColor("#2DCC46"),
        doneDark: addMantineColor("#00AA1B"),
        done16: addMantineColor("rgba(0, 216, 35, 0.16)"),
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
        xs: 576,
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
                fontSize: 26,
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
    globalStyles: (theme) => ({
        "::-webkit-scrollbar": {
            backgroundColor: "transparent",
            width: 4,
        },
        "::-webkit-scrollbar-thumb": {
            backgroundColor: theme.colors.gray20[0],
            borderRadius: 2,
        },
    }),
    components: {
        ThemeIcon: {
            defaultProps: {
                variant: "outline",
            },
            styles: (theme) => ({
                root: {
                    width: "auto",
                    height: "auto",
                    minWidth: "auto",
                    minHeight: "auto",
                    border: "none",
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
        DateRangePicker: {
            defaultProps: {
                inputFormat: "DD.MM.YYYY",
                locale: "ru",
            },
            styles: (theme) => ({
                input: {
                    fontWeight: 500,
                },
                dropdown: {
                    padding: 8,
                    paddingTop: 16,
                    borderRadius: 16,
                },
                calendarHeaderControl: {
                    width: 24,
                    height: 24,
                    color: theme.colors.dark[0],
                },
                calendarHeaderLevel: {
                    height: 24,
                    fontWeight: 500,
                    fontSize: 14,
                    lineHeight: "16px",
                },
                calendarHeader: {
                    alignItems: "center",
                    marginBottom: 8,
                },
                weekdayCell: {
                    paddingBottom: 14,
                },
                cell: {
                    borderTop: "none",
                },
                day: {
                    width: 32,
                    height: 32,
                    margin: 1,
                    fontWeight: 500,
                    fontSize: 12,
                    lineHeight: "16px",
                    color: theme.colors.dark[0],

                    "&[data-weekend]": {
                        color: theme.colors.dark[0],
                    },

                    "&[data-outside]": {
                        color: theme.colors.gray45[0],
                    },

                    "&[data-in-range]": {
                        borderRadius: 6,
                        backgroundColor: theme.colors.primary16[0],
                        color: theme.colors.dark[0],
                    },
                    "&[data-selected]": {
                        borderRadius: 6,
                        backgroundColor: theme.colors.primary[0],
                        color: theme.colors.white[0],
                    },
                },
            }),
        },
        TimeRangeInput: {
            styles: () => ({
                separator: {
                    padding: 0,
                },
                input: {
                    paddingTop: "22px !important",
                    paddingLeft: "15px !important",

                    ".mantine-TimeInput-input": {
                        paddingTop: "0 !important",
                        paddingLeft: "0 !important",
                    },
                },
            }),
        },
        TimeInput: {
            styles: () => ({
                input: {
                    paddingTop: "22px !important",
                    paddingLeft: "15px !important",
                },
                timeInput: {
                    fontWeight: 500,
                    fontSize: 14,
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
                inner: {
                    height: "100vh",

                    [theme.fn.smallerThan("xs")]: {
                        alignItems: "self-end",
                        padding: 0,
                    },
                },

                modal: {
                    padding: "32px 24px 24px !important",
                    borderRadius: 16,
                    background: theme.colors.white[0],
                    boxShadow: "0px 16px 32px rgba(2, 6, 46, 0.08)",

                    [theme.fn.smallerThan("xs")]: {
                        minWidth: "100%",
                        padding: "24px 16px 56px !important",
                        marginBottom: 0,
                        borderBottomLeftRadius: 0,
                        borderBottomRightRadius: 0,
                    },
                },
                close: {
                    svg: {
                        color: theme.colors.primary[0],
                    },
                },
                header: {
                    alignItems: "flex-start",
                    marginRight: 0,
                    marginBottom: 24,
                },

                title: {
                    fontWeight: 600,
                    fontSize: 20,
                    lineHeight: "24px",
                    color: theme.colors.dark[0],

                    [theme.fn.smallerThan("md")]: {
                        fontSize: 18,
                        lineHeight: "24px",
                    },
                },
            }),
        },
        Accordion: {
            styles: (theme) => ({
                root: {},
                item: {
                    borderRadius: 16,
                    backgroundColor: theme.colors.white[0],

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

                    [theme.fn.smallerThan("md")]: {
                        paddingInline: 24,
                    },
                },
                chevron: {
                    alignSelf: "self-start",
                },
                label: {
                    fontWeight: 600,
                    fontSize: 20,
                    lineHeight: "24px",
                    color: theme.colors.dark[0],

                    [theme.fn.smallerThan("md")]: {
                        fontSize: 18,
                        lineHeight: "24px",
                    },
                },
                content: {
                    paddingInline: 32,
                    paddingTop: 8,
                    paddingBottom: 40,
                    fontWeight: 500,
                    fontSize: 16,
                    lineHeight: "24px",
                    color: theme.colors.gray45[0],

                    [theme.fn.smallerThan("md")]: {
                        paddingInline: 24,
                    },
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
    },
    other: {
        pSmall: {
            padding: "0 32px 40px",
            fontWeight: 500,
            fontSize: 16,
            lineHeight: "24px",
        },
    },
};
