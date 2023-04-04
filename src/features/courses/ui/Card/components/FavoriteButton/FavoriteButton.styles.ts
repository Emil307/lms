import { createStyles } from "@mantine/core";

export default createStyles((theme, { isFavorite }: { isFavorite: boolean }) => ({
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
