import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    textEditorContent: {
        maxWidth: 1162,
        height: 320,
        marginTop: 24,

        [theme.fn.smallerThan("xs")]: {
            height: 500,
        },
    },
}));
