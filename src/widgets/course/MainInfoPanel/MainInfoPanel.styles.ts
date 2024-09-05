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
    title: {
        fontSize: 42,
        lineHeight: "46px",
    },
    description: {
        fontWeight: 600,
        fontSize: 20,
        lineHeight: "24px",
        wordBreak: "break-word",
        overflow: "break-word",
        [theme.fn.smallerThan("md")]: {
            fontSize: 18,
            lineHeight: "24px",
        },
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
    getCourseButton: {
        fontSize: 18,
        lineHeight: "24px",
    },
    getCourseDescription: {
        fontSize: 16,
        lineHeight: "22px",
    },
    favoriteActionIcon: {
        height: 56,
        width: 56,
        borderRadius: 56,
        margin: 0,
    },

    descriptionContainer: {
        flexDirection: "column",
        marginTop: 32,
        gap: 8,
        wordBreak: "break-word",
    },
}));
