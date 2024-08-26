import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    root: {
        flexDirection: "column",
        gap: 24,
    },
    imageWrapper: {
        position: "relative",
        width: "100%",
        paddingTop: "24%",
        borderRadius: 32,

        img: {
            objectFit: "contain",
        },

        [theme.fn.smallerThan("xs")]: {
            paddingTop: "0",
            height: 451,
        },
    },
}));
