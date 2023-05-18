import { createStyles } from "@mantine/core";

export const useAdminLayoutStyles = createStyles(() => ({
    root: {
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        maxWidth: "calc(100vw - 24px)",
    },
    header: {
        flex: "0 0 auto",
    },
    body: {
        height: "100%",
        flex: "1 0 auto",
    },
    main: {
        maxWidth: "100%",
        minHeight: "100%",
    },
    footer: {
        flex: "0 0 auto",
    },
}));
