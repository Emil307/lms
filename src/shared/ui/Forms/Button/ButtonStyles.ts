import { createStyles, CSSObject, MantineTheme } from "@mantine/core";
import { ButtonSize, ButtonVariant } from "./Button";

const getStylesForVariant = (varian: ButtonVariant, theme: MantineTheme): CSSObject => {
    switch (varian) {
        case "primary": {
            return {
                backgroundColor: theme.colors.primary[0],
                ":hover": {
                    backgroundColor: theme.colors.primaryHover[0],
                },
                ":disabled": {
                    backgroundColor: theme.colors.grayLight[0],
                    color: theme.colors.gray45[0],
                },
            };
        }
        case "secondary": {
            return {
                backgroundColor: theme.colors.dark[0],
                ":hover": {
                    backgroundColor: theme.colors.primaryHover[0],
                },
                ":disabled": {
                    backgroundColor: theme.colors.grayLight[0],
                    color: theme.colors.gray45[0],
                },
            };
        }
        case "border": {
            return {
                backgroundColor: theme.colors.white[0],
                border: `2px solid ${theme.colors.gray20[0]}`,
                color: theme.colors.dark[0],
                ":hover": {
                    backgroundColor: theme.colors.grayLight[0],
                    border: `2px solid ${theme.fn.rgba(theme.colors.gray20[0], 0)}`,
                },
                ":disabled": {
                    backgroundColor: theme.colors.white[0],
                    color: theme.colors.gray45[0],
                    border: `2px solid ${theme.colors.grayLight[0]}`,
                },
            };
        }
        case "white": {
            return {
                backgroundColor: theme.colors.white[0],
                border: `2px solid ${theme.fn.rgba(theme.colors.gray20[0], 0)}`,
                color: theme.colors.dark[0],
                ":hover": {
                    backgroundColor: theme.colors.grayLight[0],
                    border: `2px solid ${theme.fn.rgba(theme.colors.gray20[0], 0)}`,
                },
                ":disabled": {
                    backgroundColor: theme.colors.white[0],
                    color: theme.colors.gray45[0],
                    border: `2px solid ${theme.fn.rgba(theme.colors.gray20[0], 0)}`,
                },
            };
        }
        case "text": {
            return {
                padding: 0,
                backgroundColor: "transparent",
                color: theme.colors.dark[0],
                height: 24,
                ":hover": {
                    backgroundColor: "transparent",
                },
                ":disabled": {
                    backgroundColor: "transparent",
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
                padding: "16px 32px",
                height: 56,
                fontSize: 18,
                lineHeight: 24,
            };
        }
        case "medium": {
            return {
                padding: "12px 24px",
                height: 48,
                fontSize: 16,
                lineHeight: 24,
            };
        }
        case "small": {
            return {
                padding: "8px 16px",
                height: 40,
                fontSize: 14,
                lineHeight: 24,
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
}));
