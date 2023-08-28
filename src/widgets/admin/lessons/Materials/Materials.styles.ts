import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    heading: {
        gap: 48,
        alignItems: "center",

        [theme.fn.smallerThan("xs")]: {
            justifyContent: "space-between",
        },
    },
}));
