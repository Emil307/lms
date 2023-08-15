import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    root: {
        display: "flex",
        margin: "0 !important",
        marginBottom: "0 !important",
        gap: 32,

        [theme.fn.smallerThan("sm")]: {
            flexWrap: "wrap",
        },

        [theme.fn.smallerThan("xs")]: {
            flexDirection: "column",
        },
    },
    contentContainer: {
        flexDirection: "column",
        flexWrap: "wrap",
        gap: 16,
    },
    textContainer: {
        flexDirection: "column",
        gap: 8,
    },
}));
