import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    tooltip: {
        padding: "8px 16px",
        maxWidth: 320,
        borderRadius: 8,
        backgroundColor: theme.colors.dark[0],
        wordBreak: "break-word",

        ".mantine-Text-root": {
            fontSize: 12,
            lineHeight: "16px",
        },
    },
}));
