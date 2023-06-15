import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    wrapper: {
        flexDirection: "column",
        alignItems: "center",
        padding: 24,
        paddingBottom: 32,
        gap: 20,
        borderRadius: 12,
        backgroundColor: theme.colors.light[0],
    },
    emptyText: {
        fontWeight: 500,
        fontSize: 16,
        lineHeight: "24px",
        color: theme.colors.neutral_gray,
    },
    lessonOptionHeader: {
        flexDirection: "column",
        gap: 8,
    },
    lessonOptionDescription: {
        fontSize: 16,
        lineHeight: "24px",
        color: theme.colors.gray45[0],
    },
}));
