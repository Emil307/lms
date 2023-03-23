import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    root: {
        width: "min-content",
        paddingLeft: 0,
        paddingRight: 0,
        height: "auto",
        color: theme.colors.dark[0],
        backgroundColor: "transparent",

        ":hover": {
            backgroundColor: "transparent",
            color: theme.colors.primaryHover[0],
        },
    },
    leftIcon: {
        marginRight: 8,
    },
    label: {
        fontWeight: 600,
        fontSize: 16,
        lineHeight: "24px",
    },
}));
