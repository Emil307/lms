import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    inner: {
        alignSelf: "self-start",
        width: 24,
        height: 24,
    },
    body: {
        alignItems: "center",
    },
    input: {
        width: 24,
        height: 24,
        borderRadius: 8,
        borderColor: theme.colors.grayLight[0],
        backgroundColor: theme.colors.grayLight[0],
        cursor: "pointer",

        "& + svg": {
            position: "absolute",
            width: 10,
            margin: "auto",
            zIndex: 1,
            color: "transparent",
            pointerEvents: "none",
            inset: 0,
            transform: "scale(1.3)",
        },

        ":checked": {
            "& + svg": {
                color: theme.colors.white[0],
            },
        },

        ":hover": {
            borderColor: theme.colors.primary[0],
            backgroundColor: theme.colors.white[0],

            ":checked": {
                backgroundColor: theme.colors.white[0],

                "& + svg": {
                    color: theme.colors.primary[0],
                },
            },
        },

        ":disabled": {
            border: "none",
            backgroundColor: theme.colors.gray20[0],
        },

        ":disabled:checked": {
            border: "none",
            backgroundColor: theme.colors.gray20[0],
            "& + svg": {
                color: theme.colors.dark[0],
            },
        },
    },
    label: {
        paddingLeft: 8,
        fontWeight: 500,
        fontSize: "14px",
        color: theme.colors.dark[0],
        lineHeight: "16px",
        cursor: "pointer",
    },
    error: {
        gap: 4,
        marginTop: 4,

        svg: {
            width: 16,
            height: 16,
            color: theme.colors.warning[0],
        },

        "> p": {
            width: "calc(100% - 20px)",
            paddingTop: 2,
        },
    },
}));
