import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    root: {
        width: "100%",
        padding: 32,
        borderRadius: 24,
        backgroundColor: theme.colors.white[0],

        [theme.fn.smallerThan("md")]: {
            padding: 24,
        },
    },
    contentBody: {
        gap: 48,

        [theme.fn.smallerThan("sm")]: {
            flexDirection: "column-reverse",
        },
    },
    contentBodyLeftContainer: {
        flex: 1,
        flexDirection: "column",
        gap: 48,
    },
    contentBodyTextContainer: {
        flexDirection: "column",
        gap: 16,
    },

    containerActions: {
        flexWrap: "wrap-reverse",
        columnGap: 24,
        rowGap: 16,

        [theme.fn.smallerThan("xs")]: {
            flexDirection: "column-reverse",
        },
    },

    category: {
        backgroundColor: theme.colors.light[0],
        color: theme.colors.dark[0],
    },

    availableGroupInfoContainer: {
        flexWrap: "wrap",
        columnGap: 16,
        rowGap: 8,

        [theme.fn.smallerThan("xs")]: {
            flexDirection: "column",
        },
    },

    imageWrapper: {
        position: "relative",
        overflow: "hidden",
        width: 424,
        height: 260,
        borderRadius: 16,
        backgroundColor: theme.colors.grayLight[0],

        [theme.fn.smallerThan("md")]: {
            width: 350,
            height: 215,
        },

        [theme.fn.smallerThan("xs")]: {
            width: "100%",
            maxWidth: 295,
            height: 181,
        },
    },

    icon: {
        width: 24,
        height: 24,
        minHeight: 24,
        minWidth: 24,
        path: {
            fill: theme.colors.secondaryHover[0],
        },
    },

    favoriteActionIcon: {
        height: 48,
        width: 48,
        borderRadius: 8,
    },

    descriptionContainer: {
        flexDirection: "column",
        marginTop: 32,
        gap: 6,
    },
}));
