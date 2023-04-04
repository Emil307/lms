import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    root: {
        height: "100%",
        borderRadius: 16,
    },
    section: {
        display: "flex",
        flexDirection: "column",
        margin: "0px !important",
        marginBottom: "32px !important",
        gap: 16,
    },
    description: {
        fontWeight: 500,
        fontSize: 14,
        lineHeight: "16px",
        color: theme.colors.gray45[0],
    },
}));
