import { createStyles } from "@mantine/core";
import { ManropeFont } from "@app/providers/Theme/fonts";

export default createStyles((theme) => ({
    wrapper: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 8,
    },
    title: {
        fontFamily: ManropeFont.style.fontFamily,
        fontWeight: 500,
        fontSize: 14,
        lineHeight: "16px",
        color: theme.colors.dark,
    },
    description: {
        fontFamily: ManropeFont.style.fontFamily,
        fontWeight: 500,
        fontSize: 12,
        lineHeight: "16px",
        color: theme.colors.gray45,
    },
}));
