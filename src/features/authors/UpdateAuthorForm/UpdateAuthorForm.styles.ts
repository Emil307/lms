import { createStyles, MantineTheme } from "@mantine/core";

export default createStyles((theme) => ({
    infoItem: {
        alignSelf: "center",
        fontSize: 14,
        lineHeight: "16px",
        color: theme.colors.gray45[0],
        span: {
            color: theme.colors.dark[0],
        },
    },
    status: {
        width: "min-content",
        height: 28,
        padding: "6px 10px",
        border: "none",
        borderRadius: 32,
        fontWeight: 500,
        fontSize: 12,
        lineHeight: "16px",
        textTransform: "inherit",
        ...getColorsByStatus(theme, { status }),
    },
}));

const getColorsByStatus = (theme: MantineTheme, { status }: { status?: string }) => {
    switch (status) {
        case "notStarted":
            return { backgroundColor: theme.colors.done16[0], color: theme.colors.doneDark[0] };
        case "done":
            return { backgroundColor: theme.colors.secondary16[0], color: theme.colors.secondary[0] };
        default:
            return { backgroundColor: theme.colors.done16[0], color: theme.colors.doneDark[0] };
    }
};
