import { createStyles } from "@mantine/core";

export const useTextareaStyles = createStyles((theme) => ({
    input: {
        padding: "20px 18px",
        fontSize: "14px",
        lineHeight: "16px",
        borderRadius: "8px",
        ":hover, :focus": {
            boxShadow: "0px 1px 2px rgba(0, 18, 110, 0.04), 0px 0px 16px rgba(0, 18, 110, 0.04)",
            border: "1px solid rgba(0,0,0,0.0)",
        },
        ":disabled": {
            border: "1px solid rgba(0, 4, 41, 0.2)",
            color: theme.colors.dark[0],
        },
        "&[aria-invalid=true]": {
            border: `1px solid ${theme.colors.warning[0]}`,
        },
    },
    label: {
        display: "flex",
        alignItems: "center",
        marginBottom: 24,
        gap: 16,
        fontSize: 18,
        lineHeight: "24px",
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

            "> p": {
                width: "calc(100% - 20px)",
                paddingTop: 2,
            },
        },
    },
}));
