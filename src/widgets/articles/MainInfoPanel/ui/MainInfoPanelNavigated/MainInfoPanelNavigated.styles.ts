import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    root: {
        flexDirection: "column",
        width: "100%",
        padding: 24,
        gap: 32,
        borderRadius: 16,
        backgroundColor: theme.colors.white[0],
    },
    contentContainer: {
        width: "100%",
        columnGap: 16,
        rowGap: 24,

        [theme.fn.smallerThan("sm")]: {
            flexDirection: "column",
        },
    },

    headingContainer: {
        flex: 1,
        alignItems: "center",
        gap: 16,

        [theme.fn.smallerThan("xs")]: {
            flexDirection: "column",
            alignItems: "flex-start",
        },
    },

    wrapperDocumentIcon: {
        height: 60,
        width: 60,
        minWidth: 60,
        borderRadius: 56,
        color: theme.colors.secondary[0],
        backgroundColor: theme.colors.secondary8[0],
    },
}));
