import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    root: {
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",

        "&[data-wide='true']": {
            ".mantine-AppShell-main": {
                paddingInline: 0,
            },
        },
    },
    header: {
        flex: "0 0 auto",
    },
    body: {
        height: "100%",
        flex: "1 0 auto",
    },
    main: {
        minHeight: "100%",
        padding: 0,
        paddingInline: 16,
    },
    footer: {
        flex: "0 0 auto",
    },
    wrapperContent: {
        maxWidth: 1320,
        marginInline: "auto",
        paddingTop: 32,
        paddingBottom: 96,

        "&[data-wide='true']": {
            maxWidth: 1920,
        },

        [theme.fn.smallerThan("md")]: {
            paddingTop: 24,
        },
    },
}));
