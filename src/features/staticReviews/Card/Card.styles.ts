import { createStyles } from "@mantine/core";

export default createStyles(() => ({
    root: {
        position: "relative",
        overflow: "hidden",
        height: 608,
        borderRadius: 32,
        padding: "0 !important",
    },
    content: {
        position: "absolute",
        width: "100%",
        height: "100%",
        padding: 48,
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
