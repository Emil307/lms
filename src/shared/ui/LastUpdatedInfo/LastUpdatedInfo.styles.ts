import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    root: {
        alignItems: "center",
        gap: 8,
        fontWeight: 500,
        fontSize: 14,
        lineHeight: "16px",
        color: theme.colors.gray45[0],
    },
    date: {
        color: theme.colors.dark[0],
    },
    userInfo: {
        color: theme.colors.primary[0],
    },
}));
