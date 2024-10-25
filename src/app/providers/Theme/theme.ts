/* eslint-disable @typescript-eslint/no-unused-vars */
import { MantineColor, MantineThemeColors, MantineThemeOverride } from "@mantine/core";
import dayjs from "dayjs";
import * as fonts from "./fonts";
import "dayjs/locale/ru";
dayjs.locale("ru");

export const addMantineColor = (color: string): MantineThemeColors[MantineColor] => {
    return [color, color, color, color, color, color, color, color, color, color];
};

const { ManropeFont } = fonts;

export const defaultTheme: MantineThemeOverride = {
    colorScheme: "light",
    fontFamily: ManropeFont.style.fontFamily,
    primaryColor: "primary",
    colors: {
        // main/Blue
        primary: addMantineColor("#3E74ED"),
        primaryHover: addMantineColor("#6493FD"),
        primary16: addMantineColor("#3E74ED33"),
        primary8: addMantineColor("#EDF2FF"),

        // main/Lime
        secondary: addMantineColor("#C9F258"),
        secondaryHover: addMantineColor("#BEEF31"),
        secondary16: addMantineColor("#C9F25880"),
        secondary8: addMantineColor("#F8F5FF"),

        // neutral/Dark
        dark: addMantineColor("#18233A"),
        darkHover: addMantineColor("#0F1420"),

        // neutral/Main
        neutralMain50: addMantineColor("#18233A80"),

        // neutral/Gray
        neutralGray300: addMantineColor("#00042933"),
        neutralGray200: addMantineColor("#E9E9EA"),
        neutralGray100: addMantineColor("#F5F5F5"),

        // neutral/White
        neutralWhite: addMantineColor("#FFFFFF"),
        neutralWhite50: addMantineColor("#FFFFFF80"),
        neutralWhite16: addMantineColor("#FFFFFF29"),

        // Validation
        info: addMantineColor("#3E74ED"),
        info20: addMantineColor("#3E74ED33"),

        done: addMantineColor("#3ECB4C"),
        doneDark: addMantineColor("#0CA31C"),
        done20: addMantineColor("#BEEF3133"),

        error: addMantineColor("#EDB13E"),
        errorDark: addMantineColor("#E39500"),
        error20: addMantineColor("#EDB13E33"),

        warning: addMantineColor("#FF5151"),
        warning20: addMantineColor("#FF515133"),
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
                fontSize: 42,
                lineHeight: "46.2px",
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
                fontWeight: 500,
            },
            h4: {
                fontSize: 18,
                lineHeight: "24px",
                fontWeight: 500,
            },
            h5: {
                fontSize: 15,
                fontWeight: 22,
            },
        },
    },
    globalStyles: (theme) => ({
        body: {
            overflowX: "hidden",
            marginRight: "calc(-1 * (100vw - 100%)) !important",
        },
        "::-webkit-scrollbar": {
            backgroundColor: "transparent",
            width: 4,
        },
        "::-webkit-scrollbar-thumb": {
            backgroundColor: theme.colors.neutralGray300[0],
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
        Menu: {
            styles: (theme) => ({
                dropdown: {
                    padding: "8px !important",
                    borderRadius: 16,
                    border: theme.colors.neutralWhite[0],
                    boxShadow: "0px 16px 32px rgba(2, 6, 46, 0.08)",

                    "> div": {
                        display: "flex",
                        flexDirection: "column",
                        gap: 2,
                    },
                },
                item: {
                    padding: 12,
                    borderRadius: 8,

                    "&:hover": {
                        backgroundColor: theme.colors.neutralGray200[0],
                    },
                },
            }),
        },
        Badge: {
            defaultProps: (theme) => ({
                variant: "outline",
                color: "dark",
            }),
            styles: (theme) => ({
                root: {
                    height: "auto",
                    padding: "6px 10px",
                    borderRadius: 60,
                    border: "none",
                    fontWeight: 500,
                    fontSize: 12,
                    lineHeight: "16px",
                    color: theme.colors.neutralWhite[0],
                    textTransform: "inherit",
                    letterSpacing: "unset",
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
                        color: theme.colors.neutralMain50[0],
                    },

                    "&[data-in-range]": {
                        borderRadius: 6,
                        backgroundColor: theme.colors.primary16[0],
                        color: theme.colors.dark[0],
                    },
                    "&[data-selected]": {
                        borderRadius: 6,
                        backgroundColor: theme.colors.primary[0],
                        color: theme.colors.neutralWhite[0],
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
                    borderRadius: 56,
                    minWidth: "fit-content",
                },
                label: {
                    fontWeight: 500,
                },
            }),
        },
        Modal: {
            defaultProps: (theme) => ({
                centered: true,
                size: 456,
            }),
            styles: (theme) => ({
                root: {
                    zIndex: 399,
                },
                inner: {
                    height: "100vh",

                    [theme.fn.smallerThan("xs")]: {
                        alignItems: "self-end",
                        padding: 0,
                    },
                },

                modal: {
                    display: "flex",
                    flexDirection: "column",
                    padding: "32px 24px 24px !important",
                    borderRadius: 16,
                    background: theme.colors.neutralWhite[0],
                    boxShadow: "0px 16px 32px rgba(2, 6, 46, 0.08)",
                    maxWidth: "100%",

                    [theme.fn.smallerThan("xs")]: {
                        minWidth: "100%",
                        padding: "24px 16px 56px !important",
                        height: "auto !important",
                        marginBottom: 0,
                        borderBottomLeftRadius: 0,
                        borderBottomRightRadius: 0,
                    },
                },
                body: {
                    display: "flex",
                    flexDirection: "column",
                    minHeight: 0,
                    flexGrow: 1,
                },
                close: {
                    minWidth: 32,
                    minHeight: 32,
                    width: 32,
                    height: 32,
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
                    padding: 32,
                    borderRadius: 24,
                    backgroundColor: theme.colors.neutralGray100[0],

                    "&[data-active]": {
                        borderColor: theme.colors.neutralGray200[0],

                        ".mantine-Accordion-control": {
                            padding: 0,
                            borderBottomLeftRadius: "0 !important",
                            borderBottomRightRadius: "0 !important",
                        },
                    },

                    "&:not(:first-of-type)": {
                        marginTop: 8,
                    },
                },
                control: {
                    padding: 0,
                },
                panel: {
                    marginTop: "0 !important",
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
                        fontSize: 16,
                        lineHeight: "24px",
                    },
                },
                content: {
                    padding: 0,
                    marginTop: 32,
                    fontWeight: 500,
                    fontSize: 16,
                    lineHeight: "22px",
                    color: theme.colors.neutralMain50[0],
                    textAlign: "left",

                    [theme.fn.smallerThan("md")]: {
                        marginTop: 16,
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
        ActionIcon: {
            styles: (theme) => ({
                root: {
                    "&:hover": {
                        backgroundColor: "unset",
                        color: theme.colors.primary[0],
                    },
                },
            }),
        },
    },
};
