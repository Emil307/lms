import { createStyles } from "@mantine/core";
import { ManropeFont } from "@app/providers/Theme/fonts";
import { FileStatus } from "./FileItem";

export default createStyles((theme, { status }: { status?: FileStatus }, getRef) => ({
    root: {
        display: "flex",
        alignItems: "center",
        gap: 16,

        "&:hover": {
            [`.${getRef("icon")}`]: {
                backgroundColor: status ? "transparent" : theme.colors.secondary16,
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
        backgroundColor: status ? "transparent" : theme.colors.secondary8,
        color: status === "error" ? theme.colors.warning : theme.colors.secondary,
    },
    statusInfo: {
        fontFamily: ManropeFont.style.fontFamily,
        fontWeight: 500,
        fontSize: 14,
        lineHeight: "16px",
        color: status === "error" ? theme.colors.warning : theme.colors.dark,
    },
    extension: {
        fontFamily: ManropeFont.style.fontFamily,
        fontWeight: 700,
        fontSize: 8,
        lineHeight: "8px",
        color: theme.colors.gray45,
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
        // minWidth: 140,
        fontFamily: ManropeFont.style.fontFamily,
        fontWeight: 600,
        fontSize: 14,
        lineHeight: "18px",
        color: theme.colors.dark,
    },
    fileSize: {
        fontFamily: ManropeFont.style.fontFamily,
        fontWeight: 500,
        fontSize: 14,
        lineHeight: "16px",
        color: theme.colors.gray45,
    },
    buttonDownload: {
        width: "fit-content",
        height: 24,
        paddingLeft: 0,
        backgroundColor: "transparent",
        fontFamily: ManropeFont.style.fontFamily,
        fontWeight: 600,
        fontSize: 14,
        lineHeight: "24px",
        color: theme.colors.dark,

        "&:hover": {
            backgroundColor: "transparent",
        },
    },
    actions: {
        display: "flex",
    },
}));
