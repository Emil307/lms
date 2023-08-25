import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    infoPanel: {
        alignItems: "center",
        gap: 32,

        p: {
            whiteSpace: "nowrap",
        },

        "::-webkit-scrollbar": {
            display: "none",
        },

        [theme.fn.smallerThan("lg")]: {
            flexDirection: "row",
            width: "100%",
            gap: 24,
            overflowX: "auto",
        },
    },

    actions: {
        gap: 8,

        button: {
            width: "100%",
            maxWidth: 252,
        },

        [theme.fn.smallerThan("xs")]: {
            flexDirection: "column",

            button: {
                maxWidth: "none",
            },
        },
    },
}));
