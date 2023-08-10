import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    icon: {
        backgroundColor: theme.colors.secondary[0],
        color: theme.colors.white[0],
    },
    answer: {
        borderRadius: 12,
        backgroundColor: theme.colors.neutralLight[0],
        padding: 24,
    },
    answerContent: {
        backgroundColor: theme.colors.white[0],
        padding: 16,
        borderRadius: 8,
    },
    avatarWrapper: {
        width: 32,
        minWidth: 32,
        height: 32,
        borderRadius: 56,

        ".mantine-Avatar-placeholder": {
            backgroundColor: theme.colors.grayLight[0],
        },
    },
    avatarDefaultIconWrapper: {
        width: "auto",
        height: "auto",
        minWidth: "auto",
        border: "none",
        svg: {
            transform: "scale(0.4)",
        },
    },
    status: {
        borderRadius: 32,
        padding: "8px 12px",
        backgroundColor: theme.colors.done16[0],
        p: {
            color: theme.colors.done[0],
        },
    },
}));
