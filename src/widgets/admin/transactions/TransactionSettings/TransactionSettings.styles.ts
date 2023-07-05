import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    root: {
        display: "grid",
        gridTemplateColumns: "1fr 334px",
        gap: 56,
        borderRadius: 24,
        backgroundColor: theme.colors.white[0],
    },
    description: {
        color: theme.colors.dark[0],
        lineHeight: "24px",
    },
}));
