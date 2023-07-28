import { createStyles } from "@mantine/core";
import { FileStatus } from "@shared/types";

export default createStyles((theme, { status }: { status?: FileStatus }, getRef) => ({
    root: {
        display: "flex",
        alignItems: "center",
        gap: 16,

        "&:hover": {
            [`.${getRef("icon")}`]: {
                backgroundColor: status ? "transparent" : theme.colors.secondary16[0],
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
        backgroundColor: status ? "transparent" : theme.colors.secondary8[0],
        color: status === "error" ? theme.colors.warning[0] : theme.colors.secondary[0],
    },
    statusInfo: {
        color: status === "error" ? theme.colors.warning[0] : theme.colors.dark[0],
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
    buttonDownload: {
        width: "fit-content",
        height: 24,
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
