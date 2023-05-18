import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    imageWrapper: {
        position: "absolute",
        width: "100vw",
        height: "100vh",

        "&::after": {
            display: "block",
            position: "relative",
            width: "100vw",
            height: "100vh",
            content: '""',
            background: "linear-gradient(0deg, rgba(0, 4, 41, 0.2), rgba(0, 4, 41, 0.2))",
        },
    },
    footerRoot: {
        display: "flex",
        alignItems: "center",
        minHeight: 80,
        borderTop: "none",
    },
    footerInner: {
        display: "flex",
        marginInline: "auto",

        justifyContent: "space-between",
        width: "100%",
        maxWidth: 1320,
        paddingInline: 60,

        "@media (max-width: 630px)": {
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            paddingInline: 0,
            paddingBottom: 44,
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
