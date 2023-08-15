import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    root: {
        flexDirection: "column",
        width: "100%",
        gap: 32,
    },
    headingContainer: {
        alignItems: "center",
        gap: 12,
    },
    wrapperPaperclipIcon: {
        height: 60,
        width: 60,
        minWidth: 60,
        borderRadius: 56,
        backgroundColor: theme.colors.secondary[0],
        color: theme.colors.white[0],
    },
}));
