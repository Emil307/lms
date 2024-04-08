import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    root: {
        width: "100%",
        gap: 8,
        borderRadius: 16,
        border: `1px solid ${theme.colors.gray20[0]}`,
        backgroundColor: "transparent",
        cursor: "pointer",

        ":hover": {
            ".mantine-Radio-label": {
                color: theme.colors.dark[0],
            },
        },

        ":has(.mantine-Radio-radio:checked)": {
            border: `1px solid ${theme.colors.primary[0]}`,
            backgroundColor: theme.colors.secondary8[0],

            ".mantine-Radio-label": {
                color: theme.colors.dark[0],
            },
        },

        ".mantine-Radio-body": {
            padding: 16,
            gap: 8,
        },

        ".mantine-Radio-labelWrapper": {
            flex: 1,
        },

        ".mantine-Radio-label": {
            padding: 0,
            color: theme.colors.gray45[0],
            fontSize: theme.fontSizes.lg,
            fontWeight: 600,
            lineHeight: "24px",
        },

        ".mantine-Radio-description": {
            padding: 0,
            marginTop: 4,
            fontWeight: 500,
            fontSize: 14,
            lineHeight: "16px",
        },
    },
}));
