import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    root: {
        position: "relative",
        justifyContent: "center",
        [theme.fn.smallerThan("sm")]: {
            padding: "0 16px",
        },
    },
    inner: {
        position: "relative",
        overflow: "hidden",
        height: 634,
        borderRadius: 56,
        maxWidth: 1728,
        width: "100%",

        justifyContent: "center",

        [theme.fn.smallerThan("sm")]: {
            height: 508,
        },
    },

    imageWrapper: {
        position: "absolute",
        width: "100%",
        height: "100%",

        "&::after": {
            position: "absolute",
            left: 0,
            top: 0,
            width: "100%",
            height: "100%",
            content: '""',
            background:
                "linear-gradient(0deg, rgba(2, 6, 46, 0.2), rgba(2, 6, 46, 0.2)), linear-gradient(90.07deg, rgba(0, 0, 0, 0.1) 0.06%, rgba(0, 0, 0, 0) 42.63%)",
        },
    },

    wrapperContent: {
        position: "relative",
        height: "100%",
        width: "100%",
    },

    headerContent: {
        flexDirection: "column",
        justifyContent: "space-between",
        maxWidth: 743,
        padding: "4rem",
        [theme.fn.smallerThan("sm")]: {
            padding: 24,
        },
    },

    titleContent: {
        flexDirection: "column",
        gap: 32,
        [theme.fn.smallerThan("sm")]: {
            gap: 24,
        },
    },

    title: {
        fontWeight: 700,
        fontSize: 56,
        lineHeight: "62px",
        color: theme.colors.white[0],

        [theme.fn.smallerThan("md")]: {
            fontSize: 32,
            lineHeight: "36px",
        },
    },
    subtitle: {
        opacity: "50%",
    },
    button: {
        height: 72,

        [theme.fn.smallerThan("md")]: {
            height: 56,
        },
    },
}));
