import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    root: {
        flexDirection: "column",
        padding: 16,
        gap: 4,

        [theme.fn.smallerThan("md")]: {
            paddingBlock: 24,
            paddingInline: 0,
        },
    },
}));
