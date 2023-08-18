import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    root: {
        width: "100%",
        padding: 32,
        borderRadius: 24,
        gap: 69,
        backgroundColor: theme.colors.white[0],

        [theme.fn.smallerThan("md")]: {
            flexDirection: "column",
            gap: 24,
        },
    },
    headingContainer: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        gap: 8,
    },

    authorWrapperList: {
        flex: 2,
        flexDirection: "column",
        gap: 24,
    },

    authorCard: {
        flex: 2,
        alignItems: "center",
        gap: 24,

        [theme.fn.smallerThan("sm")]: {
            alignItems: "flex-start",
            flexDirection: "column",
        },
    },

    avatarWrapper: {
        width: 84,
        minWidth: 84,
        height: 84,
        minHeight: 84,
        borderRadius: 50,

        ".mantine-Avatar-placeholder": {
            backgroundColor: theme.colors.grayLight[0],
        },
    },
}));
