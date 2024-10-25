import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    contentContainer: {
        flexDirection: "column",
        gap: 24,
    },
    icon: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minWidth: 48,
        minHeight: 48,
        gap: 4,
        borderRadius: 8,
        backgroundColor: theme.colors.neutralGray100[0],
        color: theme.colors.secondary[0],
    },
    extension: {
        fontWeight: 700,
        fontSize: 8,
        lineHeight: "8px",
        color: theme.colors.neutralMain50[0],
    },
}));
