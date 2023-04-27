import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    container: {
        flexDirection: "column",
        flexWrap: "nowrap",
        alignItems: "flex-start",
        padding: 32,
        gap: 32,
        borderRadius: 24,
        backgroundColor: theme.colors.white[0],
    },
    title: {
        fontWeight: 600,
        fontSize: 18,
        lineHeight: "24px",
        color: theme.colors.dark[0],
    },
    requisitesContainer: {
        flexDirection: "column",
        flexWrap: "nowrap",
        alignItems: "flex-start",
        gap: 8,
    },
    requisitesTitle: {
        fontWeight: 500,
        fontSize: 16,
        lineHeight: "24px",
        color: theme.colors.gray45[0],
    },
    requisites: {
        fontWeight: 400,
        fontSize: 16,
        lineHeight: "24px",
        color: theme.colors.dark[0],
        p: {
            margin: 0,
        },
    },
}));
