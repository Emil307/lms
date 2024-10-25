import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    wrapper: {
        flexDirection: "column",
        alignItems: "center",
        padding: 24,
        gap: 8,
        borderRadius: 12,
        backgroundColor: theme.colors.neutralGray100[0],

        [theme.fn.smallerThan("sm")]: {
            backgroundColor: theme.colors.neutralWhite[0],
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
}));
