import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    inner: {
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
        paddingTop: 4,
        paddingLeft: 8,
        fontWeight: 500,
        color: theme.colors.dark[0],
        lineHeight: "16px",
    },
    error: {
        gap: 4,
        marginTop: 4,

        svg: {
            width: 16,
            height: 16,
            color: theme.colors.warning[0],
        },

        "> div": {
            width: "calc(100% - 20px)",
            paddingTop: 2,
            color: theme.colors.dark[0],
            fontWeight: 400,
            fontSize: 10,
            lineHeight: "12px",
        },
    },
}));
