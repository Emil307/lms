import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    infoPanel: {
        alignItems: "center",
        gap: 32,
        marginTop: 24,

        p: {
            whiteSpace: "nowrap",
        },

        "::-webkit-scrollbar": {
            display: "none",
        },

        [theme.fn.smallerThan("md")]: {
            flexDirection: "row",
            width: "100%",
            gap: 24,
            overflowX: "auto",
        },
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
        maxWidth: 772,
        textarea: {
            minHeight: 190,
        },
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
