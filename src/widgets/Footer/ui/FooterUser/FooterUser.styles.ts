import { createStyles, keyframes } from "@mantine/core";

const pulse = keyframes({
    "0%": { transform: "scale(1)" },
    "25%": { transform: "scale(1.33)" },
    "50%": { transform: "scale(1)" },
    "75%": { transform: "scale(1.33)" },
    "100%": { transform: "scale(1)" },
});

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
        cursor: "pointer",

        ":hover": {
            textDecoration: "underline",
        },
    },

    link: {
        textDecoration: "none",
        color: theme.colors.dark[0],
    },
    socialLink: {
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
    bottomWrapper: {
        gap: 32,
        alignItems: "center",

        [theme.fn.smallerThan("lg")]: {
            flexDirection: "column",
            gap: 16,
        },
    },
    heartIcon: {
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: 24,
        height: 24,

        svg: {
            width: 18,
        },
    },
    addamant: {
        "&:hover": {
            "span:last-of-type": {
                color: theme.colors.primaryHover[0],
            },
            svg: {
                animation: `${pulse} 2s ease-in-out`,
                animationIterationCount: "infinite",
            },
        },
    },
    addamantText: {
        display: "inline-flex",
        alignItems: "center",
        gap: 2,
    },
}));
