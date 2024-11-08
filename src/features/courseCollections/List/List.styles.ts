import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    wrapper: {
        gap: 48,
        paddingRight: 0,
        paddingLeft: 0,
        [theme.fn.smallerThan("sm")]: {
            gap: 0,
            paddingRight: 16,
            paddingLeft: 16,
        },
    },
    headingContainer: {
        marginBottom: 24,
        [theme.fn.smallerThan("md")]: {
            marginBottom: 0,
        },
    },
    title: {
        fontSize: 42,
        lineHeight: "46px",
        color: theme.colors.dark[0],
        textAlign: "center",
        [theme.fn.smallerThan("md")]: {
            fontSize: 24,
            lineHeight: "32px",
        },
    },
    description: {
        fontSize: 20,
        lineHeight: "24px",
        color: theme.colors.dark[0],
        textAlign: "center",
        opacity: 0.5,
        [theme.fn.smallerThan("md")]: {
            fontSize: 18,
            lineHeight: "24px",
        },
    },
    viewport: {
        marginBottom: 48,
        overflow: "visible",
    },
    container: {
        height: 475,
        alignItems: "center",
    },

    activeSlide: {
        transform: "scale(1.1)",
        transition: "all 0.3s",
        margin: "0px 24px",
        opacity: 1,
        [theme.fn.smallerThan("sm")]: {
            transform: "scale(1.035)",
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
        backgroundColor: theme.colors.neutralGray300[0],

        "&[data-active]": {
            width: 23,
            backgroundColor: theme.colors.dark[0],
        },
    },
}));
