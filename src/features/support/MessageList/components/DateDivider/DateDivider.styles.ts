import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    root: {
        alignItems: "center",
        paddingTop: 24,
        paddingBottom: 32,
        gap: 32,
    },
    divider: {
        flex: 1,
    },
    dateInfo: {
        fontWeight: 500,
        fontSize: 14,
        lineHeight: "16px",
        color: theme.colors.gray45[0],
    },
}));
