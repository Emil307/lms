import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    root: {
        position: "inherit",
        paddingTop: 56,
        border: "none",
    },
    inner: {
        flexDirection: "column",
        width: "min-content",
        paddingInline: 16,
        marginInline: "auto",

        [theme.fn.smallerThan("lg")]: {
            margin: 0,
        },

        [theme.fn.smallerThan("xs")]: {
            width: "100%",
        },
    },
    content: {
        marginBottom: 48,
        gap: 24,

        [theme.fn.smallerThan("lg")]: {
            flexDirection: "column",
        },
    },
    popularSectionContainer: {
        flexDirection: "column",
        minWidth: 392,
        gap: 16,

        [theme.fn.smallerThan("lg")]: {
            minWidth: "auto",
        },
    },
    infoSectionContainer: {
        flexDirection: "column",
        minWidth: 392,
        gap: 16,

        [theme.fn.smallerThan("lg")]: {
            minWidth: "auto",
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
    link: {
        alignItems: "center",
        justifyContent: "center",
        height: 56,
        width: 56,
        borderRadius: 8,
        backgroundColor: theme.colors.primary[0],

        ":hover": {
            backgroundColor: theme.colors.primaryHover[0],
        },
    },
}));
