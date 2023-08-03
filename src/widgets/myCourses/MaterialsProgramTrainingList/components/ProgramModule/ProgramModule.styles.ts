import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    root: {
        flexDirection: "column",
        padding: 24,
        borderRadius: 16,
        gap: 32,
        backgroundColor: theme.colors.white[0],
    },

    content: {
        flexDirection: "column",
        gap: 8,
    },
}));
