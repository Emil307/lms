import { CSSObject, MantineTheme } from "@mantine/core";
import { InterFont } from "@app/providers/Theme/fonts";

export const textEditorContentStyles = (theme: MantineTheme): CSSObject => ({
    "*": {
        fontFamily: InterFont.style.fontFamily,
        color: theme.colors.dark[0],
        wordBreak: "break-word",

        "&:nth-last-of-type(1 of :not(.ProseMirror-gapcursor))": {
            marginBottom: 0,
        },
    },

    p: {
        margin: 0,
        fontWeight: 400,
        fontSize: 16,
        lineHeight: "24px",
        minHeight: 24,

        [theme.fn.smallerThan("md")]: {
            minHeight: 16,
        },
    },

    a: {
        cursor: "pointer",
        color: theme.colors.primary[0],
        textDecoration: "none",

        "&:hover": {
            textDecoration: "underline",
        },
    },

    h1: {
        marginTop: 0,
        fontWeight: 500,
        fontSize: 26,
        lineHeight: "32px",

        "+ *": {
            marginTop: 32,
        },

        [theme.fn.smallerThan("md")]: {
            fontSize: 24,
            lineHeight: "26px",
            marginBottom: 24,
        },
    },

    h2: {
        marginTop: 0,
        marginBottom: 24,
        fontWeight: 500,
        fontSize: 20,
        lineHeight: "24px",

        [theme.fn.smallerThan("md")]: {
            fontSize: 18,
            lineHeight: "24px",
        },
    },

    h3: {
        marginTop: 0,
        marginBottom: 18,
        fontWeight: 500,
        fontSize: 18,
        lineHeight: "24px",

        [theme.fn.smallerThan("md")]: {
            fontSize: 16,
            lineHeight: "20px",
        },
    },

    h4: {
        marginTop: 0,
        marginBottom: 18,
        fontWeight: 500,
        fontSize: 16,
        lineHeight: "22px",

        [theme.fn.smallerThan("md")]: {
            lineHeight: "18px",
        },
    },

    blockquote: {
        position: "relative",
        padding: "32px 48px",
        margin: "0 0 48px 24px",
        border: "none",
        backgroundColor: theme.colors.primary16[0],

        "&:before": {
            content: "''",
            position: "absolute",
            left: 0,
            top: 0,
            height: "100%",
            width: 4,
            backgroundColor: theme.colors.secondary[0],
        },

        [theme.fn.smallerThan("md")]: {
            padding: "24px 32px",
            marginLeft: 8,
        },

        h3: {
            marginBottom: 0,

            "+ *": {
                marginTop: 24,

                [theme.fn.smallerThan("md")]: {
                    marginTop: 16,
                },
            },
        },
    },

    ol: {
        display: "flex",
        flexDirection: "column",
        marginBottom: 8,
        paddingLeft: 56,
        paddingRight: 24,
        gap: 8,

        [theme.fn.smallerThan("md")]: {
            paddingLeft: 40,
            paddingRight: 8,
        },

        li: {
            marginTop: 0,
        },
    },

    ul: {
        display: "flex",
        flexDirection: "column",
        marginBottom: 8,
        paddingLeft: 56,
        paddingRight: 24,
        gap: 8,
        listStyleType: "none",

        [theme.fn.smallerThan("md")]: {
            paddingLeft: 40,
            paddingRight: 8,
        },

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

    ".imageWrapper": {
        position: "relative",
        display: "block",
        maxWidth: "100%",
        paddingTop: "47%",
        marginBottom: 24,
        borderRadius: 12,
        background: theme.colors.neutralLight[0],

        [theme.fn.smallerThan("sm")]: {
            paddingTop: "60%",
        },

        img: {
            display: "block",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            maxWidth: "94%",
            maxHeight: "100%",
        },
    },

    ".tableWrapper": {
        "&::-webkit-scrollbar": {
            height: 4,
        },
        overflowX: "auto",
        width: "100%",
        paddingBottom: 3,
        marginBottom: 24,
    },

    table: {
        borderCollapse: "collapse",
        margin: 0,

        tr: {
            "&:last-of-type td": {
                borderBottom: `1px solid ${theme.colors.gray20[0]}`,
            },
        },

        "td, th": {
            position: "relative",
            minWidth: "1em",
            padding: "12px 18px",
            border: `1px solid ${theme.colors.gray20[0]}`,
            verticalAlign: "top",
            backgroundClip: "padding-box",

            p: {
                fontSize: 14,
                lineHeight: "16px",
            },

            "> *": {
                marginBottom: 0,
            },
        },

        th: {
            backgroundColor: theme.colors.grayLight[0],
            textAlign: "left",

            "> p": {
                fontWeight: "bold",
            },
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

    ".ProseMirror": {
        height: "auto",
    },
});
