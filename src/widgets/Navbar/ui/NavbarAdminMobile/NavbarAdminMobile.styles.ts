import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    root: {
        position: "fixed",
        justifyContent: "space-between",
        width: "100vw",
        overflow: "hidden",
        height: "100vh",
        paddingTop: 82,
        border: "none",
        backgroundColor: theme.colors.light[0],
        zIndex: 101,
    },
    inner: {
        flexDirection: "column",
        justifyContent: "space-between",
        overflow: "auto",
        height: "100%",
        paddingTop: 24,
        paddingBottom: 56,
    },
}));
