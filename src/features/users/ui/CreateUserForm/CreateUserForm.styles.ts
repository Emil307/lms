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
    rolesRadioGroup: {
        [theme.fn.smallerThan("xs")]: {
            ".mantine-Group-root": {
                alignItems: "flex-start",
                flexDirection: "column",
            },
        },
    },
    formInput: {
        width: 252,

        [theme.fn.smallerThan("xs")]: {
            width: "100%",
        },
    },

    additionalImageFileInput: {
        width: 378,
        height: 222,

        [theme.fn.smallerThan("xs")]: {
            width: "100%",
            maxWidth: 297,
            height: 173,
            minHeight: "auto",
        },
    },

    descriptionTextarea: {
        width: "100%",
        textarea: {
            minHeight: 190,
        },

        [theme.fn.smallerThan("sm")]: {
            textarea: {
                minHeight: 187,
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
