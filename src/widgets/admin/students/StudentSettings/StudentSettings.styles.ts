import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    root: {
        gap: 56,
        borderRadius: 24,
        backgroundColor: theme.colors.neutralWhite[0],

        [theme.fn.smallerThan("md")]: {
            flexDirection: "column-reverse",
        },
    },
    settingsInfo: {
        flexDirection: "column",
        minWidth: 400,
        flex: 1,
        gap: 24,

        [theme.fn.smallerThan("sm")]: {
            minWidth: "auto",
        },
    },

    headingSettingsInfo: {
        alignItems: "center",
        gap: 48,

        [theme.fn.smallerThan("xs")]: {
            justifyContent: "space-between",
            gap: 16,
        },
    },
    settingsNotification: {
        padding: 4,
        borderRadius: 12,
        backgroundColor: theme.colors.neutralGray100[0],
    },
}));
