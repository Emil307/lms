import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    root: {
        width: "100%",
    },
    ratingValue: {
        fontWeight: 600,
        fontSize: 26,
        lineHeight: "32px",
        color: theme.colors.dark[0],
    },
    ratingMaxValue: {
        fontWeight: 600,
        fontSize: 26,
        lineHeight: "32px",
        color: theme.colors.gray45[0],
    },
    reviewInfo: {
        fontWeight: 600,
        fontSize: 16,
        lineHeight: "24px",
        color: theme.colors.dark[0],
    },
}));
