import { createStyles } from "@mantine/core";
import { HEADER_HEIGHT } from "@shared/constant";

export default createStyles((theme) => ({
    root: {
        display: "flex",
        alignItems: "center",
        position: "sticky",
        gap: "calc(280px - 24px - 228px)",
        top: 0,
        left: 0,
        maxHeight: HEADER_HEIGHT,
        padding: "16px 24px",
        border: "none",
        backgroundColor: theme.colors.neutralGray100[0],
        zIndex: 399,

        [theme.fn.smallerThan("md")]: {
            maxHeight: 82,
            gap: 16,
            paddingBlock: 12,
            paddingInline: 16,
        },
    },
    wrapperRightMenu: {
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        gap: 32,

        [theme.fn.smallerThan("sm")]: {
            justifyContent: "flex-end",
            gap: 12,
        },
    },
    logo: {
        svg: {
            color: theme.colors.dark[0],
        },
    },
    avatarWrapper: {
        width: 50,
        minWidth: 50,
        height: 50,
        borderRadius: 160,

        ".mantine-Avatar-placeholder": {
            backgroundColor: theme.colors.neutralGray200[0],
        },
    },
    avatarDefaultIconWrapper: {
        svg: {
            transform: "scale(0.65)",
        },
    },
    containerButtonLinks: {
        gap: 8,

        [theme.fn.smallerThan("sm")]: {
            display: "none",
        },
    },

    buttonIcon: {
        width: 56,
        height: 40,
        borderRadius: 160,
        color: theme.colors.dark[0],
        backgroundColor: theme.colors.neutralWhite[0],

        ":hover": {
            color: theme.colors.secondary[0],
            backgroundColor: theme.colors.neutralGray200[0],
        },

        ":active": {
            color: theme.colors.dark[0],
            backgroundColor: theme.colors.neutralGray200[0],
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
