import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    wrapper: {
        flexDirection: "column",
        gap: 64,

        [theme.fn.smallerThan("md")]: {
            gap: 48,
        },
    },
}));
