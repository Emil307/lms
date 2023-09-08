import { createStyles } from "@mantine/core";
import { FileStatus } from "@shared/types";

export default createStyles((theme, { status }: { status?: FileStatus }, getRef) => ({
    root: {
        alignItems: "center",
        gap: 8,
    },
    main: {
        width: "100%",
        alignItems: "center",
        gap: 16,

        [theme.fn.smallerThan("xs")]: {
            gap: 4,
        },
    },
    fileNumber: {
        alignItems: "center",
        width: 20,
        height: "100%",
    },
    icon: {
        ref: getRef("icon"),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minWidth: 48,
        minHeight: 48,
        width: 48,
        height: 48,
        padding: 4,
        gap: 4,
        borderRadius: 8,
        backgroundColor: status === "done" || !status ? theme.colors.secondary8[0] : "transparent",
        color: status === "error" ? theme.colors.warning[0] : theme.colors.secondary[0],

        [theme.fn.smallerThan("xs")]: {
            marginRight: 12,
        },
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
        flexDirection: "column",
        width: "calc(100% - 64px)",
        gap: 2,
    },
    buttonDownload: {
        fontSize: 14,
    },
    size: {
        whiteSpace: "nowrap",
    },
}));
