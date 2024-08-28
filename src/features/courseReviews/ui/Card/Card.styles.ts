import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    root: {
        display: "flex",
        flexDirection: "column",
        padding: "24px 24px 40px !important",
        gap: 32,
        borderRadius: 16,
        backgroundColor: theme.colors.grayLight[0],
        height: "100%",
    },
    section: {
        display: "flex",
        flexDirection: "column",
        margin: "0px !important",
        gap: 16,

        ".mantine-Spoiler-control": {
            position: "absolute",
            right: 0,
            bottom: 0,
            fontWeight: 600,
            fontSize: 16,
            lineHeight: "24px",
            color: theme.colors.dark[0],
        },
    },

    rating: {
        alignItems: "center",
        alignSelf: "self-start",
        gap: 4,

        [theme.fn.smallerThan("xs")]: {
            marginLeft: 0,
        },
    },
    ratingValue: {
        fontWeight: 600,
        fontSize: 14,
        lineHeight: "16px",
        color: theme.colors.dark[0],
    },

    courseName: {
        fontWeight: 500,
        fontSize: 14,
        lineHeight: "24px",
        color: theme.colors.dark[0],
    },
    iconLinkCourse: {
        height: 18,
        width: 18,
        minHeight: 18,
        minWidth: 18,
        borderRadius: 56,
        backgroundColor: theme.colors.secondary16[0],
        color: theme.colors.dark[0],
        ":hover": {
            backgroundColor: theme.colors.secondary8[0],
        },

        svg: {
            width: 9,
            color: theme.colors.secondaryHover[0],
            strokeWidth: 5,
        },
    },
}));
