import { createStyles } from "@mantine/core";

export default createStyles((theme, { isAvailable, isFavorite }: { isAvailable: boolean; isFavorite: boolean }) => ({
    root: {
        alignItems: "center",
        padding: 16,
        gap: 8,
        borderRadius: 8,
        backgroundColor: isAvailable ? theme.colors.white[0] : theme.colors.grayLight[0],
    },
    wrapperDocumentIcon: {
        border: "none",
        minHeight: "auto",
        minWidth: "auto",
        height: 48,
        width: 48,
        borderRadius: 56,
        color: isAvailable ? theme.colors.secondary[0] : theme.colors.gray45[0],
        backgroundColor: isAvailable ? theme.colors.secondary8[0] : theme.colors.light[0],
    },
    categoryName: {
        fontWeight: 500,
        fontSize: 12,
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
    reactionButton: {
        height: 40,
        width: 77,
        borderRadius: 160,

        ":hover": {
            svg: {
                color: theme.colors.secondary[0],
            },
        },
    },
}));
