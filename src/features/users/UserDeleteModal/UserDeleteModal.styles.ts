import { createStyles } from "@mantine/core";

export const UserDeleteModalStyles = createStyles((theme) => ({
    warning: {
        backgroundColor: theme.colors.secondary16[0],
        borderRadius: 56,
        fontWeight: 500,
        minWidth: 48,
        height: 48,
    },
    text: {
        fontSize: 16,
        lineHeight: "24px",
        fontWeight: 500,
    },
}));