import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    root: {
        width: "min-content",
        paddingLeft: 0,
        paddingRight: 0,
        height: "auto",
        color: theme.colors.dark,
        backgroundColor: "transparent",

        ":hover": {
            backgroundColor: "transparent",
            color: theme.colors.primaryHover,
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
