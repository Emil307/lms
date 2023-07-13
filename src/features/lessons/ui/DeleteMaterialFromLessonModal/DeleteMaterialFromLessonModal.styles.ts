import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    warning: {
        backgroundColor: theme.colors.secondary16[0],
        borderRadius: 56,
        fontWeight: 500,
        minWidth: 48,
        height: 48,
    },
    textWrapper: {
        fontSize: 16,
        lineHeight: "24px",
        fontWeight: 500,
    },
    inline: {
        display: "inline",
    },
    textData: {
        display: "inline",
        fontWeight: 600,
    },
}));
