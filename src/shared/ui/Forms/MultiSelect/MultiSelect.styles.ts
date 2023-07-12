import { createStyles } from "@mantine/core";

export const useMultiSelectStyles = createStyles((theme, { isValue, statusSuccess }: { isValue: boolean; statusSuccess?: boolean }) => ({
    root: {
        position: "relative",
        ":hover": {
            label: {
                color: theme.colors.dark[0],
                cursor: "pointer",
            },
        },
    },
    wrapper: {
        marginBottom: 0,
        borderRadius: 8,
        border: "none",

        ":hover, :focus": {
            boxShadow: "0px 1px 2px rgba(0, 18, 110, 0.04), 0px 0px 16px rgba(0, 18, 110, 0.04)",
        },
    },
    label: {
        position: "absolute",
        display: isValue ? "none" : "auto",
        zIndex: 2,
        top: 16,
        left: 16,
        fontSize: "14px",
        lineHeight: "16px",
        color: theme.colors.gray45[0],
        pointerEvents: "none",
    },
    input: {
        display: "flex",
        minHeight: 48,
        paddingLeft: 18,
        paddingRight: 36,
        border: statusSuccess ? `1px solid ${theme.colors.done[0]} !important` : `1px solid ${theme.colors.gray20[0]}`,
        borderRadius: 8,
        fontSize: 14,
        lineHeight: "16px",
        ":hover, :focus": {
            border: "1px solid transparent",
            cursor: "pointer",
        },
        ":disabled": {
            border: `1px solid ${theme.fn.rgba(theme.colors.neutral_gray[0], 0.2)} `,
            color: theme.colors.dark[0],
        },

        "&[aria-invalid=true]": {
            border: `1px solid ${theme.colors.warning[0]} `,
        },
    },

    defaultValue: {
        height: 24,
        paddingInline: 6,
        backgroundColor: theme.colors.primary8[0],
    },
    defaultValueLabel: {
        color: theme.colors.dark[0],
    },
    defaultValueRemove: {
        minWidth: 16,
        minHeight: 16,
        width: 16,
        height: 16,
        color: theme.colors.primary[0],
        svg: {
            strokeWidth: 1,
            path: {
                stroke: theme.colors.primary[0],
            },
        },
    },

    rightSection: {
        width: "50px",
        cursor: "pointer",
        pointerEvents: "none",
    },
    error: {
        display: "flex",
        gap: 4,
        marginTop: 4,

        svg: {
            width: 16,
            height: 16,
            color: theme.colors.warning[0],
        },

        "> p": {
            width: "calc(100% - 20px)",
            paddingTop: 2,
        },
    },
    description: {
        display: "flex",
        flexDirection: "column",

        "> div": {
            display: "flex",
            alignItems: "flex-start",
            gap: 4,
            marginTop: 4,

            svg: {
                width: "16px !important",
                height: "16px !important",
            },

            "> p": {
                width: "calc(100% - 20px)",
                paddingTop: 2,
            },
        },
    },
}));
