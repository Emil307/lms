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
        display: "flex",
        alignItems: "center",
        maxWidth: 456,
        width: "100%",
        marginInline: "auto",
    },
    imageWrapper: {
        "&::after": {
            position: "absolute",
            left: 0,
            top: 0,
            width: "100%",
            height: "100%",
            content: '""',
            background: "linear-gradient(0deg, rgba(0, 4, 41, 0.2), rgba(0, 4, 41, 0.2))",
        },
    },
    footerPanel: {
        display: "flex",
        marginInline: "auto",
        position: "relative",
        padding: "32px 0",
        justifyContent: "space-between",
        width: "100%",
        maxWidth: 1320,

        "@media (max-width: 630px)": {
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
        },
    },
    footerTitle: {
        fontSize: 14,
        lineHeight: "16px",
        fontWeight: 400,
        color: theme.colors.white[0],
    },
    linksGroup: {
        columnGap: 32,

        "@media (max-width: 630px)": {
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
        },
    },
    link: {
        fontSize: 14,
        lineHeight: "16px",
        fontWeight: 400,
        color: theme.colors.white[0],
    },
}));
