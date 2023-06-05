import { createStyles } from "@mantine/core";
import { ManropeFont } from "@app/providers/Theme/fonts";

export default createStyles((theme, _params, getRef) => ({
    root: {
        flexDirection: "column",
        alignItems: "center",
        gap: 8,
    },
    wrapperVideo: {
        display: "flex",
        position: "relative",
        width: "100%",
        height: "100%",
        backgroundColor: theme.colors.white[0],
        gap: 50,
        borderRadius: 8,
        padding: 0,

        "> img": {
            borderRadius: 8,
        },

        "&:after": {
            content: '" "',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "linear-gradient(0deg, rgba(0, 4, 41, 0.15), rgba(0, 4, 41, 0.15))",
            opacity: 1,
            borderRadius: 8,
        },

        [`.${getRef("imageBack")}`]: {
            opacity: 1,
            filter: "unset",
        },
    },
    video: {
        height: 120,
        borderRadius: 8,
    },

    imageBack: {
        ref: getRef("imageBack"),
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        width: "100%",
        height: "100%",
        zIndex: 1,
        opacity: 0,
        transition: "opacity 0.2s ease-in-out",
        borderRadius: 16,
    },

    extension: {
        fontFamily: ManropeFont.style.fontFamily,
        fontWeight: 700,
        fontSize: 8,
        lineHeight: "8px",
        color: theme.colors.gray45[0],
    },
    content: {
        display: "flex",
        flexDirection: "column",
        width: "100%",
    },
    fileInfo: {
        width: "100%",
        gap: 2,
    },
    fileName: {
        flex: 1,
        fontWeight: 600,
        fontSize: 14,
        lineHeight: "18px",
        color: theme.colors.dark[0],
    },
    fileSize: {
        fontWeight: 500,
        fontSize: 14,
        lineHeight: "16px",
        color: theme.colors.gray45[0],
    },
    buttonDownload: {
        width: "fit-content",
        fontWeight: 600,
        fontSize: 14,
        lineHeight: "24px",
    },
}));
