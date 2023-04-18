import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    root: {
        alignItems: "center",
        padding: 8,
        paddingRight: 12,
        gap: 16,
        borderRadius: 8,
        backgroundColor: theme.colors.info16[0],
    },
    icon: {
        border: "none",
        color: theme.colors.info[0],
        width: 32,
        height: 32,
        minWidth: 28,
        minHeight: 28,
    },
    closeIcon: {
        borderRadius: 50,
        backgroundColor: theme.colors.white[0],
        color: theme.colors.primary[0],

        svg: {
            width: 15,
            strokeWidth: 3,
        },
    },
    content: {
        flex: 1,
        fontWeight: 600,
        fontSize: 14,
        lineHeight: "16px",
        color: theme.colors.gray45[0],
    },
}));
