import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    content: {
        display: "grid",
        gridTemplateColumns: "1fr 334px",
        padding: 32,
        gap: 56,
        borderRadius: 24,
        backgroundColor: theme.colors.white[0],
    },
}));
