import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    root: {
        flexWrap: "wrap",
        gap: 8,
        wordBreak: "break-word",

        "::-webkit-scrollbar": {
            display: "none",
        },

        [theme.fn.smallerThan("md")]: {
            flexDirection: "row",
            width: "100%",
        },
    },
}));
