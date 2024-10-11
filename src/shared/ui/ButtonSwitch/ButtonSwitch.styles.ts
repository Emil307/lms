import { createStyles } from "@mantine/core";

export const useButtonSwitchStyles = createStyles((theme) => ({
    root: {
        backgroundColor: "transparent",
        border: `1px solid ${theme.colors.dark[0]}`,
        color: theme.colors.dark[0],

        ":hover": {
            backgroundColor: "transparent",
            border: `1px solid ${theme.colors.neutral_main50[0]}`,
            color: theme.colors.neutral_main50[0],
        },
        "&[data-active='true']": {
            backgroundColor: theme.colors.dark[0],
            border: "1px solid transparent",
            color: theme.colors.white[0],
            ":hover": {
                backgroundColor: "transparent",
                border: `1px solid ${theme.colors.neutral_main50[0]}`,
                color: theme.colors.neutral_main50[0],
            },
        },

        height: 38,
        padding: "9px 16px",
        fontWeight: 500,
        fontSize: 16,
        lineHeight: "22px",
        borderRadius: 12,

        ".mantine-Button-icon": {
            width: 24,
            height: 24,
            ".mantine-ThemeIcon-root": {
                width: 24,
                height: 24,
                minHeight: 24,
                minWidth: 24,
            },
            svg: {
                stroke: theme.colors.neutral_main50[0],
            },
        },
    },
    leftIcon: {
        marginRight: 8,
    },
    rightIcon: {
        marginLeft: 8,
    },
}));
