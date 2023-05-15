import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    root: {
        backgroundColor: theme.colors.white[0],
        position: "static",
    },
    inner: {
        justifyContent: "space-between",
        maxWidth: 1320,
        minHeight: 96,
        marginInline: "auto",
        paddingInline: 16,
    },
    logoLink: {
        color: theme.colors.dark[0],
        textDecoration: "none",
    },
    actionIcon: {
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
