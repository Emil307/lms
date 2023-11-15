import { createStyles } from "@mantine/core";
import { FileStatus } from "@shared/types";

interface CreateStylesProps {
    status?: FileStatus;
    autoAdapt: boolean;
    disableTitleWrapping: boolean;
}

export default createStyles((theme, { status, autoAdapt, disableTitleWrapping }: CreateStylesProps) => ({
    status: {
        color: status === "error" ? theme.colors.warning[0] : theme.colors.dark[0],
    },
    video: {
        width: "100%",
        height: "100%",
        maxHeight: 660,
        maxWidth: "100%",
        borderRadius: 8,
        objectFit: "contain",

        ...(autoAdapt
            ? {
                  position: "absolute",
                  top: 0,
                  left: 0,
              }
            : {}),
    },
    titleWrapper: {
        display: "table",
        tableLayout: "fixed",
        width: "fit-content",
    },
    title: {
        ...(disableTitleWrapping
            ? {
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
              }
            : {
                  wordBreak: "break-word",
              }),
    },
    size: {
        color: theme.colors.gray45[0],
        whiteSpace: "nowrap",
    },
    extra: {
        gap: 2,
        flexDirection: "column",
        width: "100%",
    },
    text: {
        fontSize: 14,
        lineHeight: "16px",
        fontWeight: 500,
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

        ...(autoAdapt
            ? {
                  paddingTop: "60%",
              }
            : {}),
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
