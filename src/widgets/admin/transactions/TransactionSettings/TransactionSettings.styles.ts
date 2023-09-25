import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    root: {
        gap: 56,
        borderRadius: 24,
        backgroundColor: theme.colors.white[0],

        [theme.fn.smallerThan("md")]: {
            flexDirection: "column-reverse",
        },
    },
    settingsInfo: {
        flexDirection: "column",
        minWidth: 400,
        flex: 1,
        gap: 32,

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
}));
