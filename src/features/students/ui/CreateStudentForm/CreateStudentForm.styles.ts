import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    avatarWrapper: {
        width: 84,
        minWidth: 84,
        height: 84,
        borderRadius: 50,

        ".mantine-Avatar-placeholder": {
            backgroundColor: theme.colors.neutralGray200[0],
        },
    },

    formInput: {
        width: 252,

        [theme.fn.smallerThan("xs")]: {
            width: "100%",
        },
    },

    rolesRadioGroup: {
        [theme.fn.smallerThan("xs")]: {
            ".mantine-Group-root": {
                alignItems: "flex-start",
                flexDirection: "column",
            },
        },
    },

    notificationsContainer: {
        width: "100%",
        padding: 4,
        borderRadius: 12,
        backgroundColor: theme.colors.neutralGray100[0],
    },
}));
