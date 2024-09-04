import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    root: {
        gap: 12,
        paddingTop: 48,
        width: "100%",
        [theme.fn.smallerThan("md")]: {
            flexDirection: "column",
        },
    },
    iconContainer: {
        padding: 12,
        border: `1px solid ${theme.colors.neutral_gray300[0]}`,
        borderRadius: 16,
        [theme.fn.smallerThan("md")]: {
            flexDirection: "column",
        },
    },
    modulesContainer: {
        backgroundColor: theme.colors.white[0],
        padding: 16,
        borderRadius: 16,
        alignItems: "center",
        flex: 1,
        gap: 24,
        [theme.fn.smallerThan("md")]: {
            alignItems: "flex-start",
            flexDirection: "column",
        },
    },
}));
