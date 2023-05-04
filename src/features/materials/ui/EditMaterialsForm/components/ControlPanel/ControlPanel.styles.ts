import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    root: {
        alignItems: "center",
        padding: 16,
        gap: 24,
        borderRadius: 12,
        backgroundColor: theme.colors.light[0],

        ".mantine-Switch-body": {
            alignItems: "center",
        },
    },
    actionIcon: {
        width: "auto",
        height: "auto",
        padding: "8px 16px",
        borderRadius: 160,
        backgroundColor: theme.colors.grayLight[0],
        svg: {
            width: 24,
            height: 24,
        },
    },
}));
