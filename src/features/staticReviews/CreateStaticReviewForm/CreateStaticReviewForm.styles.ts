import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    fieldset: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        width: "100%",
        margin: 0,
        padding: 0,
        gap: 7.5,
        border: "none",
    },
    legend: {
        display: "flex",
        gap: 16,
        marginBottom: 24,

        svg: {
            color: "gray45.0",
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
    quoteTextarea: {
        textarea: {
            minHeight: 190,
        },
    },
    previewFileInput: {
        height: 304,
        width: "100%",
        maxWidth: 660,

        [theme.fn.smallerThan("xs")]: {
            height: 129,
        },
    },
}));
