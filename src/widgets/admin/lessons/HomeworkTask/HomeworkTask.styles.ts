import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    root: {
        flexDirection: "column",
        gap: 32,
    },
    headingContainer: {
        alignItems: "center",
        gap: 16,

        [theme.fn.smallerThan("xs")]: {
            justifyContent: "space-between",
        },
    },
    icon: {
        width: 48,
        minWidth: 48,
        height: 48,
        borderRadius: 56,
        backgroundColor: theme.colors.secondary[0],
        color: theme.colors.white[0],
    },
    headingHomeworkContainer: {
        alignItems: "flex-start",
        justifyContent: "space-between",
        gap: 16,

        [theme.fn.smallerThan("md")]: {
            flexWrap: "wrap",
        },

        [theme.fn.smallerThan("xs")]: {
            flexDirection: "column",
        },
    },
    headingHomeworkTextContainer: {
        gap: 16,

        [theme.fn.smallerThan("xs")]: {
            flexDirection: "column",
        },
    },

    answerContainer: {
        flexDirection: "column",
        padding: 24,
        gap: 24,
        borderRadius: 12,
        backgroundColor: theme.colors.neutralLight[0],

        [theme.fn.smallerThan("xs")]: {
            padding: 16,
        },
    },
    answerContent: {
        backgroundColor: theme.colors.white[0],
        padding: 16,
        gap: 8,
        borderRadius: 8,
    },
    answerStudentContainer: {
        width: "calc(100% - 48px)",
    },
    answerStudentInfo: {
        marginBottom: 8,
        gap: 6,

        [theme.fn.smallerThan("xs")]: {
            justifyContent: "space-between",
        },
    },
    avatarWrapper: {
        width: 32,
        minWidth: 32,
        height: 32,
        borderRadius: 56,

        ".mantine-Avatar-placeholder": {
            backgroundColor: theme.colors.grayLight[0],
        },
    },
    avatarDefaultIconWrapper: {
        svg: {
            transform: "scale(0.4)",
        },
    },
    status: {
        borderRadius: 32,
        padding: "8px 12px",
        backgroundColor: theme.colors.done16[0],
        p: {
            color: theme.colors.done[0],
        },
    },
}));
