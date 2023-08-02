import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    icon: {
        backgroundColor: theme.colors.secondary[0],
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
    avatarDefaultIconWrapper: {
        width: "auto",
        height: "auto",
        minWidth: "auto",
        border: "none",
        svg: {
            transform: "scale(0.4)",
        },
    },
}));
