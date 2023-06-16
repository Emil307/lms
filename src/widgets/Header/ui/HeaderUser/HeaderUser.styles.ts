import { createStyles } from "@mantine/core";
import { HEADER_HEIGHT } from "@shared/constant";

export default createStyles((theme) => ({
    root: {
        backgroundColor: theme.colors.white[0],
        position: "sticky",
        top: 0,
        left: 0,
        maxHeight: HEADER_HEIGHT,
        zIndex: 200,
    },
    inner: {
        justifyContent: "space-between",
        maxWidth: 1320,
        minHeight: 96,
        marginInline: "auto",
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
