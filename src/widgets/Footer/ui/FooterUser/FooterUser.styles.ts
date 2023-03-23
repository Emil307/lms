import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    root: {
        paddingTop: 56,
        "@media (max-width: 1440px)": {
            position: "inherit",
        },
    },
    inner: {
        flexDirection: "column",
        width: "min-content",
        paddingInline: 16,
        marginInline: "auto",

        "@media (max-width: 1440px)": {
            margin: "0",
        },
    },
    content: {
        marginBottom: 48,
        gap: 24,

        "@media (max-width: 1440px)": {
            flexDirection: "column",
        },
    },
    titleSection: {
        fontWeight: 500,
        fontSize: 18,
        lineHeight: "26px",
        color: theme.colors.dark,
    },
    sectionLink: {
        fontWeight: 500,
        fontSize: 16,
        lineHeight: "24px",
        color: theme.colors.gray45,
        textDecoration: "none",

        ":hover": {
            textDecoration: "underline",
        },
    },
}));
