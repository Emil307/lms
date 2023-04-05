import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    root: {
        display: "flex",
        alignItems: "start",
        flexWrap: "wrap-reverse",
        margin: "0 !important",
        gap: 16,
    },
    imageWrapper: {
        position: "relative",
        overflow: "hidden",
        width: 96,
        height: 96,
        borderRadius: 12,
    },

    endDate: {
        fontWeight: 500,
        fontSize: 14,
        lineHeight: "16px",
        color: theme.colors.dark[0],
        whiteSpace: "nowrap",
    },
}));
