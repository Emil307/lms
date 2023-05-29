import { createStyles } from "@mantine/core";

export default createStyles((_theme) => ({
    root: {
        flexDirection: "column",
        padding: "24px 32px",
        gap: 8,
        borderRadius: 16,
        boxShadow: "0px 16px 32px rgba(2, 6, 46, 0.08)",
    },
    imageWrapper: {
        position: "relative",
        overflow: "hidden",
        width: 270,
        height: 166,
        borderRadius: 16,
    },
}));
