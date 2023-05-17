import { createStyles } from "@mantine/core";

export default createStyles((theme, { isFavorite }: { isFavorite: boolean }, getRef) => ({
    root: {
        ref: getRef("root"),
        width: "100%",
        borderRadius: 16,
        backgroundColor: theme.colors.white[0],

        ":hover": {
            boxShadow: "0px 16px 32px rgba(2, 6, 46, 0.08)",

            [`.${getRef("title")}`]: {
                color: theme.colors.gray45[0],
            },
        },
    },
    cardImageSection: {
        position: "relative",
    },
    imageWrapper: {
        position: "relative",
        overflow: "hidden",
        width: "100%",
        height: 168,
        background: "rgba(0, 4, 41, 0.15)",
    },
    cardSectionContent: {
        position: "absolute",
        bottom: 16,
        left: 16,
        gap: 8,
    },
    discount: {
        height: "auto",
        padding: "6px 10px",
        border: "none",
        borderRadius: 60,
        backgroundColor: theme.colors.dark[0],
        boxShadow: "0px 1px 2px rgba(0, 18, 110, 0.04), 0px 0px 16px rgba(0, 18, 110, 0.04)",
        fontWeight: 500,
        fontSize: 12,
        lineHeight: "16px",
        color: theme.colors.white[0],
        textTransform: "inherit",
    },
    category: {
        height: "auto",
        padding: "6px 10px",
        border: "none",
        borderRadius: 60,
        backgroundColor: theme.colors.white[0],
        fontWeight: 500,
        fontSize: 12,
        lineHeight: "16px",
        color: theme.colors.dark[0],
        textTransform: "inherit",
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
        height: 88,
        gap: 8,

        "@media (max-width: 1440px)": {
            height: 112,
        },
    },
    title: {
        ref: getRef("title"),
        fontWeight: 600,
        fontSize: 18,
        lineHeight: "24px",
        color: theme.colors.dark[0],
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
    price: {
        fontWeight: 600,
        fontSize: 20,
        lineHeight: "24px",
        color: theme.colors.dark[0],
    },
    priceWithoutDiscount: {
        fontWeight: 400,
        fontSize: 20,
        lineHeight: "24px",
        color: theme.colors.gray45[0],
        textDecoration: "line-through",
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
}));
