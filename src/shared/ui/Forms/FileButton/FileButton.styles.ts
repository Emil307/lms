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
        svg: {
            stroke: theme.colors.dark[0],
        },
    },
    label: {
        fontWeight: 600,
        fontSize: 16,
        lineHeight: "24px",
    },
    error: {
        gap: 4,
        marginTop: 4,

        svg: {
            width: 16,
            height: 16,
            color: theme.colors.warning[0],
        },

        "> p": {
            width: "calc(100% - 20px)",
            paddingTop: 2,
        },
    },
}));
