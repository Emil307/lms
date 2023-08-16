import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    container: {
        gap: 16,
        flexDirection: "column",

        [theme.fn.smallerThan("sm")]: {
            gap: 32,
        },
    },
    card: {
        padding: 24,
        borderRadius: 8,
        backgroundColor: theme.colors.neutralLight[0],

        [theme.fn.smallerThan("sm")]: {
            backgroundColor: theme.colors.white[0],
            padding: 0,
        },
    },
    heading: {
        gap: 16,
        alignItems: "center",
        justifyContent: "space-between",

        [theme.fn.smallerThan("sm")]: {
            justifyContent: "flex-start",
        },

        [theme.fn.smallerThan("xs")]: {
            justifyContent: "space-between",
        },
    },
    wrapper: {
        gap: 16,
        flexDirection: "column",

        [theme.fn.smallerThan("sm")]: {
            gap: 32,
        },
    },
    testAndHomeworkWrapper: {
        gap: 24,
        flexWrap: "wrap",

        [theme.fn.smallerThan("xs")]: {
            flexDirection: "column",
            gap: 16,
        },
    },
    lessonDescription: {
        margin: "16px 0",
    },
    icon: {
        minWidth: 24,
        minHeight: 24,
    },
    button: {
        [theme.fn.smallerThan("xs")]: {
            maxWidth: "100%",
        },
    },
    buttons: {
        gap: 8,

        [theme.fn.smallerThan("xs")]: {
            flexDirection: "column",
        },
    },
}));
