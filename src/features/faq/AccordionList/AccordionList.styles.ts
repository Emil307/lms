import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    faqContainer: {
        maxWidth: 1320,
        width: "100%",
        flexDirection: "row",
        textAlign: "left",
        gap: 24,

        [theme.fn.smallerThan("sm")]: {
            textAlign: "center",
            flexDirection: "column",
        },
    },
    skeletonTitleContainer: {
        width: "100%",
        maxWidth: 456,
        gap: "24px",
    },
    titleContainer: {
        flexBasis: "54%",
        marginRight: 24,
        [theme.fn.smallerThan("md")]: {
            gap: 24,
            marginBottom: 0,
            marginRight: 0,
        },
    },
}));
