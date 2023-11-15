import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
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
}));
