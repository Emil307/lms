import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    root: {
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },
    wrapperImage: {
        position: "relative",
        width: "100%",
        height: 256,

        [theme.fn.smallerThan("sm")]: {
            height: 192,
        },

        "&::after": {
            position: "absolute",
            width: "100%",
            height: "100%",
            left: 0,
            top: 0,
            content: '""',
            background: "linear-gradient(0deg, rgba(0, 4, 41, 0.2), rgba(0, 4, 41, 0.2))",
            borderRadius: 12,
        },
    },
    content: {
        maxWidth: 468,
        width: "100%",
        top: "calc(100% - 74px)",
        left: "50%",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "-72px",
        gap: 16,
        zIndex: 1,
    },
    avatarWrapper: {
        width: 144,
        height: 144,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: theme.colors.neutralWhite[0],
        borderRadius: 160,

        [theme.fn.smallerThan("sm")]: {
            width: 108,
            height: 108,
        },
    },
    textWrapper: {
        gap: 16,
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        wordBreak: "break-word",

        [theme.fn.smallerThan("sm")]: {
            gap: 20,
        },
    },
}));
