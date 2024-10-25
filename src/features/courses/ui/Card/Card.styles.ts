import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    root: {
        height: 520,
        borderRadius: 32,
        backgroundColor: theme.colors.neutralGray100[0],
        border: `2px solid transparent`,
        padding: 24,
        cursor: "pointer",

        ":hover": {
            backgroundColor: theme.colors.neutralWhite[0],
            border: `2px solid ${theme.colors.neutralGray100[0]}`,
        },

        [theme.fn.smallerThan("sm")]: {
            minWidth: 343,
        },
    },

    imageWrapper: {
        position: "relative",
        overflow: "hidden",
        width: "100%",
        height: 240,
        borderRadius: 32,
        backgroundColor: theme.colors.neutralGray200[0],
    },

    discount: {
        backgroundColor: theme.colors.secondary[0],
        boxShadow: "0px 1px 2px rgba(0, 18, 110, 0.04), 0px 0px 16px rgba(0, 18, 110, 0.04)",
        padding: "6px 10px",
        color: theme.colors.dark[0],
        borderRadius: 8,
    },
    category: {
        backgroundColor: theme.colors.dark[0],
        color: theme.colors.neutralWhite[0],
        borderRadius: 8,
    },
    content: { flexGrow: 1 },
    linkCourse: {
        color: "inherit",
        textDecoration: "none",
    },
}));
