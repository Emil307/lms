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
        zIndex: 399,
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
    containerButtonLinks: {
        gap: 1,

        [theme.fn.smallerThan("sm")]: {
            display: "none",
        },
    },
    buttonLink: {
        borderRadius: 160,
        padding: "8px 16px",
    },

    wrapperRightMenu: {
        alignItems: "center",
        gap: 24,

        [theme.fn.smallerThan("md")]: {
            gap: 4,
        },

        [theme.fn.smallerThan("sm")]: {
            gap: 12,
        },
    },
    actionIcon: {
        height: 40,
        width: 56,
        color: theme.colors.dark[0],
        borderRadius: 160,

        ":hover": {
            backgroundColor: theme.colors.grayLight[0],
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
