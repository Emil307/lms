import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    topCard: {
        width: "100%",
        padding: 24,
        borderRadius: 12,
        backgroundColor: theme.colors.neutralLight[0],

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
}));
