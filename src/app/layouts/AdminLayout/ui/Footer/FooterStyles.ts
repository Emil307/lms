import { createStyles } from "@mantine/core";

export const useFooterStyles = createStyles((theme) => ({
    root: {
        backgroundColor: "inherit",
        borderTop: "none",
        padding: "0 24px",
        position: "static",
        maxHeight: 192,
        marginTop: 32
    },
    inner: {
        height: 136,
        backgroundColor: theme.colors.white[0],
        padding: 32,
        borderRadius: 24,
    },
}));
