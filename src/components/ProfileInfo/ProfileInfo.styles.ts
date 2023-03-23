import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    root: {
        display: "flex",
        flexDirection: "column",
        gap: 24,
        padding: 32,
        paddingTop: 24,
        borderRadius: 16,
        backgroundColor: theme.colors.light[0],
    },
    content: {
        flexDirection: "column",
        alignItems: "flex-start",
        gap: 8,
    },
    actions: {
        gap: 8,
        button: {
            width: "100%",
        },
    },
}));
