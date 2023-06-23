import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    category: {
        paddingBlock: 12,
        paddingInline: 16,
        borderRadius: 160,
        backgroundColor: theme.colors.white[0],
        fontWeight: 600,
        fontSize: 14,
        lineHeight: "16px",
        color: theme.colors.dark[0],
        cursor: "pointer",

        ":hover": {
            color: theme.colors.white[0],
            backgroundColor: theme.colors.primary[0],
        },
    },
}));
