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
        color: theme.colors.gray45[0],
        whiteSpace: "nowrap",
    },
}));
