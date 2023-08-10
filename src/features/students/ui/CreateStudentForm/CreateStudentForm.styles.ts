import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    notificationsContainer: {
        width: "100%",
        padding: 4,
        borderRadius: 12,
        backgroundColor: theme.colors.light[0],
    },
    avatarWrapper: {
        width: 84,
        minWidth: 84,
        height: 84,
        borderRadius: 50,

        ".mantine-Avatar-placeholder": {
            backgroundColor: theme.colors.grayLight[0],
        },
    },
}));
