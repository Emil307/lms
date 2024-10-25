import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    root: {
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        maxWidth: "100vw",
        overflowX: "hidden",

        [theme.fn.smallerThan("sm")]: {
            maxWidth: "none",
        },
    },
    header: {
        flex: "0 0 auto",
    },
    body: {
        position: "relative",
        flex: "1 0 auto",
        display: "grid",
        gridTemplateColumns: "280px calc(100% - 280px)",
        height: "100%",
        width: "100%",
        maxWidth: "calc(100vw - 24px)",

        [theme.fn.smallerThan("lg")]: {
            gridTemplateColumns: "72px calc(100% - 72px)",
        },

        [theme.fn.smallerThan("sm")]: {
            display: "flex",
            width: "100%",
            maxWidth: "calc(100vw - 36px)",
            marginInline: "auto",
        },
    },
    main: {
        display: "contents",
        width: "100%",
        minHeight: "100%",

        [theme.fn.smallerThan("sm")]: {
            display: "block",
        },
    },
    footer: {
        flex: "0 0 auto",
    },
    wrapperContent: {
        padding: 32,
        borderRadius: 24,
        backgroundColor: theme.colors.neutralWhite[0],

        [theme.fn.smallerThan("sm")]: {
            padding: 24,
        },
    },
}));
