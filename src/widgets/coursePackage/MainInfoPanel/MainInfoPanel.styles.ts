import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    root: {
        width: "100%",
        padding: 32,
        borderRadius: 24,
        backgroundColor: theme.colors.white[0],
    },
    imageWrapper: {
        position: "relative",
        overflow: "hidden",
        width: 424,
        height: 260,
        borderRadius: 16,
    },
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
    description: {
        fontWeight: 400,
        fontSize: 16,
        lineHeight: "24px",
        color: theme.colors.gray45[0],
    },
    countCoursesInPackage: {
        fontWeight: 500,
        fontSize: 14,
        lineHeight: "16px",
        color: theme.colors.gray45[0],
    },
}));
