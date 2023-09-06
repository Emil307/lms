import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    imageWrapper: {
        position: "relative",
        width: 450,
        height: 188,

        [theme.fn.smallerThan("xs")]: {
            width: 295,
            height: 124,
        },
    },
}));
