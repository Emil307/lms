import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    root: {
        position: "inherit",
        border: "none",
        backgroundColor: theme.colors.darkHover[0],
    },
    inner: {
        flexDirection: "column",
        paddingInline: 16,
        paddingTop: 56,
        paddingBottom: 32,
        marginInline: "auto",
        maxWidth: 1720,
        width: "100%",

        [theme.fn.smallerThan("lg")]: {
            maxWidth: 1352,
        },
    },
    topContent: {
        alignItems: "flex-start",
        gap: 24,
        flexGrow: 1,

        [theme.fn.smallerThan("md")]: {
            flexDirection: "column",
            gap: 32,
        },
    },
    topContentItem: {
        maxWidth: 370,
        width: "100%",
    },
    mainInfo: {
        flexDirection: "column",
        gap: 32,

        svg: {
            color: theme.colors.neutralWhite[0],
        },
    },
    mainItem: {
        flexDirection: "column",
        gap: 8,
    },
    item: {
        flexDirection: "column",

        [theme.fn.smallerThan("md")]: {
            gap: 8,
        },
    },
    education: {
        flexDirection: "column",
        gap: 16,

        [theme.fn.smallerThan("lg")]: {
            minWidth: "auto",
            maxWidth: 392,
        },
    },
    info: {
        flexDirection: "column",
        gap: 16,

        [theme.fn.smallerThan("lg")]: {
            minWidth: "auto",
            maxWidth: 392,
        },
    },
    titleSection: {
        fontWeight: 500,
        fontSize: 18,
        lineHeight: "26px",
        color: theme.colors.dark,
    },
    wordBreak: {
        wordBreak: "break-word",
    },
    link: {
        textDecoration: "none",
        color: theme.colors.neutralWhite[0],
    },
    socialLink: {
        alignItems: "center",
        justifyContent: "center",
        height: 40,
        width: 40,
        borderRadius: 56,
        color: theme.colors.dark[0],
        backgroundColor: theme.colors.neutralWhite[0],

        svg: {
            width: 18,
            height: 18,
        },

        ":hover": {
            backgroundColor: theme.colors.neutralGray100[0],
        },
    },
    divider: {
        marginTop: "48px !important",
        marginBottom: "32px !important",
    },
    middleContent: {
        justifyContent: "space-between",
        width: "100%",
        gap: 16,

        "> div": {
            width: "51%",
        },

        [theme.fn.smallerThan("md")]: {
            flexDirection: "column",
            gap: 32,

            "> div": {
                width: "100%",
            },
        },
    },
    middleItem: {
        width: "100%",
        flexDirection: "column",
        gap: 8,
    },
    middleLink: {
        textDecoration: "underline",
    },
    bottomContent: {
        alignItems: "center",
        justifyContent: "space-between",
        gap: 24,
        marginTop: 64,

        svg: {
            color: theme.colors.neutralWhite[0],
        },

        [theme.fn.smallerThan("md")]: {
            alignItems: "flex-start",
            flexDirection: "column",
        },
    },
    skeleton: {
        "&:after": {
            background: theme.colors.neutralMain50[0],
        },
    },
    addamantLink: {
        textDecoration: "none",
    },
}));
