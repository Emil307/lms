import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    root: {
        flexDirection: "column",
        gap: 8,

        "::-webkit-scrollbar": {
            display: "none",
        },

        [theme.fn.smallerThan("md")]: {
            flexDirection: "row",
            width: "100%",
            overflowX: "auto",
        },
    },
}));
