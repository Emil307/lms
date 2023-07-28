import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    root: {
        gap: 24,

        [theme.fn.smallerThan("xs")]: {
            flexDirection: "column",
            gap: 16,
        },
    },
}));
