import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    fullPrice: {
        fontWeight: 600,
        fontSize: 24,
        lineHeight: "32px",
        textDecoration: "line-through",
        [theme.fn.smallerThan("md")]: {
            fontWeight: 600,
            fontSize: 24,
            lineHeight: "32px",
        },
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
        [theme.fn.smallerThan("md")]: {
            fontSize: 56,
            lineHeight: "62px",
        },
    },
}));
