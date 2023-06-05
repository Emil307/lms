import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    root: {
        alignItems: "center",
        padding: "24px 32px",
        gap: 16,
        borderRadius: 16,
        backgroundColor: theme.colors.white[0],
        cursor: "pointer",

        ":hover": {
            boxShadow: "0px 1px 2px rgba(0, 18, 110, 0.04), 0px 0px 16px rgba(0, 18, 110, 0.04)",
        },
    },
    countArticles: {
        fontWeight: 500,
        fontSize: 12,
        lineHeight: "16px",
        color: theme.colors.gray45[0],
    },
    arrowIcon: {
        height: 40,
        width: 56,
        color: theme.colors.dark[0],
        backgroundColor: "transparent",
    },
}));
