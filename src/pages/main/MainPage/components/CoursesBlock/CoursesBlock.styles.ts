import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    title: {
        textAlign: "center",
        fontSize: 42,
    },
    wrapperCategoryList: {
        width: "100%",
        gap: 8,
        overflowX: "auto",

        "::-webkit-scrollbar": {
            display: "none",
        },
    },
    category: {
        paddingBlock: 12,
        paddingInline: 16,
        borderRadius: 160,
        backgroundColor: theme.colors.white[0],
        whiteSpace: "nowrap",
        cursor: "pointer",

        ":hover": {
            color: theme.colors.white[0],
            backgroundColor: theme.colors.primary[0],
        },
    },
}));
