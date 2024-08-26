import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    root: {
        width: "100%",
        gap: 56,
        alignItems: "flex-start",

        [theme.fn.smallerThan("md")]: {
            flexDirection: "column",
        },
    },
    contentSection: {
        flexDirection: "column",
        gap: 32,
    },
    shortContent: {
        wordBreak: "break-word",
    },
    imageSection: {
        position: "relative",
        overflow: "hidden",
        paddingTop: "42%",
        width: "calc(50% - 56px)",
        flexShrink: 0,
        marginTop: "0 !important",
        borderRadius: 56,
        backgroundColor: theme.colors.darkGray[0],

        [theme.fn.smallerThan("md")]: {
            width: "66%",
            paddingTop: "66%",
        },

        [theme.fn.smallerThan("xs")]: {
            width: "100%",
            paddingTop: "138%",
        },
    },
    bannerImage: {
        objectFit: "cover",
    },
}));
