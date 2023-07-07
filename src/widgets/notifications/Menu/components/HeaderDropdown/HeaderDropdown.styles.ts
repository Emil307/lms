import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    root: {
        alignItems: "center",
        justifyContent: "space-between",
        paddingBlock: 12,
        paddingInline: 16,
        gap: 16,
    },
    closeIcon: {
        borderRadius: 16,
        color: theme.colors.primary[0],

        svg: {
            width: 16,
            height: 16,
            strokeWidth: 3,
        },
    },
}));
