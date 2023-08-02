import { createStyles } from "@mantine/core";

export default createStyles((_theme) => ({
    root: {
        flexDirection: "column",
        alignSelf: "flex-end",
        maxWidth: 768,
        marginBottom: 104,
        gap: 48,
    },
    video: {
        display: "none",
        position: "fixed",
        top: 0,
        left: 0,
        height: "100vh",
        width: "100vw",
    },
}));
