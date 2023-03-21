import { createStyles } from "@mantine/core";

export default createStyles((theme, { checked = false }: { checked?: boolean }) => ({
    root: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        paddingInline: 18,
        paddingBlock: 16,
        gap: 8,
        backgroundColor: checked ? theme.colors.white : "transparent",
        borderRadius: 8,
    },
    label: {
        fontWeight: 500,
        fontSize: 14,
        lineHeight: "16px",
        color: checked ? theme.colors.dark : theme.colors.gray45,
    },
}));
