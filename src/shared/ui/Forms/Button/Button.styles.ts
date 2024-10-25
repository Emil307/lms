import { createStyles, CSSObject, MantineTheme } from "@mantine/core";
import { ButtonSize, ButtonVariant } from "./Button";

const getStylesForVariant = (varian: ButtonVariant, theme: MantineTheme): CSSObject => {
    switch (varian) {
        case "primary": {
            return {
                color: theme.colors.neutralWhite[0],
                backgroundColor: theme.colors.dark[0],
                ":hover": {
                    color: theme.colors.dark[0],
                    backgroundColor: theme.colors.secondaryHover[0],
                },
                ":disabled": {
                    color: theme.colors.neutralGray300[0],
                    backgroundColor: theme.colors.neutralGray200[0],

                    ".mantine-Button-icon": {
                        color: theme.colors.neutralGray300[0],
                        ".mantine-ThemeIcon-root": {
                            color: theme.colors.neutralGray300[0],
                        },
                    },
                },
            };
        }
        case "secondary": {
            return {
                color: theme.colors.dark[0],
                backgroundColor: theme.colors.neutralGray200[0],

                ".mantine-Button-icon": {
                    color: theme.colors.dark[0],
                    ".mantine-ThemeIcon-root": {
                        color: theme.colors.dark[0],
                    },
                },
                svg: {
                    stroke: theme.colors.dark[0],
                    strokeWidth: 2,
                },

                ":hover": {
                    color: theme.colors.neutralMain50[0],
                    backgroundColor: theme.colors.neutralGray200[0],

                    ".mantine-Button-icon": {
                        color: theme.colors.neutralMain50[0],
                        ".mantine-ThemeIcon-root": {
                            color: theme.colors.neutralMain50[0],
                        },
                    },
                    svg: {
                        stroke: theme.colors.neutralMain50[0],
                    },
                },
                ":disabled": {
                    color: theme.colors.neutralGray300[0],
                    backgroundColor: theme.colors.neutralGray200[0],

                    ".mantine-Button-icon": {
                        color: theme.colors.neutralGray300[0],
                        ".mantine-ThemeIcon-root": {
                            color: theme.colors.neutralGray300[0],
                        },
                    },
                    svg: {
                        stroke: theme.colors.neutralGray300[0],
                    },
                },
            };
        }
        case "border": {
            return {
                backgroundColor: "transparent",
                border: `1px solid ${theme.colors.neutralMain50[0]}`,
                color: theme.colors.dark[0],

                ".mantine-Button-icon": {
                    color: theme.colors.dark[0],
                    ".mantine-ThemeIcon-root": {
                        color: theme.colors.dark[0],
                    },
                },
                svg: {
                    stroke: theme.colors.dark[0],
                    strokeWidth: 2,
                },

                ":hover": {
                    backgroundColor: "transparent",
                    border: `1px solid ${theme.colors.dark[0]}`,

                    ".mantine-Button-icon": {
                        color: theme.colors.dark[0],
                        ".mantine-ThemeIcon-root": {
                            color: theme.colors.dark[0],
                        },
                    },
                    svg: {
                        stroke: theme.colors.dark[0],
                    },
                },
                ":disabled": {
                    backgroundColor: "transparent",
                    color: theme.colors.neutralGray300[0],
                    border: `1px solid ${theme.colors.neutralGray300[0]}`,

                    ".mantine-Button-icon": {
                        color: theme.colors.neutralGray300[0],
                        ".mantine-ThemeIcon-root": {
                            color: theme.colors.neutralGray300[0],
                        },
                    },
                    svg: {
                        stroke: theme.colors.neutralGray300[0],
                    },
                },
                "&[data-loading]": {
                    color: theme.colors.dark[0],
                    ".mantine-Button-icon": {
                        svg: {
                            stroke: theme.colors.dark[0],
                        },
                    },
                },
            };
        }
        case "white": {
            return {
                backgroundColor: theme.colors.neutralWhite[0],
                color: theme.colors.dark[0],
                ":hover": {
                    backgroundColor: theme.colors.neutralGray100[0],
                },
                ":disabled": {
                    backgroundColor: theme.colors.neutralGray200[0],
                    color: theme.colors.neutralGray300[0],

                    ".mantine-Button-icon": {
                        color: theme.colors.neutralGray300[0],
                        ".mantine-ThemeIcon-root": {
                            color: theme.colors.neutralGray300[0],
                        },
                    },
                },
                "&[data-loading]": {
                    ".mantine-Button-icon": {
                        svg: {
                            stroke: theme.colors.dark[0],
                        },
                    },
                },
            };
        }
        case "text": {
            return {
                padding: 0,
                backgroundColor: "transparent",
                color: theme.colors.dark[0],
                height: "auto",

                span: {
                    whiteSpace: "normal",
                },

                ":hover": {
                    color: theme.colors.neutralMain50[0],
                    backgroundColor: "transparent",

                    ".mantine-Button-icon": {
                        ".mantine-ThemeIcon-root": {
                            color: theme.colors.neutralMain50[0],
                        },
                    },
                },
                ":disabled": {
                    color: theme.colors.neutralGray300[0],
                    backgroundColor: "transparent",
                    ".mantine-Button-icon": {
                        color: theme.colors.neutralGray300[0],
                        ".mantine-ThemeIcon-root": {
                            color: theme.colors.neutralGray300[0],
                        },
                    },
                },
            };
        }
        default:
            return {};
    }
};

const getStylesForSize = (size: ButtonSize): CSSObject => {
    switch (size) {
        case "large": {
            return {
                height: 56,
                padding: "16px 32px",
                fontWeight: 500,
                fontSize: 18,
                lineHeight: "24px",

                ".mantine-Button-icon": {
                    width: 24,
                    height: 24,
                    ".mantine-ThemeIcon-root": {
                        width: 24,
                        height: 24,
                        minHeight: 24,
                        minWidth: 24,
                    },
                },
            };
        }
        case "medium": {
            return {
                height: 48,
                padding: "12px 24px",
                fontWeight: 500,
                fontSize: 16,
                lineHeight: "24px",

                ".mantine-Button-inner": {
                    height: 24,
                },

                ".mantine-Button-icon": {
                    width: 24,
                    height: 24,
                    ".mantine-ThemeIcon-root": {
                        width: 24,
                        height: 24,
                        minHeight: 24,
                        minWidth: 24,
                    },
                },
            };
        }
        case "small": {
            return {
                height: 40,
                padding: "8px 16px",
                fontWeight: 500,
                fontSize: 14,
                lineHeight: "24px",

                ".mantine-Button-icon": {
                    width: 18,
                    height: 18,
                    ".mantine-ThemeIcon-root": {
                        width: 18,
                        height: 18,
                        minHeight: 18,
                        minWidth: 18,
                    },
                },
            };
        }
        default:
            return {};
    }
};

export const useButtonStyles = createStyles((theme, { variant, size }: { variant: ButtonVariant; size: ButtonSize }) => ({
    root: {
        ...getStylesForSize(size),
        ...getStylesForVariant(variant, theme),
    },
    leftIcon: {
        marginRight: 8,
    },
    rightIcon: {
        marginLeft: 8,
    },
}));
