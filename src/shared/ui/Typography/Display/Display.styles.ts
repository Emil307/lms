import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    root: {
        overflowWrap: "anywhere",
        fontWeight: 600,
        fontSize: 56,
        lineHeight: "62px",
        letterSpacing: "-1.12px",

        [theme.fn.smallerThan("md")]: {
            fontSize: 24,
            lineHeight: "32px",
        },
    },
}));
