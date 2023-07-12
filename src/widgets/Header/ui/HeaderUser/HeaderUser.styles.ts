import { createStyles } from "@mantine/core";
import { HEADER_HEIGHT } from "@shared/constant";

export default createStyles((theme) => ({
    root: {
        backgroundColor: theme.colors.white[0],
        position: "sticky",
        maxHeight: HEADER_HEIGHT,
        top: 0,
        left: 0,
        paddingInline: 16,
        borderBottom: "none",
        zIndex: 200,
    },
    inner: {
        justifyContent: "space-between",
        maxWidth: 1320,
        minHeight: 96,
        marginInline: "auto",

        [theme.fn.smallerThan("md")]: {
            minHeight: 74,
        },
    },
    logo: {
        [theme.fn.smallerThan("md")]: {
            transform: "scale(0.6)",
        },
    },

    logoLink: {
        color: theme.colors.dark[0],
        textDecoration: "none",
    },
    logoText: {
        [theme.fn.smallerThan("md")]: {
            display: "none",
        },
    },

    containerButtonLinks: {
        gap: 12,

        [theme.fn.smallerThan("md")]: {
            gap: 4,
        },

        [theme.fn.smallerThan("sm")]: {
            display: "none",
        },
    },

    wrapperRightMenu: {
        alignItems: "center",
        gap: 24,

        [theme.fn.smallerThan("sm")]: {
            gap: 12,
        },
    },

    burgerSidebarIcon: {
        width: 40,
        height: 40,
        color: theme.colors.dark[0],

        svg: {
            width: 24,
            height: 24,
        },

        [theme.fn.largerThan("sm")]: {
            display: "none",
        },
    },

    closeSidebarIcon: {
        width: 40,
        height: 40,
        borderRadius: 60,
        backgroundColor: theme.colors.primary8[0],
        color: theme.colors.primary[0],

        svg: {
            width: 24,
            height: 24,
        },

        [theme.fn.largerThan("sm")]: {
            display: "none",
        },
    },
}));
