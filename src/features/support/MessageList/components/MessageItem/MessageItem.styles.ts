import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    root: {
        flexDirection: "column",
        padding: 16,
        paddingTop: 24,
        gap: 16,
        border: `1px solid ${theme.colors.grayLight[0]}`,
        borderRadius: 8,
        backgroundColor: theme.colors.white[0],
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
    userInfo: {
        flex: 1,
        justifyContent: "space-between",
        gap: 6,
    },
    userFullName: {
        fontWeight: 600,
        fontSize: 16,
        lineHeight: "24px",
        color: theme.colors.dark[0],
    },
    createdAtLastMessage: {
        fontWeight: 500,
        fontSize: 12,
        lineHeight: "16px",
        color: theme.colors.gray45[0],
        whiteSpace: "nowrap",
    },
    messageContent: {
        fontWeight: 500,
        fontSize: 14,
        lineHeight: "16px",
        color: theme.colors.dark[0],
    },
}));
