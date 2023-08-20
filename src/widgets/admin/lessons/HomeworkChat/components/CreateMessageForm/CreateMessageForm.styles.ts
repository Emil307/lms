import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    messageBlock: {
        textarea: {
            minHeight: 86,
            height: "100%",
            padding: "20px 16px",
            paddingRight: 72,

            "::placeholder": {
                color: theme.colors.gray45[0],
            },
        },
    },

    sendIcon: {
        position: "absolute",
        right: 18,
        top: 20,
        width: 48,
        height: 48,
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
