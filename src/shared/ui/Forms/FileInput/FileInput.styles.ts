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
        minHeight: 190,
        backgroundColor: "transparent",

        ":hover": {
            backgroundColor: theme.colors.secondary16[0],
        },
    },
    inner: {
        pointerEvents: "all",
        width: "100%",
        height: "100%",
    },

    errorText: {
        position: "absolute",
        bottom: -20,
        left: 0,
        color: theme.colors.warning[0],
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
}));
