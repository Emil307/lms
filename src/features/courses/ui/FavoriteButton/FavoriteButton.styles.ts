import { createStyles } from "@mantine/core";

export default createStyles((theme, { isFavorite }: { isFavorite: boolean }) => ({
    favoriteActionButton: {
        borderRadius: 100,
        backgroundColor: theme.colors.neutralWhite[0],
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
            stroke: isFavorite ? theme.colors.secondary[0] : theme.colors.dark[0],
        },

        ":hover": {
            backgroundColor: theme.colors.neutralGray200[0],
            svg: {
                color: theme.colors.secondary[0],
                fill: theme.colors.secondary[0],
                stroke: `${theme.colors.secondary[0]} !important`,
            },
        },

        ":active": {
            backgroundColor: theme.colors.neutralGray200[0],
            svg: {
                color: theme.colors.dark[0],
                fill: theme.colors.dark[0],
                stroke: `${theme.colors.dark[0]} !important`,
            },
        },
        ":disabled": {
            color: theme.colors.neutralMain50[0],
            backgroundColor: theme.colors.neutralGray200[0],
            svg: {
                color: theme.colors.neutralMain50[0],
                fill: theme.colors.neutralMain50[0],
                stroke: `${theme.colors.neutralMain50[0]} !important`,
            },
        },
    },
}));
