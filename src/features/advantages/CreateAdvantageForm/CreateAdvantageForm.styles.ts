import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    imageInput: {
        maxWidth: 512,
        width: "100%",
        height: 308,

        [theme.fn.smallerThan("xs")]: {
            position: "absolute",
            top: 0,
            left: 0,
            height: "100%",
        },
    },
}));
