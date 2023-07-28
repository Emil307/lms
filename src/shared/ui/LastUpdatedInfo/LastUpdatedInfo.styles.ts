import { createStyles } from "@mantine/core";

interface CreateStylesParams {
    scrollable?: boolean;
}

export default createStyles((theme, { scrollable }: CreateStylesParams) => ({
    root: {
        alignItems: "center",
        gap: 8,

        ...(scrollable && {
            width: "100%",
            overflowX: "auto",

            "::-webkit-scrollbar": {
                display: "none",
            },
        }),
    },

    date: {
        whiteSpace: "nowrap",
    },

    userInfo: {
        color: theme.colors.primary[0],
        whiteSpace: "nowrap",
    },
}));
