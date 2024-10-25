import { createStyles } from "@mantine/core";

interface CreateStylesParamsProps {
    hasDiscount: boolean;
}

export default createStyles((theme, { hasDiscount }: CreateStylesParamsProps) => ({
    root: {
        justifyContent: "space-between",
        margin: "0px !important",
        gap: 24,

        [theme.fn.smallerThan("xs")]: {
            flexDirection: "column",
        },
    },
    price: {
        color: hasDiscount ? theme.colors.secondaryHover[0] : theme.colors.dark[0],
        background: hasDiscount ? theme.colors.done20[0] : "transparent",

        ...(hasDiscount && {
            border: "4px solid transparent",
            borderRadius: 8,
        }),
    },
    priceWithoutDiscount: {
        fontWeight: 400,
        fontSize: 16,
        lineHeight: "24px",
        color: theme.colors.neutralMain50[0],
        textDecoration: "line-through",
    },
}));
