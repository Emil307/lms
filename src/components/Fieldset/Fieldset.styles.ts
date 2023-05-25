import { createStyles } from "@mantine/core";

export default createStyles((theme, { isOpen }: { isOpen: boolean }) => ({
    fieldset: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        width: "100%",
        margin: 0,
        padding: 0,
        gap: 8,
        border: "none",
    },
    legend: {
        display: "flex",
        gap: 16,
        marginBottom: isOpen ? 16 : 0,

        svg: {
            color: theme.colors.gray45[0],
        },
    },
    title: {
        fontWeight: 600,
        fontSize: 18,
        lineHeight: "24px",
        color: theme.colors.dark[0],
    },
}));
