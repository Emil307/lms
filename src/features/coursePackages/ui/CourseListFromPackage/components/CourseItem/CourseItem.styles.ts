import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    name: {
        fontWeight: 600,
        fontSize: 14,
        lineHeight: "24px",
        color: theme.colors.dark[0],
    },
    price: {
        minWidth: 70,
        textAlign: "end",
    },
    iconLink: {
        height: 18,
        width: 18,
        minHeight: 18,
        minWidth: 18,
        borderRadius: 56,
        backgroundColor: theme.colors.secondary16[0],
        color: theme.colors.dark[0],
        ":hover": {
            backgroundColor: theme.colors.secondary8[0],
        },

        svg: {
            width: 9,
            color: theme.colors.secondaryHover[0],
            strokeWidth: 5,
        },
    },
}));
