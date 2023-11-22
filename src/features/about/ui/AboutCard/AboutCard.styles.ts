import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    root: {
        flexDirection: "column",
        width: "100%",
        padding: 32,
        gap: 48,
        borderRadius: 16,
        backgroundColor: theme.colors.white[0],

        [theme.fn.smallerThan("md")]: {
            padding: 24,
        },
    },
    imageSection: {
        position: "relative",
        overflow: "hidden",
        width: "100%",
        height: 420,
        marginTop: "0 !important",
        borderRadius: 16,
        backgroundColor: theme.colors.darkGray[0],
    },
    bannerImage: {
        objectFit: "cover",
    },
    contentSection: {
        justifyContent: "space-between",
        gap: 32,

        [theme.fn.smallerThan("md")]: {
            flexDirection: "column",
        },
    },
    headingContentSection: {
        flexDirection: "column",
        maxWidth: 410,
        gap: 48,

        [theme.fn.smallerThan("md")]: {
            maxWidth: "none",
            gap: 24,
        },
    },

    shortContent: {
        width: "100%",
        maxWidth: 604,

        [theme.fn.smallerThan("md")]: {
            maxWidth: "none",
        },
    },
}));
