import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    rootProgress: {
        flexDirection: "column",
        width: "100%",
        gap: 16,
    },
    contentText: {
        flexWrap: "wrap",
        gap: 8,

        [theme.fn.smallerThan("xs")]: {
            flexDirection: "column",
        },
    },
    text: {
        whiteSpace: "nowrap",
    },
}));
