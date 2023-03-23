import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    root: {
        display: "flex",
        flexDirection: "column",
        gap: 32,
    },
    heading: {
        display: "flex",
        flexDirection: "column",
        gap: 8,
    },
    headingTitle: {
        fontWeight: 600,
        fontSize: 26,
        lineHeight: "32px",
        color: theme.colors.dark[0],
    },
    headingDescription: {
        fontWeight: 500,
        fontSize: 16,
        lineHeight: "24px",
        color: theme.colors.dark[0],
    },
    link: {
        fontWeight: 500,
        fontSize: 14,
        lineHeight: "16px",
        color: theme.colors.primary[0],
        textDecoration: "none",

        "&:hover": {
            textDecoration: "underline",
        },
    },
    checkboxLabel: {
        fontWeight: 500,
        fontSize: 14,
        lineHeight: "16px",
        color: theme.colors.dark[0],
    },
}));
