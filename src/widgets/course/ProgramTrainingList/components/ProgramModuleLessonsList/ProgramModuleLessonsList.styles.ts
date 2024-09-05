import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    listItem: {
        backgroundColor: theme.colors.white[0],
        padding: 24,
        borderRadius: 16,
        [theme.fn.smallerThan("md")]: {
            flexDirection: "column",
        },
    },
    title: {
        fontSize: 16,
        lineHeight: "22px",
    },
    description: {
        fontWeight: 600,
        fontSize: 18,
        lineHeight: "24px",
        [theme.fn.smallerThan("md")]: {
            fontSize: 16,
            lineHeight: "22px",
        },
    },
}));
