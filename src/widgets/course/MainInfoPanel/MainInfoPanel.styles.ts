import { createStyles } from "@mantine/core";

interface CreateStylesParams {
    isFavorite?: boolean;
}

export default createStyles((theme, { isFavorite }: CreateStylesParams) => ({
    root: {
        width: "100%",
        padding: 32,
        borderRadius: 24,
        backgroundColor: theme.colors.white[0],
    },
    discount: {
        boxShadow: "0px 1px 2px rgba(0, 18, 110, 0.04), 0px 0px 16px rgba(0, 18, 110, 0.04)",
    },
    category: {
        backgroundColor: theme.colors.light[0],
        color: theme.colors.dark[0],
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
        backgroundColor: theme.colors.grayLight[0],
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
        backgroundColor: isFavorite ? theme.colors.grayLight[0] : "transparent",
        color: isFavorite ? theme.colors.secondary[0] : theme.colors.dark[0],

        svg: {
            width: 20,
            fill: isFavorite ? theme.colors.secondary[0] : "transparent",
        },

        ":hover": {
            backgroundColor: theme.colors.grayLight[0],
            svg: {
                color: theme.colors.secondary[0],
                fill: theme.colors.secondary[0],
            },
        },

        ":active": {
            backgroundColor: theme.colors.grayLight[0],
            svg: {
                color: theme.colors.dark[0],
                fill: theme.colors.dark[0],
            },
        },
        ":disabled": {
            color: theme.colors.gray45[0],
            backgroundColor: theme.colors.grayLight[0],
            svg: {
                color: theme.colors.gray45[0],
                fill: theme.colors.gray45[0],
            },
        },
    },
}));
