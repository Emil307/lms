import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    root: {
        padding: 16,
        gap: 8,
        borderRadius: 8,
        backgroundColor: theme.colors.primary8[0],
    },
    wrapperDocumentIcon: {
        border: "none",
        minHeight: "auto",
        minWidth: "auto",
        height: 16,
        width: 16,
    },
    articleName: {
        fontWeight: 600,
        fontSize: 14,
        lineHeight: "16px",
        color: theme.colors.dark[0],
    },
}));
