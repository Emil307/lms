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
}));
