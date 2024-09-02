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
        borderBottom: `1px solid ${theme.colors.grayLight[0]}`,
        zIndex: 399,
    },
    inner: {
        alignItems: "center",
        maxWidth: 1728,
        minHeight: 96,
        marginInline: "auto",

        [theme.fn.smallerThan("md")]: {
            minHeight: 74,
        },
    },
    containerButtonLinks: {
        gap: 12,
        marginLeft: 24,
        overflowX: "auto",

        "::-webkit-scrollbar": {
            display: "none",
        },

        [theme.fn.smallerThan("md")]: {
            gap: 4,
            marginLeft: 16,
        },

        [theme.fn.smallerThan("sm")]: {
            display: "none",
        },
    },
    buttonLink: {
        fontSize: 18,
        borderRadius: 160,
        padding: "8px 16px",
        height: 40,
    },
    logo: {
        svg: {
            color: theme.colors.dark[0],
        },
    },
    wrapperRightMenu: {
        marginLeft: "auto",
        alignItems: "center",
        gap: 24,

        [theme.fn.smallerThan("md")]: {
            gap: 12,
        },
    },
    actionIcon: {
        width: 56,
        height: 56,
        borderRadius: 56,

        svg: {
            color: theme.colors.dark[0],
            width: 24,
            height: 24,
        },

        "&:hover": {
            backgroundColor: theme.colors.neutralLight[0],
        },

        [theme.fn.smallerThan("md")]: {
            width: 48,
            height: 48,
        },
    },
    burgerSidebarIcon: {
        display: "none",
        width: 48,
        height: 48,
        color: theme.colors.dark[0],

        svg: {
            width: 24,
            height: 24,
        },

        [theme.fn.smallerThan("sm")]: {
            display: "flex",
        },
    },
    closeSidebarIcon: {
        display: "none",
        width: 48,
        height: 48,
        borderRadius: 60,
        color: theme.colors.primary[0],

        svg: {
            width: 24,
            height: 24,
        },

        "&:hover": {
            backgroundColor: theme.colors.primary8[0],
        },

        [theme.fn.smallerThan("sm")]: {
            display: "flex",
        },
    },
}));
