import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    avatarIcon: {
        ".mantine-Avatar-placeholder": {
            backgroundColor: theme.colors.grayLight[0],
        },
    },
    avatarUsername: {
        fontWeight: 600,
        fontSize: 16,
        lineHeight: "24px",
        color: theme.colors.dark[0],
    },
    avatarRole: {
        fontWeight: 500,
        fontSize: 14,
        lineHeight: "16px",
        color: theme.colors.primaryHover[0],
    },

    role: {
        fontSize: 14,
        lineHeight: "16px",
        color: theme.colors.dark[0],
    },

    actions: {
        gap: 8,
        button: {
            width: "100%",
            maxWidth: 252,
        },
    },
}));
