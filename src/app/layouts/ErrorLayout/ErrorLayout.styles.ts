import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    root: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "column",
        minHeight: "100vh",
        overflowX: "hidden",

        main: {
            maxWidth: 726,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 96,
            padding: "96px 24px",
            minHeight: "unset",

            [theme.fn.smallerThan("xs")]: {
                gap: 56,
                padding: "52px 16px",
            },
        },
    },
}));
