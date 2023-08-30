import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    iconCalendarWrapper: {
        minWidth: 32,
        height: 32,
        borderRadius: 56,
        backgroundColor: theme.colors.secondary16[0],
    },
    availableDate: {
        whiteSpace: "nowrap",
    },
}));
