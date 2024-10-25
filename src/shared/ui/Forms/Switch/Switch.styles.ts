import { createStyles } from "@mantine/core";

export default createStyles((theme, { variant }: { variant: "primary" | "secondary" }) => ({
    track: {
        minWidth: 48,
        backgroundColor: variant === "secondary" ? theme.colors.neutralGray300[0] : theme.colors.dark[0],
        border: "none",
        cursor: "pointer",
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
                backgroundColor: variant === "secondary" ? theme.colors.secondary[0] : theme.colors.primary[0],

                ".mantine-Switch-thumb": {
                    backgroundColor: theme.colors.neutralWhite[0],
                },
            },
        },

        ":disabled": {
            "+ .mantine-Switch-track": {
                backgroundColor: theme.colors.neutralGray200[0],

                ".mantine-Switch-thumb": {
                    backgroundColor: theme.colors.neutralGray300[0],
                },
            },

            ":checked": {
                "+ .mantine-Switch-track": {
                    backgroundColor: theme.colors.neutralMain50[0],

                    ".mantine-Switch-thumb": {
                        backgroundColor: theme.colors.neutralGray200[0],
                    },
                },
            },
        },
    },
    body: {
        justifyContent: "space-between",
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
        cursor: "pointer",
    },
}));
