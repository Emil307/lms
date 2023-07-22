import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    root: {
        gap: 24,
    },
    card: {
        flex: 1,
        gap: 16,
        justifyContent: "space-between",
        padding: 24,
        backgroundColor: theme.colors.light[0],
        borderRadius: "16px",
    },
    cardContent: {
        gap: 48,
        alignItems: "flex-start",
        flexDirection: "column",
    },
    wrapperIcon: {
        display: "flex",
        alignItems: "center",
        alignSelf: "self-start",
        justifyContent: "center",
        minWidth: 64,
        minHeight: 64,
        borderRadius: 24,
        border: "none",
        backgroundColor: theme.colors.white[0],

        svg: {
            width: 32,
            height: 32,
        },
    },
}));
