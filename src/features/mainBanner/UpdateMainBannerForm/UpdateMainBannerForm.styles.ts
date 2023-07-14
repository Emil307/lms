import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    fieldset: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        width: "100%",
        margin: 0,
        padding: 0,
        gap: 7.5,
        border: "none",
    },
    legend: {
        display: "flex",
        gap: 16,
        marginBottom: 16,

        svg: {
            color: "gray45.0",
        },
    },
    authorFullName: {
        fontWeight: 600,
        fontSize: 16,
        lineHeight: "24px",
        color: theme.colors.dark[0],
    },
    wrapperIconError: {
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
}));
