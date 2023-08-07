import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    messageBlock: {
        textarea: {
            minHeight: 86,
            height: "100%",
            padding: "20px 16px",

            "::placeholder": {
                color: theme.colors.gray45[0],
            },
        },
    },

    sendIcon: {
        position: "absolute",
        right: 30,
        top: 30,
        color: theme.colors.dark[0],

        ":hover": {
            backgroundColor: "transparent",
        },

        ":disabled": {
            border: "none",
            color: theme.colors.gray45[0],
            backgroundColor: "transparent",
            cursor: "none",
        },
    },
}));
