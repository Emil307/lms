import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    root: {
        flexDirection: "column",
        padding: 16,
        paddingTop: 24,
        gap: 16,
        border: `1px solid ${theme.colors.neutralGray200[0]}`,
        borderRadius: 8,
        backgroundColor: theme.colors.neutralWhite[0],
    },
    avatarWrapper: {
        width: 32,
        minWidth: 32,
        height: 32,
        borderRadius: 160,

        ".mantine-Avatar-placeholder": {
            backgroundColor: theme.colors.neutralGray200[0],
        },
    },
    avatarDefaultIconWrapper: {
        svg: {
            transform: "scale(0.4)",
        },
    },
    userInfo: {
        flex: 1,
        justifyContent: "space-between",
        gap: 6,
    },
    createdAtLastMessage: {
        color: theme.colors.neutralMain50[0],
        whiteSpace: "nowrap",
    },
}));
