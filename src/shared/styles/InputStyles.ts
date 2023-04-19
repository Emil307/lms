import { createStyles, MantineSize } from "@mantine/core";
import { ReactNode } from "react";

export const useInputStyles = createStyles(
    (
        theme,
        {
            floating,
            icon,
            size,
            statusSuccess,
        }: { floating: boolean; icon?: ReactNode; size?: MantineSize; clearable?: boolean; statusSuccess?: boolean }
    ) => ({
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
        },
        label: {
            position: "absolute",
            zIndex: 2,
            top: size === "sm" ? 16 : 20,
            left: icon ? "50px" : "18px",
            transition: "transform 150ms ease, color 150ms ease, font-size 150ms ease, padding 150ms ease",
            transform: floating ? `translate(0px, -6px)` : "none",
            fontSize: floating ? "10px" : "14px",
            lineHeight: floating ? "12px" : "16px",
            color: theme.colors.gray45[0],
        },
        icon: {
            width: "50px",
        },
        input: {
            height: size === "sm" ? 48 : 56,
            paddingTop: size === "sm" ? "24px" : "28px",
            paddingLeft: "18px",
            paddingRight: "18px",
            border: statusSuccess ? `1px solid ${theme.colors.done[0]}` : `1px solid ${theme.colors.gray20[0]}`,
            borderRadius: "8px",
            fontSize: "14px",
            lineHeight: "16px",

            ".mantine-TimeInput-controls": {
                opacity: floating ? 1 : 0,
            },

            ".mantine-TimeRangeInput-inputWrapper": {
                opacity: floating ? 1 : 0,
            },

            ":hover, :focus": {
                boxShadow: "0px 1px 2px rgba(0, 18, 110, 0.04), 0px 0px 16px rgba(0, 18, 110, 0.04)",
                border: statusSuccess ? `1px solid ${theme.colors.done[0]}` : "1px solid rgba(0,0,0,0.0)",
                cursor: "pointer",
            },
            ":disabled": {
                border: "1px solid rgba(0, 4, 41, 0.2)",
                color: theme.colors.dark[0],
            },
            "&[aria-invalid=true]": {
                border: `1px solid ${theme.colors.warning[0]}`,
            },
        },
        withIcon: {
            paddingLeft: "50px",
        },
        rightSection: {
            width: "50px",
            cursor: "pointer",
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

            "> div": {
                width: "calc(100% - 20px)",
                paddingTop: 2,
                color: theme.colors.dark[0],
                fontWeight: 400,
                fontSize: 10,
                lineHeight: "12px",
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

                "> div": {
                    width: "calc(100% - 20px)",
                    paddingTop: 2,
                    color: theme.colors.dark[0],
                    fontWeight: 400,
                    fontSize: 10,
                    lineHeight: "12px",
                },
            },
        },
    })
);
