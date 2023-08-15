import { createStyles } from "@mantine/core";

export default createStyles((_theme) => ({
    root: {
        display: "flex",
        flexDirection: "column",
        gap: 32,
        height: "100%",
        padding: "24px !important",
        borderRadius: 16,
    },
    section: {
        display: "flex",
        flex: 1,
        flexDirection: "column",
        margin: "0px !important",
        gap: 16,
    },
}));
