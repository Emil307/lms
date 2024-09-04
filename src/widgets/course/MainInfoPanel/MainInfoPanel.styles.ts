import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    root: {
        width: "100%",
        padding: 32,
        borderRadius: 24,
        backgroundColor: theme.colors.neutralLight[0],

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
        gap: 24,
    },
    contentBodyTextContainer: {
        flexDirection: "column",
        gap: 16,
    },
    description: {
        wordBreak: "break-word",
        overflow: "break-word",
    },
    category: {
        border: `1px solid ${theme.colors.dark[0]}`,
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

    icon: {
        width: 24,
        height: 24,
        minHeight: 24,
        minWidth: 24,
        path: {
            fill: theme.colors.secondaryHover[0],
        },
    },
    getCourseWrapper: {
        gap: 16,
        paddingTop: 32,
        alignItems: "center",
        [theme.fn.smallerThan("md")]: {
            alignItems: "flex-start",
            flexDirection: "column",
        },
    },
    favoriteActionIcon: {
        height: 48,
        width: 48,
        borderRadius: 56,
    },

    descriptionContainer: {
        flexDirection: "column",
        marginTop: 32,
        gap: 8,
        wordBreak: "break-word",
    },
}));
