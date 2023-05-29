import { createStyles } from "@mantine/core";

interface CreateStylesParamsProps {
    hasDiscount: boolean;
}

export default createStyles((theme, { hasDiscount }: CreateStylesParamsProps) => ({
    root: {
        display: "flex",
        margin: "0px !important",
        gap: 24,
    },
    price: {
        fontWeight: 600,
        fontSize: 20,
        lineHeight: "24px",
        color: hasDiscount ? theme.colors.doneDark[0] : theme.colors.dark[0],
        background: hasDiscount ? theme.colors.done16[0] : "transparent",

        ...(hasDiscount && {
            border: "4px solid transparent",
            borderRadius: 8,
        }),
    },
    priceWithoutDiscount: {
        fontWeight: 400,
        fontSize: 16,
        lineHeight: "24px",
        color: theme.colors.gray45[0],
        textDecoration: "line-through",
    },
    amountDescription: {
        fontWeight: 500,
        fontSize: 14,
        lineHeight: "16px",
        color: theme.colors.dark[0],
    },
}));
