import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
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
        gap: 48,
        alignItems: "center",

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
        borderRadius: 160,
    },
}));
