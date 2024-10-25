import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    root: {
        alignItems: "center",
        justifyContent: "space-between",
        padding: 16,
        gap: 24,
        borderRadius: 12,
        backgroundColor: theme.colors.neutralGray100[0],

        ".mantine-Switch-body": {
            alignItems: "center",
        },
    },
    actionIcon: {
        width: 56,
        height: 40,
        minWidth: 56,
        padding: "8px 16px",
        borderRadius: 160,
        backgroundColor: theme.colors.neutralGray200[0],
        svg: {
            width: 24,
            height: 24,
            minWidth: 24,
            minHeight: 24,
        },
    },
}));
