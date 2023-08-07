import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    root: {
        flexDirection: "column",
        height: "100%",

        [theme.fn.smallerThan("md")]: {
            paddingInline: 0,
            paddingBlock: 0,
            paddingTop: 24,
        },
    },
    messageContainer: {
        flexDirection: "column",
        gap: 8,
    },
}));
