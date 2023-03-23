import { createStyles } from "@mantine/core";

export const useRadioGroupStyles = createStyles((theme) => ({
    error: {
        display: "flex",
        gap: 4,
        marginTop: 4,

        svg: {
            width: 16,
            height: 16,
            color: theme.colors.warning[0],
        },

        "> div": {
            width: "calc(100% - 20px)",
            paddingTop: 2,
            color: theme.colors.dark[0],
            fontWeight: 400,
            fontSize: 10,
            lineHeight: "12px",
        },
    },
    description: {
        display: "flex",
        flexDirection: "column",

        "> div": {
            display: "flex",
            alignItems: "flex-start",
            gap: 4,
            marginTop: 4,

            svg: {
                width: "16px !important",
                height: "16px !important",
            },

            "> div": {
                width: "calc(100% - 20px)",
                paddingTop: 2,
                color: theme.colors.dark[0],
                fontWeight: 400,
                fontSize: 10,
                lineHeight: "12px",
            },
        },
    },
}));
