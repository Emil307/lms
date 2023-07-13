import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    root: {
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
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
    },
    footer: {
        flex: "0 0 auto",
    },
    wrapperContent: {
        maxWidth: 1352,
        marginInline: "auto",
        paddingInline: 16,
        paddingTop: 32,
        paddingBottom: 96,

        [theme.fn.smallerThan("md")]: {
            paddingTop: 24,
        },
    },
}));
