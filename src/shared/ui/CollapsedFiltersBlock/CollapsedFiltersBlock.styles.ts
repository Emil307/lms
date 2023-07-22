import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    root: {
        flexDirection: "column",
        alignItems: "flex-start",
        width: "100%",
        gap: 32,

        [theme.fn.smallerThan("md")]: {
            alignItems: "flex-start",
            gap: 24,
        },
    },

    inner: {
        width: "100%",
    },
}));
