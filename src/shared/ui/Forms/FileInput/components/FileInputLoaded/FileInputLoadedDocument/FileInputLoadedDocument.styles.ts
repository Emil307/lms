import { createStyles } from "@mantine/core";

export default createStyles((theme, _params, getRef) => ({
    root: {
        display: "flex",
        alignItems: "center",
        gap: 16,

        "&:hover": {
            [`.${getRef("icon")}`]: {
                backgroundColor: theme.colors.secondary16[0],
            },
        },
    },
    icon: {
        ref: getRef("icon"),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minWidth: 48,
        minHeight: 48,
        gap: 4,
        borderRadius: 8,
        backgroundColor: theme.colors.secondary8[0],
        color: theme.colors.secondary[0],
    },
    extension: {
        fontWeight: 700,
        fontSize: 8,
        lineHeight: "8px",
        color: theme.colors.gray45[0],
    },
    content: {
        display: "flex",
        flexDirection: "column",
        width: "100%",
    },
    fileInfo: {
        display: "flex",
        width: "100%",
        gap: 2,
    },
    fileName: {
        minWidth: 140,
        fontWeight: 600,
        fontSize: 14,
        lineHeight: "16px",
        color: theme.colors.dark[0],
    },
    fileSize: {
        fontWeight: 500,
        fontSize: 14,
        lineHeight: "16px",
        color: theme.colors.gray45[0],
    },
    buttonDownload: {
        width: "fit-content",
        paddingLeft: 0,
        backgroundColor: "transparent",
        fontWeight: 600,
        fontSize: 14,
        lineHeight: "24px",
        color: theme.colors.dark[0],

        "&:hover": {
            backgroundColor: "transparent",
        },
    },
}));
