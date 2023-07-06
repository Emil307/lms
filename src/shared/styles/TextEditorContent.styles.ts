import { CSSObject, MantineTheme } from "@mantine/core";
import { InterFont } from "@app/providers/Theme/fonts";

export const textEditorContentStyles = (theme: MantineTheme): CSSObject => ({
    "*": {
        fontFamily: InterFont.style.fontFamily,
        color: theme.colors.dark[0],
    },

    p: {
        marginBottom: 0,
        fontWeight: 400,
        fontSize: 16,
        lineHeight: "24px",

        "+ p": {
            marginTop: 24,
        },

        "+ *:not(p, ul)": {
            marginTop: 48,
        },
    },

    h1: {
        marginTop: 0,
        marginBottom: 32,
        fontWeight: 500,
        fontSize: 26,
        lineHeight: "32px",
    },

    h2: {
        marginTop: 0,
        marginBottom: 24,
        fontWeight: 500,
        fontSize: 20,
        lineHeight: "24px",
    },

    h3: {
        marginTop: 0,
        marginBottom: 18,
        fontWeight: 500,
        fontSize: 18,
        lineHeight: "24px",
    },

    h4: {
        marginTop: 0,
        marginBottom: 18,
        fontWeight: 500,
        fontSize: 16,
        lineHeight: "22px",
    },

    blockquote: {
        padding: "32px 48px",
        margin: 0,
        marginLeft: 24,
        borderLeft: `4px solid ${theme.colors.secondary[0]}`,
        backgroundColor: theme.colors.primary16[0],

        h3: {
            marginBottom: 0,
            fontWeight: 500,
            fontSize: 18,

            "+ *": {
                marginTop: 24,
            },
        },

        "+ *": {
            marginTop: 48,
        },
    },

    ul: {
        display: "flex",
        flexDirection: "column",
        marginTop: 8,
        marginBottom: 8,
        paddingLeft: 56,
        paddingRight: 24,
        gap: 8,
        listStyleType: "none",

        li: {
            marginTop: 0,
            position: "relative",

            "::before": {
                content: '""',
                position: "absolute",
                top: 8,
                left: -16,
                width: 8,
                height: 8,
                borderRadius: 8,
                border: `2px solid ${theme.colors.secondary[0]}`,
            },
        },
    },

    table: {
        borderCollapse: "collapse",
        margin: 0,
        overflow: "hidden",
        tableLayout: "fixed",
        width: "auto",
        maxWidth: "100%",

        "td, th": {
            position: "relative",
            minWidth: "1em",
            padding: "12px 18px",
            border: `1px solid ${theme.colors.gray20[0]}`,
            verticalAlign: "top",

            "> *": {
                marginBottom: 0,
            },
        },

        th: {
            backgroundColor: theme.colors.grayLight[0],
            fontWeight: "bold",
            textAlign: "left",
        },

        ".selectedCell:after": {
            position: "absolute",
            content: '""',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            background: theme.colors.secondary8[0],
            zIndex: 2,
            pointerEvents: "none",
        },
    },
});
