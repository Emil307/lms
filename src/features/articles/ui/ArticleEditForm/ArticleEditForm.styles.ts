import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    infoItem: {
        alignSelf: "center",
        fontWeight: 500,
        fontSize: 14,
        lineHeight: "16px",
        color: theme.colors.gray45[0],
        span: {
            color: theme.colors.dark[0],
        },
    },
    ratingTitle: {
        fontWeight: 500,
        fontSize: 14,
        lineHeight: "16px",
        color: theme.colors.gray45[0],
    },
    ratingValue: {
        fontWeight: 600,
        fontSize: 16,
        lineHeight: "24px",
        color: theme.colors.dark[0],
    },
    thumbs: {
        border: "none",
    },
}));
