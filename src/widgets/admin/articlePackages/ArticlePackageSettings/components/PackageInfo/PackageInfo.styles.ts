import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    root: {
        flexDirection: "column",
        padding: "24px 32px",
        gap: 8,
        borderRadius: 16,
        boxShadow: "0px 16px 32px rgba(2, 6, 46, 0.08)",
    },
    category: {
        fontWeight: 500,
        lineHeight: "24px",
        color: theme.colors.dark[0],
    },
}));
