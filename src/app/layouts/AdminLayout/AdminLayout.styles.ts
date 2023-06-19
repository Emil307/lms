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
        display: "grid",
        gridTemplateColumns: "280px calc(100% - 280px)",
        height: "100%",
    },
    main: {
        width: "unset"
    },
    footer: {
        flex: "0 0 auto",
    },
}));
