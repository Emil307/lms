import { createStyles } from "@mantine/core";

export default createStyles(() => ({
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
    },
    footer: {
        flex: "0 0 auto",
    },
}));
