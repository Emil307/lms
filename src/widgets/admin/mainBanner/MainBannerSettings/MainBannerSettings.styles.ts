import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    info: {
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
        gap: 32,

        [theme.fn.smallerThan("sm")]: {
            minWidth: "auto",
        },
    },
}));
