import { createStyles } from "@mantine/core";

export default createStyles((theme, { variant }: { variant: "whiteBg" | "grayBg" }) => ({
    root: {
        display: "flex",
        flexDirection: "column",
        width: 334,
        gap: 24,
        padding: "24px 32px",
        borderRadius: 16,
        backgroundColor: variant === "whiteBg" ? theme.colors.white[0] : theme.colors.light[0],
        boxShadow: variant === "whiteBg" ? `0px 16px 32px ${theme.fn.rgba(theme.colors.shadowGray[0], 0.08)}` : "none",

        [theme.fn.smallerThan("md")]: {
            width: "100%",
            maxWidth: 295,
            padding: 24,
        },
    },
    imageWrapper: {
        position: "relative",
        width: "100%",
        paddingTop: "62%",
        marginBottom: 16,
        borderRadius: 16,
    },
    imageBack: {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: theme.colors.grayLight[0],
        borderRadius: 16,

        svg: {
            position: "absolute",
            top: "50%",
            left: "50%",
            width: 86,
            height: 86,
            transform: "translateX(-50%) translateY(-50%)",
            color: theme.colors.gray20[0],
        },
    },
    image: {
        borderRadius: "inherit",
        zIndex: 1,
        objectFit: "cover"
    },
    iconWrapper: {
        position: "relative",
        width: "100%",
        paddingTop: "62%",
        marginBottom: 16,
        borderRadius: 16,
        backgroundColor: theme.colors.neutralLight[0],
        color: theme.colors.primary[0],

        svg: {
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 86,
            height: 86,
        },
    },
    avatarWrapper: {
        width: 84,
        minWidth: 84,
        height: 84,
        borderRadius: 50,

        ".mantine-Avatar-placeholder": {
            backgroundColor: theme.colors.grayLight[0],
        },
    },

    content: {
        flexDirection: "column",
        alignItems: "flex-start",
        gap: 8,
    },
    actions: {
        gap: 8,
        button: {
            width: "100%",
        },
        marginBottom: 8,
    },
}));
