import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    root: {
        display: "flex",
        flexDirection: "column",
        gap: 32,
    },
    iconMessageDots: {
        width: 32,
        height: 32,
        border: "none",
        svg: {
            width: 32,
            height: 32,
            path: {
                fill: theme.colors.secondary[0],
                transform: "scale(1.4)",
            },
        },
    },

    chatContainer: {
        flex: 1,
        minWidth: 456,
        minHeight: 456,
        height: "min-content",
        borderRadius: 16,
        backgroundColor: theme.colors.white[0],
    },
    chatHeader: {
        paddingBlock: 24,
        paddingInline: 32,
        borderBottom: `1px solid ${theme.colors.grayLight[0]}`,
    },
}));
