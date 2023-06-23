import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    root: {
        position: "absolute",
        flexDirection: "column",
        height: "min-content",
        maxWidth: 377,
        bottom: 48,
        right: 48,
        gap: 10,
        padding: 16,
        borderRadius: 16,
        backgroundColor: theme.colors.white16[0],
        backdropFilter: "blur(30px)",
    },
    authorShortQuote: {
        fontWeight: 500,
        fontSize: 14,
        lineHeight: "16px",
        color: theme.colors.white[0],
    },
    authorFullName: {
        fontWeight: 600,
        fontSize: 14,
        lineHeight: "16px",
        color: theme.colors.white[0],
    },
    authorPosition: {
        fontWeight: 500,
        fontSize: 12,
        lineHeight: "16px",
        color: theme.colors.white56[0],
    },
    avatarDefaultIconWrapper: {
        width: "auto",
        height: "auto",
        minWidth: "auto",
        border: "none",
        svg: {
            transform: "scale(0.4)",
        },
    },
}));
