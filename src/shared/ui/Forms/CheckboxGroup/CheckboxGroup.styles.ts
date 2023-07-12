import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    root: {
        "> div": {
            paddingTop: 0,
        },
    },
    error: {
        display: "flex",
        gap: 4,
        marginTop: 4,

        svg: {
            width: 16,
            height: 16,
            color: theme.colors.warning[0],
        },

        "> p": {
            width: "calc(100% - 20px)",
            paddingTop: 2,
        },
    },
    description: {
        display: "flex",
        flexDirection: "column",

        "> div": {
            display: "flex",
            alignItems: "center",
            gap: 4,
            marginTop: 4,

            svg: {
                width: "16px !important",
                height: "16px !important",
            },

            "> div:first-type": {
                alignSelf: "flex-start",
            },

            ".mantine-Text-root": {
                width: "calc(100% - 20px)",
                paddingTop: 2,
            },
        },
    },
}));
