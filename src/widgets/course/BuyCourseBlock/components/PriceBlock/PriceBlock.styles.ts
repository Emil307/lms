import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    fullPrice: {
        textDecoration: "line-through",
    },
    button: {
        padding: "8px 12px",
        border: `1px solid ${theme.colors.neutralDark[0]}`,
        borderRadius: 60,
    },
    price: {
        fontSize: 56,
        lineHeight: "62px",
        color: theme.colors.dark[0],
    },
}));
