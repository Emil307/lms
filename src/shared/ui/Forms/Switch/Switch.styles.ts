import { createStyles } from "@mantine/core";

export default createStyles((theme, { variant }: { variant: "primary" | "secondary" }) => ({
    track: {
        minWidth: 48,
        backgroundColor: variant === "secondary" ? theme.colors.gray20[0] : theme.colors.dark[0],
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
                backgroundColor: variant === "secondary" ? theme.colors.done[0] : theme.colors.primary[0],

                ".mantine-Switch-thumb": {
                    backgroundColor: theme.colors.white[0],
                },
            },
        },

        ":disabled": {
            "+ .mantine-Switch-track": {
                backgroundColor: theme.colors.grayLight[0],

                ".mantine-Switch-thumb": {
                    backgroundColor: theme.colors.gray20[0],
                },
            },

            ":checked": {
                "+ .mantine-Switch-track": {
                    backgroundColor: theme.colors.gray45[0],

                    ".mantine-Switch-thumb": {
                        backgroundColor: theme.colors.grayLight[0],
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
        fontWeight: 500,
        lineHeight: "16px",
        color: theme.colors.dark[0],
    },
}));
