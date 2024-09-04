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
        lineHeight: "22px",
        minHeight: 22,
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
        marginBlock: 0,
        fontWeight: 600,
        fontSize: 42,
        lineHeight: "46px",
        letterSpacing: "-0.48px",

        [theme.fn.smallerThan("md")]: {
            fontSize: 24,
            lineHeight: "32px",
            letterSpacing: "unset",
        },
    },

    h2: {
        marginBlock: 0,
        fontWeight: 600,
        fontSize: 24,
        lineHeight: "32px",
        letterSpacing: "-0.48px",

        [theme.fn.smallerThan("md")]: {
            fontSize: 20,
            lineHeight: "24px",
            letterSpacing: "-0.24px",
        },
    },

    h3: {
        marginBlock: 0,
        fontWeight: 600,
        fontSize: 20,
        lineHeight: "24px",
        letterSpacing: "-0.48px",

        [theme.fn.smallerThan("md")]: {
            fontSize: 18,
            lineHeight: "24px",
            letterSpacing: "-0.24px",
        },
    },

    h4: {
        marginBlock: 0,
        fontWeight: 500,
        fontSize: 18,
        lineHeight: "24px",
        letterSpacing: "-0.24px",

        [theme.fn.smallerThan("md")]: {
            fontSize: 16,
            lineHeight: "22px",
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
        marginBlock: 0,
        paddingInline: 0,
        gap: 32,
        listStyleType: "none",
        counterReset: "custom-counter",

        li: {
            display: "flex",
            alignItems: "flex-start",
            gap: 24,
            marginTop: 0,
            counterIncrement: "custom-counter",

            "&:before": {
                content: `"0" counter(custom-counter)`,
                fontSize: 24,
                lineHeight: "32px",
                letterSpacing: "-0.48px",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: 72,
                height: 72,
                flexShrink: 0,
                border: `1px solid ${theme.colors.gray20[0]}`,
                borderRadius: 56,
            },

            "&:nth-child(n + 10)::before": {
                content: `counter(custom-counter)`,
            },

            [theme.fn.smallerThan("md")]: {
                flexDirection: "column",
            },

            p: {
                fontSize: 16,
                fontWeight: 500,
                lineHeight: "22px",
                color: theme.colors.gray45[0],
            },
        },
    },

    ul: {
        display: "flex",
        flexDirection: "column",
        marginBlock: 0,
        paddingInline: 16,
        gap: 8,
        listStyleType: "none",

        [theme.fn.smallerThan("md")]: {
            paddingRight: 8,
        },

        li: {
            marginTop: 0,
            position: "relative",

            "::before": {
                content: '""',
                position: "absolute",
                top: 6,
                left: -16,
                width: 4,
                height: 4,
                borderRadius: 8,
                backgroundColor: theme.colors.gray45[0],
            },

            p: {
                fontWeight: 500,
                fontSize: 14,
                lineHeight: "16px",
                minHeight: 16,
                color: theme.colors.gray45[0],
            },
        },
    },

    ".imageWrapper": {
        position: "relative",
        display: "block",
        maxWidth: "100%",
        paddingTop: "47%",
        borderRadius: 32,
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
            maxHeight: "100%",
            maxWidth: "94%",
            marginBottom: 0,
        },
    },

    ".tableWrapper": {
        "&::-webkit-scrollbar": {
            height: 4,
        },
        overflowX: "auto",
        width: "100%",
    },

    table: {
        width: "100%",
        borderCollapse: "collapse",
        margin: 0,

        colgroup: {
            [theme.fn.smallerThan("md")]: {
                display: "none",
            },
        },

        tr: {
            width: "100%",
            "&:last-of-type td": {
                borderBottom: `1px solid ${theme.colors.gray20[0]}`,
            },

            [theme.fn.smallerThan("md")]: {
                display: "flex",
                flexDirection: "column",
            },
        },

        "td, th": {
            position: "relative",
            minWidth: "1em",
            padding: 12,
            border: `1px solid ${theme.colors.gray20[0]}`,
            verticalAlign: "top",
            backgroundClip: "padding-box",

            "> *": {
                marginBottom: 0,
            },

            [theme.fn.smallerThan("md")]: {
                flex: "1 !important",
                minWidth: "unset !important",
            },
        },

        th: {
            textAlign: "left",

            "&:has(img)": {
                textAlign: "center",
            },
        },
    },

    ".ProseMirror": {
        height: "auto",
    },
});
