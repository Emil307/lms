import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    root: {
        width: "100%",
        padding: 32,
        borderRadius: 24,
        backgroundColor: theme.colors.white[0],
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
        backgroundColor: theme.colors.light[0],
        fontWeight: 500,
        fontSize: 12,
        lineHeight: "16px",
        color: theme.colors.dark[0],
        textTransform: "inherit",
    },
    ratingValue: {
        fontWeight: 600,
        fontSize: 14,
        lineHeight: "24px",
        color: theme.colors.dark[0],
    },
    ratingMaxValue: {
        fontWeight: 600,
        fontSize: 14,
        lineHeight: "24px",
        color: theme.colors.gray45[0],
    },
    reviewInfo: {
        fontWeight: 600,
        fontSize: 14,
        lineHeight: "24px",
        color: theme.colors.dark[0],
    },
    dividerDot: {
        alignSelf: "center",
        height: 4,
        borderLeftColor: theme.colors.dark[0],
        borderLeftStyle: "dotted",
    },
    imageWrapper: {
        position: "relative",
        overflow: "hidden",
        width: 424,
        height: 260,
        borderRadius: 16,
    },
    contentText: {
        fontWeight: 500,
        fontSize: 14,
        lineHeight: "16px",
        color: theme.colors.dark[0],
    },
    favoriteActionIcon: {
        height: 48,
        width: 48,
        borderRadius: 8,
        color: theme.colors.dark[0],
        ":hover": {
            backgroundColor: theme.colors.grayLight[0],
        },

        svg: {
            width: 20,
        },
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
    descriptionTitle: {
        fontWeight: 500,
        fontSize: 16,
        lineHeight: "24px",
        color: theme.colors.gray45[0],
    },
    tag: {
        backgroundColor: theme.colors.light[0],
        color: theme.colors.gray45[0],
        textTransform: "inherit",
    },
}));
