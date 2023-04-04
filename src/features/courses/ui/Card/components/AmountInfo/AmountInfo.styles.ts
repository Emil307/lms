import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    price: {
        fontWeight: 600,
        fontSize: 20,
        lineHeight: "24px",
        color: theme.colors.dark[0],
    },
    priceWithoutDiscount: {
        fontWeight: 400,
        fontSize: 20,
        lineHeight: "24px",
        color: theme.colors.gray45[0],
        textDecoration: "line-through",
    },
}));
