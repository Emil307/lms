import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    item: {
        width: 48,
        height: 48,
        border: "none",
        borderRadius: 8,
        color: theme.colors.dark[0],
        fontWeight: 600,
        fontSize: 16,
        lineHeight: "24px",

        ":first-of-type, :last-of-type": {
            ":disabled": {
                display: "none",
            },
        },

        "&[data-active]": {
            color: theme.colors.white[0],
            backgroundColor: theme.colors.dark[0],

            ":hover": {
                backgroundColor: theme.colors.dark[0],
            },
        },

        "&[data-dots]": {
            paddingTop: 10,
            color: theme.colors.dark[0],
            backgroundColor: theme.colors.white[0],
        },

        ":hover": {
            backgroundColor: theme.colors.grayLight[0],
        },
    },
    perPageInfo: {
        fontWeight: 500,
        color: theme.colors.gray45[0],
        fontSize: 14,
        lineHeight: "16px",

        span: {
            color: theme.colors.dark[0],
        },
    },
}));
