import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    root: {
        alignItems: "center",
        width: "100%",
        gap: 32,

        [theme.fn.smallerThan("xs")]: {
            alignItems: "flex-start",
            flexDirection: "column",
        },
    },
    contentContainer: {
        flexDirection: "column",
        flexWrap: "wrap",
        gap: 16,
    },
    textContainer: {
        flexDirection: "column",
        gap: 8,
        wordBreak: "break-word",
    },
}));
