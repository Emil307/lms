import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    root: {
        display: "flex",
        flexDirection: "column",
        padding: 16,
        gap: 24,
        borderRadius: 16,
        border: `1px solid ${theme.colors.light[0]}`,
        cursor: "pointer",
    },
}));
