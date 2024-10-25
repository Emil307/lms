import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    root: {
        flexDirection: "column",
        paddingInline: 16,
        gap: 32,
        backgroundColor: theme.colors.neutralGray100[0],
    },

    socialLink: {
        alignItems: "center",
        justifyContent: "center",
        height: 56,
        width: 56,
        borderRadius: 56,
        color: theme.colors.neutralWhite[0],
        backgroundColor: theme.colors.dark[0],

        svg: {
            width: 24,
            height: 24,
        },

        ":hover": {
            color: theme.colors.dark[0],
            backgroundColor: theme.colors.secondary[0],
        },
    },
}));
