import { createStyles } from "@mantine/core";
import { HEADER_HEIGHT } from "@shared/constant";

export default createStyles((theme) => ({
    root: {
        backgroundColor: theme.colors.white[0],
        position: "sticky",
        top: 0,
        left: 0,
        maxHeight: HEADER_HEIGHT,
        borderBottom: "none",
        zIndex: 399,
    },
    inner: {
        alignItems: "center",
        justifyContent: "space-between",
        maxWidth: 1352,
        minHeight: 96,
        marginInline: "auto",
        paddingInline: 16,

        [theme.fn.smallerThan("md")]: {
            minHeight: 74,
        },
    },
    containerButtonLinks: {
        alignItems: "center",
        gap: 12,

        [theme.fn.smallerThan("md")]: {
            gap: 4,
        },

        [theme.fn.smallerThan("sm")]: {
            display: "none",
        },
    },
    buttonLink: {
        borderRadius: 160,
        padding: "8px 16px",
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
    wrapperRightMenu: {
        alignItems: "center",
        gap: 56,

        [theme.fn.smallerThan("lg")]: {
            gap: 36,
        },

        [theme.fn.smallerThan("md")]: {
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
