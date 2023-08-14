import { createStyles } from "@mantine/core";
import { FileStatus } from "@shared/types";

export default createStyles((theme, { status }: { status?: FileStatus }) => ({
    status: {
        fontWeight: 600,
        fontSize: 14,
        lineHeight: "24px",
        color: status === "error" ? theme.colors.warning[0] : theme.colors.dark[0],
    },
    video: {
        width: "100%",
        height: "100%",
        maxHeight: 660,
        maxWidth: "100%",
        borderRadius: 8,
    },
    text: {
        fontSize: 14,
        lineHeight: "16px",
        fontWeight: 500,
    },
    size: {
        fontSize: 14,
        lineHeight: "16px",
        fontWeight: 500,
        color: theme.colors.neutral_gray[0],
    },
    readyText: {
        fontSize: 16,
        lineHeight: "24px",
        fontWeight: 600,
    },
    downloadButton: {
        width: "fit-content",
    },
    videoWrapper: {
        position: "relative",
    },
    loader: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: "100%",
        height: "100%",
        opacity: 1,
        borderRadius: 16,
        zIndex: 1,
    },
}));
