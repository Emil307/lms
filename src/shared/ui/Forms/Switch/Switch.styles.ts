import { createStyles } from "@mantine/core";
import { ManropeFont } from "@app/providers/Theme/fonts";

export default createStyles((theme, { variant }: { variant: "primary" | "secondary" }) => ({
    track: {
        minWidth: 48,
        backgroundColor: variant === "secondary" ? theme.colors.gray20 : theme.colors.dark,
        border: "none",
    },
    thumb: {
        height: 16,
        width: 16,
        left: 4,
        border: "none",
    },
    input: {
        ":not(:checked):hover": {
            "+ .mantine-Switch-track .mantine-Switch-thumb": {
                left: 8,
            },
        },

        ":checked": {
            "+ .mantine-Switch-track": {
                backgroundColor: variant === "secondary" ? theme.colors.done : theme.colors.primary,

                ".mantine-Switch-thumb": {
                    backgroundColor: theme.colors.white,
                },
            },
        },

        ":disabled": {
            "+ .mantine-Switch-track": {
                backgroundColor: theme.colors.grayLight,

                ".mantine-Switch-thumb": {
                    backgroundColor: theme.colors.gray20,
                },
            },

            ":checked": {
                "+ .mantine-Switch-track": {
                    backgroundColor: theme.colors.gray45,

                    ".mantine-Switch-thumb": {
                        backgroundColor: theme.colors.grayLight,
                    },
                },
            },
        },
    },
    trackLabel: {
        minWidth: "auto",
    },
    labelWrapper: {
        alignSelf: "center",
    },
    label: {
        paddingRight: 8,
        fontFamily: ManropeFont.style.fontFamily,
        fontWeight: 500,
        lineHeight: "16px",
        color: theme.colors.dark,
    },
}));
