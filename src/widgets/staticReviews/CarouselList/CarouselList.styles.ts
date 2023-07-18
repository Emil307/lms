import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    wrapper: {
        position: "relative",
    },
    controls: {
        top: 504,
        left: 48,
        width: "fit-content",
        padding: 0,

        [theme.fn.smallerThan("sm")]: {
            top: 528,
            left: 24,
        },
    },
    control: {
        width: 56,
        height: 56,
        borderRadius: 48,
        border: "none",
        color: theme.colors.dark[0],
        opacity: 1,

        ":hover": {
            color: theme.colors.secondary[0],
        },
    },
}));
