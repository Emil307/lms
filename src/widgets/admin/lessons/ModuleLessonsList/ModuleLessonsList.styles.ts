import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    wrapper: {
        flexDirection: "column",
        alignItems: "center",
        padding: 24,
        gap: 8,
        borderRadius: 12,
        backgroundColor: theme.colors.light[0],

        [theme.fn.smallerThan("sm")]: {
            backgroundColor: theme.colors.white[0],
            padding: 0,
        },
    },
    heading: {
        gap: 48,
        alignItems: "center",

        [theme.fn.smallerThan("xs")]: {
            justifyContent: "space-between",
        },
    },
    icon: {
        minWidth: 24,
        minHeight: 24,
    },
    homeworkAndTest: {
        columnGap: 24,
        rowGap: 16,
        flexWrap: "wrap",
    },
}));
