import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    imageFileUploader: {
        height: 420,
        width: "100%",
        maxWidth: 1256,

        [theme.fn.smallerThan("md")]: {
            height: 300,
        },

        [theme.fn.smallerThan("sm")]: {
            height: 180,
        },
    },

    textEditorFullContent: {
        maxWidth: 1162,
        height: 320,
        marginTop: 24,

        [theme.fn.smallerThan("xs")]: {
            height: 500,
        },
    },

    actions: {
        marginTop: 32,

        [theme.fn.smallerThan("xs")]: {
            flexDirection: "column",
        },
    },
}));
