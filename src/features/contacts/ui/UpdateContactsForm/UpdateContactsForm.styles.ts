import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    textEditorRequisites: {
        maxWidth: 1162,
        height: 320,

        [theme.fn.smallerThan("xs")]: {
            height: 500,
        },
    },
}));
