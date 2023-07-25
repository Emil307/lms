import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    infoPanel: {
        alignItems: "center",
        gap: 32,

        p: {
            whiteSpace: "nowrap",
        },

        "::-webkit-scrollbar": {
            display: "none",
        },

        [theme.fn.smallerThan("md")]: {
            flexDirection: "row",
            width: "100%",
            overflowX: "auto",
        },
    },

    avatarWrapper: {
        width: 84,
        minWidth: 84,
        height: 84,
    },
    filterRadioGroup: {
        [theme.fn.smallerThan("xs")]: {
            ".mantine-Group-root": {
                alignItems: "flex-start",
                flexDirection: "column",
            },
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
        maxWidth: 600,
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
        backgroundColor: theme.colors.light[0],
    },

    actions: {
        gap: 8,

        button: {
            width: "100%",
            maxWidth: 252,
        },

        [theme.fn.smallerThan("xs")]: {
            flexDirection: "column",

            button: {
                maxWidth: "none",
            },
        },
    },
}));
