import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    root: {
        padding: 32,
        borderRadius: 32,
        backgroundColor: theme.colors.neutralLight[0],
    },
    content: {
        table: {
            width: "100%",

            tr: {
                td: {
                    paddingBottom: 4,
                },

                "&:last-of-type td": {
                    border: "none",
                    paddingBottom: 0,
                },
            },

            "td, th": {
                padding: 0,
                border: "none",
                minWidth: "unset !important",
            },

            th: {
                paddingBottom: 8,
                backgroundColor: "transparent",

                "> p": {
                    color: theme.colors.gray45[0],
                    fontWeight: 500,
                },
            },
        },
    },
}));
