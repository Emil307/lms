import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    root: {
        flexDirection: "column",
        width: "100%",
        padding: 32,
        gap: 32,
        borderRadius: 16,
        backgroundColor: theme.colors.white[0],
    },
    wrapperDocumentIcon: {
        border: "none",
        minHeight: "auto",
        minWidth: "auto",
        height: 60,
        width: 60,
        borderRadius: 56,
        color: theme.colors.secondary[0],
        backgroundColor: theme.colors.secondary8[0],
    },
    categoryName: {
        fontWeight: 500,
        fontSize: 14,
        lineHeight: "16px",
        color: theme.colors.dark[0],
    },
    reactionButton: {
        height: 40,
        width: 77,
        borderRadius: 160,

        ":hover": {
            svg: {
                color: theme.colors.secondary[0],
            },
        },
    },
}));
