import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    statusAndPaymentTypeSelectsWrapper: {
        width: "100%",
        gap: 8,

        [theme.fn.smallerThan("xs")]: {
            flexDirection: "column",
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
