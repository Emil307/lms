import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    root: {
        gap: 32,

        [theme.fn.smallerThan("md")]: {
            flexDirection: "column",
        },
    },
    wrapperContent: {
        flex: 1,
        flexDirection: "column",
        gap: 64,
    },
}));
