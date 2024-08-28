import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    faqContainer: {
        maxWidth: 1320,
        width: "100%",
        flexDirection: "row",
        textAlign: "left",

        [theme.fn.smallerThan("sm")]: {
            textAlign: "center",
            gap: 24,
            flexDirection: "column",
        },
    },
    titleContainer: {
        flexBasis: "54%",
        marginRight: "24px",
        gap: "24px",
    },
    title: {
        fontSize: 42,
        color: theme.colors.dark[0],
    },
    description: {
        fontSize: 20,
        color: theme.colors.dark[0],
        opacity: 0.5,
        lineHeight: "24px",
    },
}));
