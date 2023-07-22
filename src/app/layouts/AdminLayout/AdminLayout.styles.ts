import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    root: {
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        maxWidth: "100vw",

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
        maxWidth: "calc(100vw - 24px)",

        [theme.fn.smallerThan("lg")]: {
            gridTemplateColumns: "72px calc(100% - 72px)",
        },

        [theme.fn.smallerThan("sm")]: {
            display: "block",
            maxWidth: "calc(100vw - 48px)",
            marginInline: "auto",
        },
    },
    main: {
        width: "unset",
        minHeight: "100%",
    },
    footer: {
        flex: "0 0 auto",
    },
    wrapperContent: {
        padding: 32,
        backgroundColor: theme.colors.white[0],
        borderRadius: theme.fn.radius("1.5rem"),
    },
}));
