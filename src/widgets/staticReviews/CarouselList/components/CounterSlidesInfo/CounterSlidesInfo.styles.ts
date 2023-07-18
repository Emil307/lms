import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    root: {
        position: "absolute",
        alignItems: "center",
        height: 56,
        width: "fit-content",
        left: 120,
        top: 504,

        [theme.fn.smallerThan("sm")]: {
            top: 528,
            left: 94,
        },
    },
}));
