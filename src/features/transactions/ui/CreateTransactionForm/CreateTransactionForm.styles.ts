import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    statusAndPaymentTypeSelectsWrapper: {
        width: "100%",
        gap: 8,

        [theme.fn.smallerThan("xs")]: {
            flexDirection: "column",
        },
    },
}));
