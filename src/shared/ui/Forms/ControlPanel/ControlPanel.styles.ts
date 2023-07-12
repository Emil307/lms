import { createStyles } from "@mantine/core";

export default createStyles((theme, { checked = false }: { checked?: boolean }) => ({
    root: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        paddingInline: 18,
        paddingBlock: 16,
        gap: 8,
        backgroundColor: checked ? theme.colors.white[0] : "transparent",
        borderRadius: 8,
    },
    label: {
        color: checked ? theme.colors.dark[0] : theme.colors.gray45[0],
    },
}));
