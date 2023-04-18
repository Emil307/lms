import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    name: {
        fontWeight: 600,
        fontSize: 14,
        lineHeight: "24px",
        color: theme.colors.dark[0],
    },
    price: {
        minWidth: 80,
        fontWeight: 600,
        fontSize: 14,
        lineHeight: "24px",
        color: theme.colors.dark[0],
        textAlign: "end",
    },
    iconLink: {
        height: 18,
        width: 18,
        minHeight: 18,
        minWidth: 18,
        borderRadius: 56,
        color: theme.colors.secondaryHover[0],

        svg: {
            color: theme.colors.secondaryHover[0],
            strokeWidth: 3,
        },
    },
}));
