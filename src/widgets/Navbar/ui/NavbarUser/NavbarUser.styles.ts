import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    root: {
        position: "fixed",
        justifyContent: "space-between",
        gap: 32,
        minHeight: "calc(100vh - 74px)",
        width: "100vw",
        top: 74,
        bottom: 0,
        paddingTop: 24,
        paddingBottom: 56,
        paddingInline: 16,
        border: "none",
        backgroundColor: theme.colors.neutralWhite[0],
        overflowY: "auto",
        zIndex: 102,
    },
}));
