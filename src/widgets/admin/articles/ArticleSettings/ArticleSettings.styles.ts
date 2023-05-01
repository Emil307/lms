import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    info: {
        display: "grid",
        gridTemplateColumns: "1fr 334px",
        gap: 56,
        borderRadius: 24,
        backgroundColor: theme.colors.white[0],
    },
    settingsNotification: {
        padding: 4,
        borderRadius: 12,
        backgroundColor: theme.colors.light[0],
    },
    desc: {
        color: theme.colors.gray45[0],
        fontSize: 16,
        lineHeight: "24px",
    },
    groupInfo: {
        flexDirection: "column",
        padding: "24px 32px",
        gap: 8,
        borderRadius: 16,
        boxShadow: "0px 16px 32px rgba(2, 6, 46, 0.08)",
    },
}));
