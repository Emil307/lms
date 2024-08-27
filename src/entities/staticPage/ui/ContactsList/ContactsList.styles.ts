import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    root: {
        width: "100%",
        gap: 8,
        justifyContent: "space-between",
        alignItems: "flex-start",
        flexGrow: 1,

        [theme.fn.smallerThan("sm")]: {
            flexDirection: "column",
            gap: 32,
        },
    },
    list: {
        flexGrow: 1,
        alignItems: "flex-start",
        gap: 8,

        [theme.fn.smallerThan("sm")]: {
            flexDirection: "column",
            gap: 32,
        },
    },
    listItem: {
        maxWidth: 267,
        width: "100%",
        flexShrink: 1,
        flexDirection: "column",
        gap: 8,
    },
    address: {
        wordBreak: "break-word",
    },
    socialLink: {
        alignItems: "center",
        justifyContent: "center",
        height: 48,
        width: 48,
        borderRadius: 56,
        backgroundColor: theme.colors.dark[0],

        ":hover": {
            color: theme.colors.dark[0],
            backgroundColor: theme.colors.done[0],
        },
    },
    link: {
        textDecoration: "none",
        color: theme.colors.dark[0],
    },
}));
