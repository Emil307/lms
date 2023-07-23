import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    card: {
        padding: 24,
        borderRadius: 12,
        backgroundColor: theme.colors.neutralLight[0],
        margin: "32px 0",
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
