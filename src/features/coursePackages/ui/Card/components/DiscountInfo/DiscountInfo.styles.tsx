import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    root: {
        display: "flex",
        margin: "0px !important",
        marginBottom: "16px !important",
        gap: 8,
    },

    discount: {
        boxShadow: "0px 1px 2px rgba(0, 18, 110, 0.04), 0px 0px 16px rgba(0, 18, 110, 0.04)",
    },
    discountEndDate: {
        backgroundColor: theme.colors.light[0],
        color: theme.colors.dark[0],
    },
}));
