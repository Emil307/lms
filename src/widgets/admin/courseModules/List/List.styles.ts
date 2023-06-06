import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    wrapper: {
        flexDirection: "column",
        alignItems: "center",
        padding: 24,
        paddingBottom: 32,
        gap: 20,
        borderRadius: 12,
        backgroundColor: theme.colors.light[0],
    },
    emptyText: {
        fontWeight: 500,
        fontSize: 16,
        lineHeight: "24px",
        color: theme.colors.neutral_gray,
    },
    buttonAddModule: {
        alignSelf: "center",
        width: "100%",
        maxWidth: 249,
        height: 56,
    },
    blockMore: {
        visibility: "hidden",
    },
}));
