import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    price: {
        color: theme.colors.dark[0],
        fontSize: 24,
    },
    priceWithoutDiscount: {
        fontWeight: 400,
        fontSize: 16,
        lineHeight: "24px",
        color: theme.colors.gray45[0],
        textDecoration: "line-through",
    },
}));
