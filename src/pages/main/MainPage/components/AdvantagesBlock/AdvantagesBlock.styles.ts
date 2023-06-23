import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    advantageItem: {
        flexDirection: "column",
        height: "100%",
        gap: 8,
        paddingBlock: 32,
        paddingInline: 16,
        borderRadius: 24,
        backgroundColor: theme.colors.white[0],
        textAlign: "center",
    },
    advantageDescription: {
        paddingInline: 30,
        fontWeight: 500,
        fontSize: 16,
        lineHeight: "24px",
        color: theme.colors.gray45[0],
    },
}));
