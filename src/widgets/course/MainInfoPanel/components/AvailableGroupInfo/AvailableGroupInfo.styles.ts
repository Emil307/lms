import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    iconCalendar: {
        width: 24,
        height: 24,
        minHeight: 24,
        minWidth: 24,
        svg: {
            transform: "scale(1.45)",
        },
    },
    icon: {
        path: {
            fill: theme.colors.secondaryHover[0],
        },
    },
    availableGroupInfoContainer: {
        flexWrap: "wrap",
        columnGap: 16,
        rowGap: 8,

        [theme.fn.smallerThan("xs")]: {
            flexDirection: "column",
        },
    },
}));
