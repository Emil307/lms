import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    root: {
        position: "relative",
    },
    inner: {
        position: "relative",
        overflow: "hidden",
        height: 608,
        borderRadius: 32,
    },
    content: {
        position: "absolute",
        width: "100%",
        height: "100%",
        padding: 48,

        [theme.fn.smallerThan("sm")]: {
            padding: 24,
        },
    },

    imageWrapper: {
        position: "absolute",
        width: "100%",
        height: "100%",

        "&::after": {
            position: "absolute",
            left: 0,
            top: 0,
            width: "100%",
            height: "100%",
            content: '""',
            background: "linear-gradient(0deg, rgba(2, 6, 46, 0.25), rgba(2, 6, 46, 0.25))",
        },
    },
}));
