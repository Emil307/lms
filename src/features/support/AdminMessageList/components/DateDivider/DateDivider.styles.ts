import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    root: {
        alignItems: "center",
        paddingTop: 24,
        paddingBottom: 32,
        gap: 32,

        [theme.fn.smallerThan("md")]: {
            paddingTop: 8,
            paddingBottom: 16,
        },
    },
    divider: {
        flex: 1,
    },
}));
