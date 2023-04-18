import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    root: {
        width: "100%",
        padding: "16px 24px",
        gap: 16,
        borderRadius: 12,
        backgroundColor: theme.colors.light[0],
    },
    helperText: {
        fontWeight: 500,
        fontSize: 16,
        lineHeight: "24px",
        color: theme.colors.dark[0],
    },

    reactionButton: {
        height: 40,
        width: 77,
        borderRadius: 160,
        backgroundColor: theme.colors.white[0],

        ":hover": {
            backgroundColor: theme.colors.white[0],
            svg: {
                color: theme.colors.secondary[0],
            },
        },
    },
}));
