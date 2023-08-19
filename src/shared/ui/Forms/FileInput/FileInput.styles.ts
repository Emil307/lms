import { createStyles } from "@mantine/core";

export default createStyles((theme, { error }: { error: boolean }, getRef) => ({
    root: {
        ref: getRef("FileInputRoot"),
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 0,
        borderRadius: 16,
        border: error ? `1px dashed ${theme.colors.warning[0]}` : `1px dashed ${theme.colors.primary[0]}`,
        backgroundColor: "transparent",

        ":hover": {
            backgroundColor: theme.colors.secondary16[0],
        },
    },
    inner: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        pointerEvents: "all",
        width: "100%",
        height: "100%",
    },

    wrapper: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: 16,
        backgroundColor: "transparent",
    },

    containerFiles: {
        display: "flex",
        flexDirection: "column",
        gap: 8,

        [`.${getRef("FileInputRoot")}`]: {
            minHeight: "auto",
            paddingInline: 10,
            border: "none",
            borderRadius: 0,

            "&:hover": {
                backgroundColor: "transparent",
            },
        },
    },
    description: {
        alignItems: "center",
        gap: 4,
        marginTop: 4,

        "> p": {
            paddingTop: 2,
        },
    },
    error: {
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
}));
