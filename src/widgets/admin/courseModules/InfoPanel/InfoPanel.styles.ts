import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    item: {
        gap: 8,
        alignItems: "center",
    },
    label: {
        fontSize: 14,
        fontWeight: 500,
        lineHeight: "16px",
        color: theme.colors.gray45[0],
    },
}));
