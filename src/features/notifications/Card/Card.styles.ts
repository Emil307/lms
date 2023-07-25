import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    root: {
        flexDirection: "column",
        padding: 16,
        paddingTop: 24,
        gap: 8,
        borderRadius: 8,
        backgroundColor: theme.colors.light[0],
        cursor: "pointer",
    },

    createdAtNotification: {
        color: theme.colors.gray45[0],
        whiteSpace: "nowrap",
    },
    courseName: {
        fontWeight: 500,
        fontSize: 12,
        lineHeight: "16px",
        color: theme.colors.dark[0],
    },
}));
