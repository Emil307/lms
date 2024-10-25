import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    root: {
        position: "sticky",
        justifyContent: "center",
        maxWidth: 360,
        bottom: 32,
        left: 32,
        padding: 24,
        borderRadius: 16,
        boxShadow: "0px 16px 32px rgba(2, 6, 46, 0.08)",
        backgroundColor: theme.colors.dark[0],
    },
    text: {
        fontWeight: 500,
        fontSize: 14,
        lineHeight: "16px",
        textAlign: "center",
        color: theme.colors.neutralWhite[0],
    },
}));
