import { createStyles, MantineSize } from "@mantine/core";
import { ReactNode } from "react";

export const useInputStyles = createStyles(
    (theme, { floating, icon, size, clearable }: { floating: boolean; icon?: ReactNode; size?: MantineSize, clearable?: boolean }) => ({
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
            paddingTop: size === "sm" ? "28px" : "24px",
            paddingLeft: "18px",
            paddingRight: "18px",
            border: `1px solid ${theme.colors.gray20[0]}`,
            borderRadius: "8px",
            fontSize: "14px",
            lineHeight: "16px",
            ":hover, :focus": {
                boxShadow: "0px 1px 2px rgba(0, 18, 110, 0.04), 0px 0px 16px rgba(0, 18, 110, 0.04)",
                border: "1px solid rgba(0,0,0,0.0)",
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
            pointerEvents: !clearable ? "none" : "auto",
        },
        error: {
            position: "absolute",
            color: theme.colors.warning[0],
        },
    })
);
