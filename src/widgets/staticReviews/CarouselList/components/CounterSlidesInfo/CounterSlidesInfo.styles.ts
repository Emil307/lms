import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    root: {
        position: "absolute",
        alignItems: "center",
        justifyContent: "center",
        height: 56,
        width: 58,
        left: 112,
        top: 504,

        [theme.fn.smallerThan("sm")]: {
            top: 528,
            left: 94,
        },
    },
}));
