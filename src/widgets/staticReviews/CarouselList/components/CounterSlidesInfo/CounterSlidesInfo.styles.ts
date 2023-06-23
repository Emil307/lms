import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    root: {
        position: "absolute",
        alignItems: "center",
        height: 56,
        width: "fit-content",
        left: 120,
        bottom: 48,
    },
    text: {
        fontWeight: 600,
        fontSize: 20,
        lineHeight: "24px",
        color: theme.colors.white[0],
    },
}));
