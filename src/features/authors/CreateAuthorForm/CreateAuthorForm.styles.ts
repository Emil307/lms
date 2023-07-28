import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    avatarWrapper: {
        width: 84,
        minWidth: 84,
        height: 84,
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
