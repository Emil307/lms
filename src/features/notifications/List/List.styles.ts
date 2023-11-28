import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    root: {
        flexDirection: "column",
    },
    nothingFoundTitle: {
        paddingInline: 16,
        marginBottom: 8,
        fontWeight: 500,
        fontSize: 14,
        lineHeight: "16px",
        color: theme.colors.gray45[0],
    },
    scrollArea: {
        ".mantine-ScrollArea-viewport": {
            padding: 0,
        },
    },
}));
