import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    root: {
        alignItems: "center",
        justifyContent: "space-between",
        paddingInline: 16,
        gap: 32,
    },

    avatarDefaultIconWrapper: {
        svg: {
            transform: "scale(0.65)",
        },
    },
    containerButtonLinks: {
        gap: 8,
    },

    buttonIcon: {
        width: 56,
        height: 40,
        borderRadius: 160,
        color: theme.colors.dark[0],
        backgroundColor: theme.colors.white[0],

        ":hover": {
            color: theme.colors.secondary[0],
            backgroundColor: theme.colors.grayLight[0],
        },

        ":active": {
            color: theme.colors.dark[0],
            backgroundColor: theme.colors.grayLight[0],
        },
    },
}));
