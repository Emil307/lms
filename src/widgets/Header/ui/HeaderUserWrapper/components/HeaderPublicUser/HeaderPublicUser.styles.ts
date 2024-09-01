import { createStyles } from "@mantine/core";
import { HEADER_HEIGHT } from "@shared/constant";

export default createStyles((theme) => ({
    root: {
        backgroundColor: theme.colors.white[0],
        position: "sticky",
        top: 0,
        left: 0,
        maxHeight: HEADER_HEIGHT,
        paddingInline: 16,
        borderBottom: `1px solid ${theme.colors.grayLight[0]}`,
        zIndex: 399,
    },
    inner: {
        alignItems: "center",
        justifyContent: "space-between",
        maxWidth: 1728,
        minHeight: 96,
        marginInline: "auto",

        [theme.fn.smallerThan("md")]: {
            minHeight: 74,
        },
    },
    logo: {
        svg: {
            color: theme.colors.dark[0],
        },
    },
    menuButton: {
        "&[data-expanded='true']": {
            color: theme.colors.gray45[0],
        },
    },
    wordBreak: {
        wordBreak: "break-word",
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
    buttonIcon: {
        width: 56,
        height: 56,
        backgroundColor: theme.colors.neutralLight[0],
        borderRadius: 56,

        svg: {
            color: theme.colors.dark[0],
            width: 24,
            height: 24,
        },

        "&:hover": {
            backgroundColor: theme.colors.grayLight[0],
        },

        [theme.fn.smallerThan("md")]: {
            width: 48,
            height: 48,
        },
    },
    email: {
        lineHeight: "24px",
    },
    tgLink: {
        textDecoration: "none",
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
