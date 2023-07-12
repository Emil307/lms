import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    root: {
        position: "absolute",
        width: "100vw",
        minHeight: "100vh",

        main: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
        },
    },
    content: {
        alignItems: "center",
        maxWidth: 456,
        width: "100%",
        marginInline: "auto",
    },
    imageWrapper: {
        "&::after": {
            position: "absolute",
            width: "100%",
            height: "100%",
            left: 0,
            top: 0,
            content: '""',
            background: "linear-gradient(0deg, rgba(0, 4, 41, 0.2), rgba(0, 4, 41, 0.2))",
        },
    },
    footerPanel: {
        position: "relative",
        justifyContent: "space-between",
        flexWrap: "wrap",
        width: "100%",
        maxWidth: 1320,
        marginInline: "auto",
        padding: "32px 0",
        gap: 16,

        [theme.fn.smallerThan("sm")]: {
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
        },
    },
    linksGroup: {
        columnGap: 32,
        rowGap: 16,

        [theme.fn.smallerThan("sm")]: {
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 16,
        },
    },
    link: {
        fontWeight: 400,
        fontSize: 14,
        lineHeight: "16px",
        color: theme.colors.white[0],
    },
}));
