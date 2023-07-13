import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    root: {
        flexDirection: "column",
        alignItems: "flex-start",
        padding: 32,
        gap: 32,
        borderRadius: 24,
        backgroundColor: theme.colors.white[0],

        [theme.fn.smallerThan("md")]: {
            padding: 24,
        },
    },
    requisitesContainer: {
        flexDirection: "column",
        alignItems: "flex-start",
        gap: 8,
    },
}));
