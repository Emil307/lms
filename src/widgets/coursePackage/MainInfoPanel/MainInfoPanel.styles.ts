import { createStyles } from "@mantine/core";

interface CreateStylesParamsProps {
    hasDiscount: boolean;
}

export default createStyles((theme, { hasDiscount }: CreateStylesParamsProps) => ({
    root: {
        flexDirection: "column",
        width: "100%",
        padding: 32,
        gap: 32,
        borderRadius: 24,
        backgroundColor: theme.colors.white[0],

        [theme.fn.smallerThan("md")]: {
            padding: 24,
        },
    },
    packageInfoWrapper: {
        gap: 48,
        [theme.fn.smallerThan("md")]: {
            flexWrap: "wrap-reverse",
        },

        [theme.fn.smallerThan("xs")]: {
            justifyContent: "center",
        },
    },
    packageInfo: {
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "space-between",
        gap: 48,
        flex: 1,

        [theme.fn.smallerThan("md")]: {
            minWidth: 400,
        },

        [theme.fn.smallerThan("sm")]: {
            minWidth: "auto",
        },
    },

    imageWrapper: {
        position: "relative",
        overflow: "hidden",
        width: 424,
        height: 260,
        borderRadius: 16,
        backgroundColor: theme.colors.light[0],

        [theme.fn.smallerThan("md")]: {
            padding: 24,
        },

        [theme.fn.smallerThan("xs")]: {
            width: 295,
            height: 182,
        },
    },

    containerPriceWithButton: {
        marginBottom: 16,
        gap: 24,

        [theme.fn.smallerThan("md")]: {
            marginBottom: 0,
        },

        [theme.fn.smallerThan("xs")]: {
            flexDirection: "column-reverse",
        },
    },

    price: {
        color: hasDiscount ? theme.colors.doneDark[0] : theme.colors.dark[0],
        background: hasDiscount ? theme.colors.done16[0] : "transparent",
        whiteSpace: "nowrap",

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
        whiteSpace: "nowrap",
    },
}));
