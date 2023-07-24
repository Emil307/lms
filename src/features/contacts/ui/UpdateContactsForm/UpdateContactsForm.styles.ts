import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    textEditorRequisites: {
        maxWidth: 1162,
        height: 320,

        [theme.fn.smallerThan("xs")]: {
            height: 500,
        },
    },
    actionsContainer: {
        marginTop: 32,
        gap: 8,

        [theme.fn.smallerThan("xs")]: {
            flexDirection: "column",
        },
    },

    actionButton: {
        width: "100%",
        maxWidth: 252,

        [theme.fn.smallerThan("xs")]: {
            maxWidth: "none",
        },
    },
}));
