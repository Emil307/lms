import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    root: {
        position: "static",
        backgroundColor: "inherit",
        width: 280,
        marginBlock: 24,
        paddingBlock: 8,
        border: "none",
        overflowY: "auto",
        zIndex: 1,

        [theme.fn.smallerThan("lg")]: {
            overflow: "hidden",
            width: 72,
            marginBlock: 0,
            paddingBlock: 0,

            zIndex: 200,
        },

        [theme.fn.smallerThan("sm")]: {
            display: "none",
        },
    },
    inner: {
        position: "sticky",
        left: 0,

        [theme.fn.smallerThan("lg")]: {
            position: "static",
            height: "100%",
            top: 0,
            paddingBlock: 32,
            width: 280,
            backgroundColor: theme.colors.light[0],
            overflow: "hidden",
        },
    },
}));
