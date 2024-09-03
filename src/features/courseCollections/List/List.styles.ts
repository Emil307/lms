import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    title: {
        fontSize: 42,
        lineHeight: "46px",
        color: theme.colors.dark[0],
        textAlign: "center",
    },
    description: {
        fontSize: 20,
        lineHeight: "24px",
        color: theme.colors.dark[0],
        textAlign: "center",
        opacity: 0.5,
    },
    viewport: {
        marginBottom: 48,
    },
    container: {
        height: 475,
        alignItems: "center",
    },
    slide: {
        opacity: 0.6,
    },
    activeSlide: {
        transform: "scale(1.1)",
        transition: "all 0.3s",
        margin: "0px 24px",
        opacity: 1,
        [theme.fn.smallerThan("sm")]: {
            transform: "scale(1)",
            margin: "auto",
        },
    },
    controls: {
        padding: 0,
        position: "relative",
        justifyContent: "center",
        gap: 8,
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
