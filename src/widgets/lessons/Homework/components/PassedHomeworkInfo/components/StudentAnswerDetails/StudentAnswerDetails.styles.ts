import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    root: {
        padding: 16,
        gap: 8,
        borderRadius: 8,
        border: `1px solid ${theme.colors.grayLight[0]}`,
        backgroundColor: theme.colors.white[0],
    },
    avatarWrapper: {
        width: 32,
        height: 32,
        minWidth: "auto",
        borderRadius: 50,

        ".mantine-Avatar-placeholder": {
            backgroundColor: theme.colors.grayLight[0],
        },
    },
    avatarDefaultIconWrapper: {
        svg: {
            transform: "scale(0.4)",
        },
    },
    editActionIcon: {
        width: 32,
        height: 32,
        color: theme.colors.gray45[0],
    },
}));
