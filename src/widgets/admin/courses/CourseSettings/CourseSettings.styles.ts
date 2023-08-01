import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    ratingWrapper: {
        position: "absolute",
        top: 16,
        left: 16,
        backgroundColor: theme.colors.white[0],
        borderRadius: 60,
        padding: "6px 16px",
        zIndex: 2,
    },
    star: {
        width: 20,
        height: 20,
    },
    rating: {
        display: "inline",
        fontWeight: 600,
        fontSize: 14,
        lineHeight: "24px",
    },
    currentRating: {
        display: "inline",
        color: theme.colors.dark[0],
    },
    maxRating: {
        display: "inline",
        color: theme.colors.neutral_gray[0],
    },
}));
