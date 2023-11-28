import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    root: {
        flexDirection: "column",
        padding: 16,
        paddingTop: 24,
        gap: 8,
        borderRadius: 8,
        backgroundColor: theme.colors.light[0],
        cursor: "pointer",
    },
    createdAt: {
        whiteSpace: "nowrap",
        marginLeft: 8,
    },
    contentWrapper: {
        display: "table",
        tableLayout: "fixed",
        width: "fit-content",
    },
    content: {
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
    },
    userRole: {
        whiteSpace: "nowrap",
    },
}));
