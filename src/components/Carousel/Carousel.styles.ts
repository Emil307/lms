import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    root: {},
    viewport: {
        marginBottom: 48,
    },
    controls: {
        top: "calc(50% - 60px)",
        left: -22,
        right: -22,
        padding: 0,

        "@media (max-width: 1440px)": {
            left: -8,
            right: -8,
        },
    },
    control: {
        width: 56,
        height: 56,
        borderRadius: 48,
        border: "none",
        color: theme.colors.dark[0],
        opacity: 1,

        "&[data-inactive]": {
            opacity: 0,
        },

        ":hover": {
            boxShadow: "drop-shadow(0px 1px 2px rgba(0, 18, 110, 0.04)) drop-shadow(0px 0px 16px rgba(0, 18, 110, 0.04));",
        },
    },

    indicators: {
        position: "initial",
    },
    indicator: {
        height: 6,
        width: 11,
        borderRadius: 8,
        backgroundColor: theme.colors.gray20[0],

        "&[data-active]": {
            width: 23,
            backgroundColor: theme.colors.dark[0],
        },
    },
}));