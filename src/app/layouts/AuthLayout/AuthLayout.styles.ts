import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
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
        color: theme.colors.white,
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
        color: theme.colors.white,
    },
}));
