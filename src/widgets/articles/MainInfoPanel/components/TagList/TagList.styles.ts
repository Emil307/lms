import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    tag: {
        height: 28,
        padding: "6px 10px",
        backgroundColor: theme.colors.light[0],
        fontWeight: 500,
        fontSize: 12,
        lineHeight: "16px",
        color: theme.colors.gray45[0],
        textTransform: "inherit",
    },
}));
