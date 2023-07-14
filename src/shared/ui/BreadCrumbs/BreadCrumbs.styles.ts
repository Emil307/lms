import { createStyles } from "@mantine/core";

export default createStyles((_theme) => ({
    root: {
        width: "100%",
        overflowX: "auto",

        "::-webkit-scrollbar": {
            display: "none",
        },
    },
    separator: {
        marginInline: 8,
    },
}));
