import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    topCard: {
        gap: 32,
        alignItems: "center",
        justifyContent: "space-between",
        padding: 24,
        borderRadius: 12,
        backgroundColor: theme.colors.neutralLight[0],

        [theme.fn.smallerThan("sm")]: {
            backgroundColor: theme.colors.white[0],
            border: `1px solid rgba(0, 4, 41, 0.2)`,
        },

        [theme.fn.smallerThan("xs")]: {
            flexDirection: "column",
            alignItems: "flex-start",
        },
    },
    alertIconWrapper: {
        backgroundColor: theme.colors.secondary16[0],
        borderRadius: 56,
    },
    warningIconWrapper: {
        backgroundColor: theme.colors.warning16[0],
        borderRadius: 56,
    },
    taskCard: {
        backgroundColor: theme.colors.white[0],
        padding: "16px 18px",
        borderRadius: 8,
        border: "1px solid",
        borderColor: theme.colors.grayLight[0],
    },
    letter: {
        minWidth: 40,
        height: 40,
        fontSize: 16,
        lineHeight: "24px",
        fontWeight: 600,
    },
    button: {
        borderRadius: 160,
    },
    checkIconWrapper: {
        backgroundColor: theme.colors.done16[0],
        borderRadius: 56,
    },
    helpIconWrapper: {
        backgroundColor: theme.colors.secondary16[0],
        borderRadius: 56,
    },
}));
