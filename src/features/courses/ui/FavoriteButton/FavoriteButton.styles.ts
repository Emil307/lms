import { createStyles } from "@mantine/core";

export default createStyles((theme, { isFavorite }: { isFavorite: boolean }) => ({
    favoriteActionButton: {
        borderRadius: 100,
        backgroundColor: theme.colors.white[0],
        padding: 0,
        width: 48,
        height: 48,
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        margin: 24,

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
