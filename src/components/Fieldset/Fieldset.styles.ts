import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    fieldset: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        width: "100%",
        margin: 0,
        padding: 0,
        gap: 7.5,
        border: "none",
    },
    legend: {
        display: "flex",
        gap: 16,
        marginBottom: 16,

        svg: {
            color: theme.colors.gray45,
        },
    },
    title: {
        fontWeight: 600,
        fontSize: 18,
        lineHeight: "24px",
        color: theme.colors.dark,
    },
}));
