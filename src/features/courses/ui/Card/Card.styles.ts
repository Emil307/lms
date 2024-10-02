import { createStyles } from "@mantine/core";

export default createStyles((theme, { isFavorite }: { isFavorite: boolean }, getRef) => ({
    root: {
        ref: getRef("root"),
        width: "100%",
        minWidth: 392,
        height: 520,
        borderRadius: 32,
        backgroundColor: theme.colors.neutralLight[0],
        cursor: "pointer",

        ":hover": {
            boxShadow: "0px 16px 32px rgba(2, 6, 46, 0.08)",

            [`.${getRef("title")}`]: {
                color: theme.colors.gray45[0],
            },
        },

        [theme.fn.smallerThan("sm")]: {
            minWidth: 343,
        },
    },
    cardImageSection: {
        position: "relative",
    },
    imageWrapper: {
        position: "relative",
        overflow: "hidden",
        width: "100%",
        height: 240,
        borderRadius: 32,
        backgroundColor: theme.colors.darkGray[0],
    },
    cardSectionContent: {
        paddingLeft: 24,
        gap: 8,
        height: 28,
    },
    discount: {
        backgroundColor: theme.colors.done[0],
        boxShadow: "0px 1px 2px rgba(0, 18, 110, 0.04), 0px 0px 16px rgba(0, 18, 110, 0.04)",
        padding: "6px 10px",
        color: theme.colors.dark[0],
        borderRadius: 8,
    },
    category: {
        backgroundColor: theme.colors.dark[0],
        color: theme.colors.white[0],
        borderRadius: 8,
    },
    cardContentBody: {
        display: "flex",
        flexDirection: "column",
        padding: 16,
        paddingBottom: 18,
        gap: 18,
    },
    headingContent: {
        display: "flex",
        flexDirection: "column",
        height: 106,
        gap: 8,
    },
    title: {
        ref: getRef("title"),
    },
    startDate: {
        fontWeight: 500,
        fontSize: 14,
        lineHeight: "16px",
    },
    lessonCount: {
        fontWeight: 500,
        fontSize: 14,
        lineHeight: "16px",
        color: theme.colors.dark[0],
    },

    favoriteActionIcon: {
        height: 40,
        width: 56,
        borderRadius: 160,
        backgroundColor: isFavorite ? theme.colors.grayLight[0] : "transparent",
        color: isFavorite ? theme.colors.secondary[0] : theme.colors.dark[0],
        stroke: "red",
        ":hover": {
            backgroundColor: isFavorite ? "transparent" : theme.colors.grayLight[0],
        },

        svg: {
            width: 20,
            fill: isFavorite ? theme.colors.secondary[0] : "transparent",
        },
    },
    favoriteActionButton: {
        borderRadius: 160,
        backgroundColor: isFavorite ? theme.colors.grayLight[0] : "transparent",
        fontSize: 16,

        ":hover": {
            backgroundColor: isFavorite ? "transparent" : theme.colors.grayLight[0],
        },

        svg: {
            width: 20,
            color: isFavorite ? theme.colors.secondary[0] : theme.colors.dark[0],
            fill: isFavorite ? theme.colors.secondary[0] : "transparent",
        },
    },
    moreButton: {
        borderRadius: 56,
    },
}));
