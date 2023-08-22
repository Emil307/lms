import { createStyles } from "@mantine/core";

export default createStyles((theme, _params, getRef) => ({
    wrapperIcon: {
        position: "relative",
        alignItems: "center",
        justifyContent: "center",
        width: 120,
        height: 120,
        borderRadius: 16,
        color: theme.colors.secondary[0],
        backgroundColor: theme.colors.light[0],
        cursor: "pointer",

        svg: {
            width: 64,
            height: 64,
        },

        "&:hover": {
            "&:after": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: theme.colors.gray45[0],
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
    },
    control: {
        ref: getRef("control"),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: 64,
        height: 64,
        color: theme.colors.white[0],
    },

    wrapperIconError: {
        gap: 4,
        marginTop: 4,

        svg: {
            width: 16,
            height: 16,
            color: theme.colors.warning[0],
        },

        p: {
            width: "calc(100% - 20px)",
            paddingTop: 2,
        },
    },

    descriptionTextarea: {
        width: "100%",
        maxWidth: 772,
        textarea: {
            minHeight: 190,
        },
    },

    actions: {
        gap: 8,

        button: {
            width: "100%",
            maxWidth: 252,
        },

        [theme.fn.smallerThan("xs")]: {
            flexDirection: "column",

            button: {
                maxWidth: "none",
            },
        },
    },
}));
