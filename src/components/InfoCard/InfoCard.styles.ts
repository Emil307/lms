import { createStyles } from "@mantine/core";

export default createStyles((theme, { variant }: { variant: "whiteBg" | "grayBg" }) => ({
    root: {
        display: "flex",
        flexDirection: "column",
        maxWidth: 334,
        width: "100%",
        gap: 24,
        padding: 32,
        paddingTop: 24,
        borderRadius: 16,
        backgroundColor: variant === "whiteBg" ? theme.colors.white[0] : theme.colors.light[0],
        boxShadow: variant === "whiteBg" ? `0px 16px 32px ${theme.fn.rgba(theme.colors.shadowGray[0], 0.08)}` : "none",

        [theme.fn.smallerThan("md")]: {
            padding: 24,
        },
    },
    imageWrapper: {
        position: "relative",
        marginBottom: 16,
        borderRadius: 16,
    },
    image: {
        borderRadius: "inherit",
    },

    iconWrapper: {
        alignItems: "center",
        justifyContent: "center",
        width: 270,
        height: 166,
        marginBottom: 16,
        borderRadius: 16,
        backgroundColor: theme.colors.neutralLight[0],
        color: theme.colors.primary[0],

        svg: {
            width: 86,
            height: 86,
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
    },
}));
