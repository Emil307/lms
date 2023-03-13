import { createStyles } from "@mantine/core";
import { ManropeFont } from "@app/providers/Theme/fonts";

export default createStyles((theme) => ({
    inner: {
        width: 24,
        height: 24,
    },
    input: {
        width: 24,
        height: 24,
        borderRadius: 8,
        borderColor: theme.colors.grayLight,
        backgroundColor: theme.colors.grayLight,

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
                color: theme.colors.white,
            },
        },

        ":hover": {
            borderColor: theme.colors.primary,
            backgroundColor: theme.colors.white,

            ":checked": {
                backgroundColor: theme.colors.white,

                "& + svg": {
                    color: theme.colors.primary,
                },
            },
        },

        ":disabled": {
            border: "none",
            backgroundColor: theme.colors.gray20,
        },

        ":disabled:checked": {
            border: "none",
            backgroundColor: theme.colors.gray20,
            "& + svg": {
                color: theme.colors.dark,
            },
        },
    },
    label: {
        paddingLeft: 8,
        fontFamily: ManropeFont.style.fontFamily,
        fontWeight: 500,
        color: theme.colors.dark,
        lineHeight: "16px",
    },
}));
