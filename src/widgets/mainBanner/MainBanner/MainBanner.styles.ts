import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    root: {
        position: "relative",
    },
    inner: {
        position: "relative",
        overflow: "hidden",
        height: 576,
        borderRadius: 24,

        [theme.fn.smallerThan("sm")]: {
            height: 442,
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
        maxWidth: 743,
        marginLeft: 96,
        marginBlock: "auto",
        gap: 56,

        [theme.fn.smallerThan("sm")]: {
            marginLeft: 24,
            marginRight: 24,
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
}));
