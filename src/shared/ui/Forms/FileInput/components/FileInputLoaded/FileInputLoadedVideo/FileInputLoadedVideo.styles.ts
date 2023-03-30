import { createStyles } from "@mantine/core";

export default createStyles((theme, _params, getRef) => ({
    root: {
        display: "flex",
        position: "relative",
        width: "100%",
        height: "100%",
        backgroundColor: theme.colors.white,
        gap: 50,
        borderRadius: 16,
        padding: 0,

        "> img": {
            borderRadius: 16,
        },

        "&:hover": {
            "&:after": {
                content: '" "',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: theme.colors.gray45,
                opacity: 1,
                borderRadius: 16,
            },

            [`.${getRef("control")}`]: {
                display: "flex",
                zIndex: 2,
                filter: "unset",
            },

            [`.${getRef("imageBack")}`]: {
                opacity: 1,
                filter: "unset",
            },

            [`.${getRef("buttons")}`]: {
                display: "flex",
                flexDirection: "column",
                gap: 14,
            },
        },
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
    control: {
        ref: getRef("control"),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 16,

        svg: {
            width: 64,
            height: 64,
            color: theme.colors.white,
        },
    },
    buttons: {
        ref: getRef("buttons"),
        display: "flex",
        flexDirection: "column",
        gap: 14,
    },
    loader: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: "100%",
        height: "100%",
        background: theme.colors.gray45,
        opacity: 1,
        borderRadius: 16,
        border: "none",
    },
    video: {
        width: "100%",
        borderRadius: 16,
    },
}));
