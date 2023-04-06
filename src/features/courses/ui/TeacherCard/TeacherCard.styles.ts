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
    },
    countCourse: {
        height: "auto",
        padding: "6px 10px",
        border: "none",
        borderRadius: 60,
        backgroundColor: theme.colors.white[0],
        fontWeight: 500,
        fontSize: 12,
        lineHeight: "16px",
        color: theme.colors.dark[0],
        textTransform: "inherit",
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

    userDescription: {
        fontWeight: 500,
        fontSize: 14,
        lineHeight: "16px",
        color: theme.colors.gray45[0],
    },
}));
