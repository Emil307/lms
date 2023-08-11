import { createStyles } from "@mantine/core";

export default createStyles((theme, { isFavorite }: { isFavorite: boolean }) => ({
    favoriteActionIcon: {
        height: 40,
        width: 56,
        borderRadius: 160,
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
    favoriteActionButton: {
        borderRadius: 160,
        backgroundColor: isFavorite ? theme.colors.grayLight[0] : "transparent",
        fontSize: 16,

        svg: {
            width: 20,
            color: isFavorite ? theme.colors.secondary[0] : theme.colors.dark[0],
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
                stroke: theme.colors.gray45[0],
            },
        },
    },
}));
