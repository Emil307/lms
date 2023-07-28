import { createStyles } from "@mantine/core";

export const UserDeleteModalStyles = createStyles((theme) => ({
    warning: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: theme.colors.secondary16[0],
        borderRadius: 56,
        fontWeight: 500,
        minWidth: 48,
        height: 48,
    },
}));
