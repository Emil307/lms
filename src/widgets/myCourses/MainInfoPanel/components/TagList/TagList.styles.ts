import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    root: {
        gap: 4,
    },
    tag: {
        borderRadius: 8,
        backgroundColor: theme.colors.light[0],
        color: theme.colors.gray45[0],
    },
}));
