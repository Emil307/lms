import { createStyles } from "@mantine/core";

export default createStyles((_theme) => ({
    root: {
        display: "flex",
        flexDirection: "column",
        height: "100%",
        padding: "24px !important",
        gap: 32,
        borderRadius: 16,
    },
    section: {
        display: "flex",
        flexDirection: "column",
        margin: "0px !important",
        gap: 16,
    },
}));
