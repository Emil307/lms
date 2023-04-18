import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    root: {
        display: "flex",
        margin: "0px !important",
        columnGap: 32,
    },
    discount: {
        height: "auto",
        padding: "6px 10px",
        border: "none",
        borderRadius: 60,
        backgroundColor: theme.colors.dark[0],
        boxShadow: "0px 1px 2px rgba(0, 18, 110, 0.04), 0px 0px 16px rgba(0, 18, 110, 0.04)",
        fontWeight: 500,
        fontSize: 12,
        lineHeight: "16px",
        color: theme.colors.white[0],
        textTransform: "inherit",
    },
    discountEndDate: {
        height: "auto",
        padding: "6px 10px",
        border: "none",
        borderRadius: 60,
        backgroundColor: theme.colors.light[0],
        fontWeight: 500,
        fontSize: 12,
        lineHeight: "16px",
        color: theme.colors.dark[0],
        textTransform: "inherit",
    },
    description: {
        fontWeight: 500,
        fontSize: 14,
        lineHeight: "16px",
        color: theme.colors.gray45[0],
    },
}));
