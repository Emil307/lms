import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    root: {
        width: "100%",
        padding: "24px !important",
        borderRadius: 16,

        ".mantine-Card-cardSection": {
            margin: 0,

            "&:first-of-type": {
                marginBottom: 32,
            },
        },
    },
    cardImageSection: {
        position: "relative",
    },
    imageWrapper: {
        position: "relative",
        overflow: "hidden",
        width: "100%",
        height: 220,
        borderRadius: 14,
        background: "rgba(0, 4, 41, 0.15)",
    },
    countCourse: {
        backgroundColor: theme.colors.white[0],
        color: theme.colors.dark[0],
    },
    cardSectionContent: {
        position: "absolute",
        bottom: 16,
        left: 16,
        gap: 8,
    },
    cardContentBody: {
        display: "flex",
        flexDirection: "column",
        marginBottom: "0 !important",
        gap: 16,
    },
}));
