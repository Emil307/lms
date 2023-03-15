import { createStyles } from "@mantine/core";
import { ManropeFont } from "@app/providers/Theme/fonts";

export default createStyles((theme) => ({
    tooltip: {
        padding: "8px 16px",
        maxWidth: 320,
        borderRadius: 8,
        backgroundColor: theme.colors.dark,

        ".mantine-Text-root": {
            fontFamily: ManropeFont.style.fontFamily,
            fontSize: 12,
            lineHeight: "16px",
        },
    },
}));
