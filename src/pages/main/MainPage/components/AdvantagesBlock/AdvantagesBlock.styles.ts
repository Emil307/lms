import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    advantageItem: {
        flexDirection: "column",
        padding: "32px 24px",
        height: "100%",
        minHeight: 232,
        maxWidth: 424,
        width: "100%",
        gap: 16,
        borderRadius: 24,
        backgroundColor: theme.colors.white[0],
        textAlign: "left",
        overflowWrap: "anywhere",
        margin: "auto",

        [theme.fn.smallerThan("sm")]: {
            borderRadius: 24,
            paddingBlock: 16,
        },
    },
    headerTitle: {
        textAlign: "left",
        height: 56,
        gap: 16,
        fontWeight: 600,
    },
    titleIcon: {
        borderRadius: 64,
    },
    title: {
        fontSize: 20,
        lineHeight: "24px",
        alignItems: "center",
    },
    container: {
        backgroundColor: theme.colors.gray[0],
        display: "flex",
        justifyContent: "center",
        [theme.fn.smallerThan("sm")]: {
            borderRadius: 0,
            padding: "0 16px",
        },
    },
}));
